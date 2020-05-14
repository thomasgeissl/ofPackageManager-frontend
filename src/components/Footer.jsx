import { ipcRenderer } from "electron";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import DeveloperModeIcon from "@material-ui/icons/DeveloperMode";
import Console from "./Console";
import packageConfig from "../../package.json";
import RefreshButton from "./buttons/Refresh";

import styled from "styled-components";
const channels = require("../channels");
const frontendVersion = packageConfig.version;

const Footer = styled(AppBar)`
  top: auto !important;
  bottom: 0;
  a {
    color: white;
  }
  span {
    margin-right: 15px;
  }
`;

export default () => {
  const [showConsole, setShowConsole] = useState(false);
  const cwd = useSelector((state) => state.project.cwd);
  const cliConfig = useSelector((state) => state.cliConfig);
  const frontendConfig = useSelector((state) => state.config);
  const config = {
    ...cliConfig,
    ...frontendConfig,
  };
  const version = useSelector((state) => state.meta.ofPackageManagerCliVersion);
  return (
    <Footer position="fixed" color="secondary" variant="dense">
      {showConsole && <Console visible={showConsole}></Console>}
      <Toolbar>
        <Box flexGrow={1}>
          <span>
            <a
              href="https://github.com/thomasgeissl/ofPackageManager"
              target="_blank"
              rel="noopener noreferrer"
            >
              cli
            </a>
            @{version.major}.{version.minor}.{version.patch}
          </span>
          <span>
            <a
              href="https://github.com/thomasgeissl/ofPackageManager-frontend"
              target="_blank"
              rel="noopener noreferrer"
            >
              frontend
            </a>
            @{frontendVersion}
          </span>
          <span>
            <a
              href="https://github.com/openframeworks/projectGenerator"
              target="_blank"
              rel="noopener noreferrer"
            >
              ofProjectGenerator
            </a>
            @n/a
          </span>
        </Box>
        <RefreshButton
          onClick={(event) => {
            ipcRenderer.send(channels.READFRONTENDCONFIG, {});
            ipcRenderer.send(channels.GETPLATFORM, {});
            ipcRenderer.send(channels.READHISTORY, {});
            if (config && config.ofPackageManagerPath) {
              ipcRenderer.send("getCoreAddons", { config });
              ipcRenderer.send("getGloballyInstalledPackages", { config });
              ipcRenderer.send("getLocallyInstalledPackages", {
                config,
                cwd,
              });
            }
          }}
        ></RefreshButton>
        <IconButton onClick={() => setShowConsole(!showConsole)}>
          <DeveloperModeIcon
            style={{ color: showConsole ? "#e71b74" : "white" }}
          ></DeveloperModeIcon>
        </IconButton>
      </Toolbar>
    </Footer>
  );
};
