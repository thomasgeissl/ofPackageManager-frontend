const { ipcMain } = require("electron");
const { execSync } = require("child_process");
const { logAndSendToWebConsole } = require("./utils.js");
const channels = require("../../src/channels");

ipcMain.on("createProject", (event, arg) => {
  let output = "creating project at " + arg.path;
  logAndSendToWebConsole(output, event);

  const { config } = arg;

  let response;
  console.log("config", config);
  response = execSync(
    `${config.ofProjectGeneratorPath} -o"${config.ofPath}" ${arg.path}`
  );
  logAndSendToWebConsole(response.toString(), event);
  event.reply("createProjectResponse", { success: true });
});

ipcMain.on("updateProject", (event, arg) => {
  let output = "updating project at " + arg.path;
  logAndSendToWebConsole(output, event);

  const { config, packagesList, platforms, templates } = arg;
  let response;

  const command = `${config.ofProjectGeneratorPath} -o"${config.ofPath}" -a"${packagesList}" -p"${platforms}" -t"${templates}" ${arg.path}`;
  logAndSendToWebConsole(command, event);
  response = execSync(command);
  logAndSendToWebConsole(response.toString(), event);
  event.reply("updateProjectResponse", { success: true });
});

ipcMain.on("updateMultiple", (event, arg) => {
  let output = "updating multiple projects at " + arg.path;
  logAndSendToWebConsole(output, event);

  const { config } = arg;
  let response;

  response = execSync(
    `${config.ofProjectGeneratorPath} -o"${config.ofPath}" -r ${
      config.verboseOutput ? " -v " : " "
    } -d ${arg.path}`
  );

  logAndSendToWebConsole(response.toString(), event);
  event.reply("updateMultipleResponse", { success: true });
});
