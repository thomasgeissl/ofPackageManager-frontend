import { ipcRenderer } from "electron";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCwd as setCwdCreator } from "../state/reducers/project";
const { dialog } = require("electron").remote;
const channels = require("../channels");

export default () => {
  const dispatch = useDispatch();
  const cliConfig = useSelector((state) => state.cliConfig);
  const frontendConfig = useSelector((state) => state.config);
  const config = {
    ...cliConfig,
    ...frontendConfig,
  };
  const defaultProjectPath = useSelector(
    (state) => state.config.defaultProjectPath
  );
  const history = useHistory();
  dialog
    .showOpenDialog({
      defaultPath: defaultProjectPath,
      properties: ["openDirectory"],
    })
    .then((result) => {
      if (result.canceled) {
        history.push("/");
      } else {
        if (result.filePaths.length) {
          const cwd = result.filePaths[0];
          dispatch(setCwdCreator(cwd));
          ipcRenderer.send(channels.ADDTOHISTORY, {
            path: cwd,
          });

          ipcRenderer.send("getCoreAddons", { config });
          ipcRenderer.send("getGloballyInstalledPackages", { config });
          ipcRenderer.send("getLocallyInstalledPackages", {
            config,
            cwd,
          });
          ipcRenderer.send("getAvailablePackages", { config });
          ipcRenderer.send("getPackagesListedInAddonsMake", { config, cwd });

          history.push("/configProject");
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return <></>;
};
