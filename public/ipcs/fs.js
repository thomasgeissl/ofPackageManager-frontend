const { ipcMain } = require("electron");
const os = require("os");
const fs = require("fs");
const path = require("path");
const { logAndSendToWebConsole } = require("./utils.js");
const channels = require("../channels");

const homePath = os.homedir();
const configDirPath = path.join(homePath, ".ofPackageManager");
const historyPath = path.join(configDirPath, "frontend.history.json");

ipcMain.on(channels.DOESDIRECTORYEXIST, (event, arg) => {
  event.reply(channels.DOESDIRECTORYEXISTRESPONSE, {
    path: arg.name ? path.join(arg.location, arg.name) : arg.location,
    value: arg.name
      ? fs.existsSync(path.join(arg.location, arg.name))
      : fs.existsSync(arg.location),
  });
});

ipcMain.on(channels.CREATEDIRECTORY, (event, arg) => {
  if (!fs.existsSync(arg.path)) {
    fs.mkdirSync(arg.path);
  }
  event.reply(channels.CREATEDIRECTORYRESPOMSE, { success: true });
  // event.reply("doesDirectoryExistResponse", {
  //   path: path.join(arg.location, arg.name),
  //   value: fs.existsSync(path.join(arg.location, arg.name))
  // });
});
ipcMain.on(channels.REMOVEADDONSMAKEFILE, (event, arg) => {
  if (fs.existsSync(path.join(arg.cwd, "addons.make"))) {
    fs.unlinkSync(path.join(arg.cwd, "addons.make"));
  }
});
ipcMain.on(channels.WRITEJSONFILE, (event, arg) => {
  fs.writeFileSync(
    path.join(__dirname, "..", arg.path),
    JSON.stringify(arg.content, {}, 2)
  );
});
ipcMain.on(channels.READJSONFILE, (event, arg) => {
  const rawdata = fs.readFileSync(path.join(__dirname, "..", arg.path));
  const data = JSON.parse(rawdata);
  // console.log(data);
  event.reply(channels.READJSONFILERESPONSE, {
    path: arg.path,
    content: data,
  });
});

ipcMain.on(channels.READFRONTENDCONFIG, (event, arg) => {
  const configPath = path.join(
    os.homedir(),
    ".ofPackageManager/frontend.config.json"
  );
  try {
    if (fs.existsSync(configPath)) {
      const rawdata = fs.readFileSync(configPath);
      const data = JSON.parse(rawdata);
      event.reply(channels.READFRONTENDCONFIGRESPONSE, data);
    }
  } catch (err) {
    console.error(err);
  }
});
ipcMain.on(channels.WRITEFRONTENDCONFIG, (event, arg) => {
  fs.writeFileSync(
    path.join(os.homedir(), ".ofPackageManager/frontend.config.json"),
    JSON.stringify(arg.content, {}, 2)
  );
});
ipcMain.on(channels.READCLICONFIG, (event, arg) => {
  const configPath = path.join(
    os.homedir(),
    ".ofPackageManager/cli.config.json"
  );
  try {
    if (fs.existsSync(configPath)) {
      const rawdata = fs.readFileSync(configPath);
      const data = JSON.parse(rawdata);
      event.reply(channels.READCLICONFIGRESPONSE, data);
    }
  } catch (err) {
    console.error(err);
  }
});

ipcMain.on(channels.GETPLATFORM, (event, arg) => {
  logAndSendToWebConsole("getting platform", event);
  logAndSendToWebConsole(process.platform, event);

  event.reply(channels.GETPLATFORMRESPONSE, {
    platform: process.platform,
  });
});

ipcMain.on(channels.GETTEMPLATES, (event, arg) => {
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

  event.reply(channels.GETTEMPLATESRESPONSE, {
    templates,
  });
});

ipcMain.on(channels.READHISTORY, (event, arg) => {
  logAndSendToWebConsole("getting history", event);
  try {
    let history = JSON.parse(fs.readFileSync(historyPath));
    logAndSendToWebConsole(JSON.stringify(history.projects), event);

    event.reply(channels.READHISTORYRESPONSE, {
      history: history.projects,
    });
  } catch (e) {}
});

ipcMain.on(channels.ADDTOHISTORY, (event, arg) => {
  logAndSendToWebConsole("adding to history", event);
  try {
    let history = JSON.parse(fs.readFileSync(historyPath));
    history.projects.unshift(arg);
    let projects = [];
    history.projects.forEach((item, index) => {
      const paths = [...new Set(projects.map((item) => item.path))];
      if (!paths.includes(item.path)) {
        projects.push(item);
      }
    });
    history.projects = projects;
    history.projects = history.projects.slice(0, 10);
    fs.writeFileSync(historyPath, JSON.stringify(history, {}, 2));
    event.reply(channels.READHISTORYRESPONSE, {
      history: history.projects,
    });

    // logAndSendToWebConsole(JSON.stringify(templates), event);
  } catch (e) {
    console.log("error fs operation", e);
  }
});
