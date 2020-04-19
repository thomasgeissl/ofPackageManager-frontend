const { ipcMain } = require("electron");
const os = require("os");
const fs = require("fs");
const path = require("path");
const { logAndSendToWebConsole } = require("./utils.js");

const homePath = os.homedir();
const configDirPath = path.join(homePath, ".ofPackageManager");
const historyPath = path.join(configDirPath, "frontend.history.json");

ipcMain.on("doesDirectoryExist", (event, arg) => {
  event.reply("doesDirectoryExistResponse", {
    path: arg.name ? path.join(arg.location, arg.name) : arg.location,
    value: arg.name
      ? fs.existsSync(path.join(arg.location, arg.name))
      : fs.existsSync(arg.location),
  });
});

ipcMain.on("createDirectory", (event, arg) => {
  if (!fs.existsSync(arg.path)) {
    fs.mkdirSync(arg.path);
  }
  event.reply("createDirectoryResponse", { success: true });
  // event.reply("doesDirectoryExistResponse", {
  //   path: path.join(arg.location, arg.name),
  //   value: fs.existsSync(path.join(arg.location, arg.name))
  // });
});
ipcMain.on("removeAddonsMakeFile", (event, arg) => {
  if (fs.existsSync(path.join(arg.cwd, "addons.make"))) {
    fs.unlinkSync(path.join(arg.cwd, "addons.make"));
  }
});
ipcMain.on("writeJsonFile", (event, arg) => {
  fs.writeFileSync(
    path.join(__dirname, "..", arg.path),
    JSON.stringify(arg.content, {}, 2)
  );
});
ipcMain.on("readJsonFile", (event, arg) => {
  const rawdata = fs.readFileSync(path.join(__dirname, "..", arg.path));
  const data = JSON.parse(rawdata);
  // console.log(data);
  event.reply("readJsonFileResponse", {
    path: arg.path,
    content: data,
  });
});

ipcMain.on("getFrontendConfig", (event, arg) => {
  const configPath = path.join(
    os.homedir(),
    ".ofPackageManager/frontend.config.json"
  );
  try {
    if (fs.existsSync(configPath)) {
      const rawdata = fs.readFileSync(configPath);
      const data = JSON.parse(rawdata);
      event.reply("getFrontendConfigResponse", data);
    }
  } catch (err) {
    console.error(err);
  }
});
ipcMain.on("saveFrontendConfig", (event, arg) => {
  fs.writeFileSync(
    path.join(os.homedir(), ".ofPackageManager/frontend.config.json"),
    JSON.stringify(arg.content, {}, 2)
  );
});
ipcMain.on("getCliConfig", (event, arg) => {
  const configPath = path.join(
    os.homedir(),
    ".ofPackageManager/cli.config.json"
  );
  try {
    if (fs.existsSync(configPath)) {
      const rawdata = fs.readFileSync(configPath);
      const data = JSON.parse(rawdata);
      event.reply("getCliConfigResponse", data);
    }
  } catch (err) {
    console.error(err);
  }
});

ipcMain.on("getPlatform", (event, arg) => {
  logAndSendToWebConsole("getting platform", event);
  logAndSendToWebConsole(process.platform, event);

  event.reply("getPlatformResponse", {
    platform: process.platform,
  });
});

ipcMain.on("getTemplates", (event, arg) => {
  logAndSendToWebConsole("getting templates", event);
  const { config } = arg;

  // TODO: filter only directories
  const templates = fs
    .readdirSync(path.join(config.ofPath, "scripts/templates"), {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  logAndSendToWebConsole(JSON.stringify(templates), event);

  event.reply("getTemplatesResponse", {
    templates,
  });
});

ipcMain.on("getHistory", (event, arg) => {
  logAndSendToWebConsole("getting history", event);
  try {
    let history = JSON.parse(fs.readFileSync(historyPath));
    logAndSendToWebConsole(JSON.stringify(history), event);

    event.reply("getHistoryResponse", {
      history,
    });
  } catch (e) {

  }
});

ipcMain.on("addToHistory", (event, arg) => {
  logAndSendToWebConsole("adding to history", event);
  try {
    let history = JSON.parse(fs.readFileSync(historyPath));
    history.projects.push(arg)
    console.log(history)
    fs.writeFileSync(historyPath, JSON.stringify(history, {}, 2))

    // logAndSendToWebConsole(JSON.stringify(templates), event);

  } catch (e) {
    console.log("error fs operation", e)

  }
});
