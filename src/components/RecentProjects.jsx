import { ipcRenderer } from "electron";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { setCwd as setCwdCreator } from "../state/reducers/project";

const channels = require("../channels");

const Container = styled.div`
  margin-top: 50px;
`;

const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
  li:hover {
    cursor: pointer;
  }
  color: #e71b74;
`;
const Headline = styled.h2`
  font-size: 1.25em;
`;
const RecentProjects = () => {
  const dispatch = useDispatch();
  const frontendConfig = useSelector((state) => state.config);
  const cliConfig = useSelector((state) => state.cliConfig);
  const config = {
    ...cliConfig,
    ...frontendConfig,
  };
  const history = useHistory();
  const projectHistory = useSelector((state) => state.meta.history);

  const clickHandler = (path) => {
    return () => {
      const cwd = path;
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
      ipcRenderer.send("getPackagesListedInAddonsMake", {
        config,
        cwd,
      });

      history.push("/configProject");
    };
  };
  return (
    <Container>
      <Headline>Recent projects</Headline>
      <List>
        {projectHistory.map((project, index) => {
          return (
            <li key={index} onClick={clickHandler(project.path)}>
              {project.path}
            </li>
          );
        })}
      </List>
    </Container>
  );
};

export default RecentProjects;
