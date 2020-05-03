const electron = require("electron");
const os = require("os");
const fs = require("fs");
const path = require("path");
const open = require("open");
const commandExistsSync = require("command-exists").sync;
const which = require("which");
const isDev = require("electron-is-dev");
const isMac = os.platform() === "darwin";
const isWin = os.platform().indexOf("win") > -1;

require("./ipcs/ofPackageManager.js");
require("./ipcs/projectGenerator.js");
require("./ipcs/fs.js");

const isBrewInstalled = commandExistsSync("brew");
const isOfPackageManagerInstalled = commandExistsSync("ofPackageManager");
const isOfProjectGeneratorInstalled = commandExistsSync("projectGenerator");

const homePath = os.homedir();
const configDirPath = path.join(homePath, ".ofPackageManager");
const frontendConfigPath = path.join(configDirPath, "frontend.config.json");
const cliConfigPath = path.join(configDirPath, "cli.config.json");
const historyPath = path.join(configDirPath, "frontend.history.json");
let ofPackagesPath = path.join(configDirPath, "ofPackages");
let ofPackageManagerPath = "";
let ofProjectGeneratorPath = "";
let frontendConfig = null;
let cliConfig = null;

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

const init = () => {
  try {
    if (!fs.existsSync(configDirPath)) {
      console.log("common config dir does not exist, creating it");
      fs.mkdirSync(configDirPath);
    }
    if (fs.existsSync(cliConfigPath)) {
      cliConfig = JSON.parse(fs.readFileSync(cliConfigPath));
    }
    if (!fs.existsSync(frontendConfigPath)) {
      console.log("frontend config does not exist, running auto config");
      console.log(`brew is ${isBrewInstalled ? "" : "not "}installed`);
      console.log(
        `ofPackageManager is ${
          isOfPackageManagerInstalled ? "" : "not "
        }installed`
      );
      console.log(
        `ofProjectGenerator is ${
          isOfProjectGeneratorInstalled ? "" : "not "
        }installed`
      );

      if (isOfPackageManagerInstalled) {
        const ofPackageManagerPaths = which.sync("ofPackageManager", {
          nothrow: true,
          all: true,
        });
        ofPackageManagerPaths.forEach((p) => {
          if (
            p !== __filename &&
            p.toLowerCase !== "ofpackagemanager.exe" &&
            !path.isAbsolute(p) &&
            !p.toLowerCase().includes("appdata") &&
            !p.toLowerCase().includes("temp")
          ) {
            ofPackageManagerPath = p;
          }
        });
      }
      ofProjectGeneratorPath = isOfProjectGeneratorInstalled
        ? which.sync("projectGenerator", { nothrow: true })
        : "";
      frontendConfig = {
        showConsole: false,
        showAdvancedFeatures: true,
        verboseOutput: false,
        ofPackageManagerPath,
        ofProjectGeneratorPath,
        defaultProjectPath: cliConfig
          ? path.join(cliConfig.ofPath, "apps/myApps")
          : "",
      };
      console.log(frontendConfigPath);
      console.log(
        path.join(os.homedir(), ".ofPackageManager/frontend.config.json")
      );

      if (isOfPackageManagerInstalled && isOfProjectGeneratorInstalled) {
        fs.writeFileSync(
          frontendConfigPath,
          JSON.stringify(frontendConfig, {}, 2)
        );
      }
    }

    if (!fs.existsSync(historyPath)) {
      fs.writeFileSync(historyPath, JSON.stringify({ projects: [] }, {}, 2));
    }

    mainWindow.webContents.send("inited", {});
  } catch (err) {
    console.log("error accessing file", err);
  }
};

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    // mainWindow.webContents.openDevTools();
  }
  mainWindow.webContents.on("new-window", function (event, url) {
    event.preventDefault();
    open(url);
  });
  mainWindow.webContents.once("dom-ready", () => {
    init();
  });
  mainWindow.on("closed", () => (mainWindow = null));
};

app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
