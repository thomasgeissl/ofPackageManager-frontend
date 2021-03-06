import { ipcRenderer } from "electron";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";

import {
  setShowAdvancedFeatures,
  setVerboseOutput,
  setDefaultProjectPath,
  setOfPackageManagerPath,
  setProjectGeneratorPath,
} from "../state/reducers/config";

const { dialog } = require("electron").remote;
const channels = require("../channels");

const Container = styled.div`
  background-color: white;
  position: relative;
  width: 50%;
  height: 40%;
  padding: 15px;
  overflow: auto;
`;
const List = styled.ul`
  list-style-type: none;
`;
const FirstPathLi = styled.li`
  margin-top: 30px;
`;
export default () => {
  const showAdvancedFeatures = useSelector(
    (state) => state.config.showAdvancedFeatures
  );
  const cliConfig = useSelector((state) => state.cliConfig);
  const frontendConfig = useSelector((state) => state.config);
  const config = {
    ...cliConfig,
    ...frontendConfig,
  };
  const verboseOutput = useSelector((state) => state.config.verboseOutput);
  const ofPath = useSelector((state) => state.cliConfig.ofPath);
  const defaultProjectPath = useSelector(
    (state) => state.config.defaultProjectPath
  );
  const ofPackageManagerPath = useSelector(
    (state) => state.config.ofPackageManagerPath
  );
  const ofProjectGeneratorPath = useSelector(
    (state) => state.config.ofProjectGeneratorPath
  );
  const dispatch = useDispatch();

  const saveAndReload = () => {
    ipcRenderer.send(channels.WRITEFRONTENDCONFIG, {
      content: { ...frontendConfig },
    });
    ipcRenderer.send("getCliVersion", { config });
  };
  return (
    <Container>
      <List>
        <li>
          <FormControlLabel
            control={
              <Switch
                color="primary"
                checked={showAdvancedFeatures}
                onChange={(event, value) => {
                  dispatch(setShowAdvancedFeatures(value));
                }}
                value={showAdvancedFeatures}
              />
            }
            label="show advanced features"
          />
        </li>
        <li>
          <FormControlLabel
            control={
              <Switch
                color="primary"
                checked={verboseOutput}
                onChange={(event, value) => {
                  dispatch(setVerboseOutput(value));
                }}
                value={verboseOutput}
              />
            }
            label="verbose output"
          />
        </li>
        <FirstPathLi>
          <TextField
            label="openFrameworks path"
            value={ofPath}
            disabled={true}
            fullWidth
          />
        </FirstPathLi>
        <li>
          <TextField
            label="default project path"
            value={defaultProjectPath}
            onChange={(event) => {}}
            onKeyPress={(event) => {}}
            onClick={(event) => {
              dialog
                .showOpenDialog({
                  // defaultPath: defaultProjectPath,
                  properties: ["openDirectory"],
                })
                .then((result) => {
                  if (result.filePaths.length) {
                    dispatch(setDefaultProjectPath(result.filePaths[0]));
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
            fullWidth
          />
        </li>
        <li>
          <TextField
            label="ofPackageManager path"
            value={ofPackageManagerPath}
            onChange={(event) => {}}
            onKeyPress={(event) => {}}
            onClick={(event) => {
              dialog
                .showOpenDialog({
                  // defaultPath: defaultProjectPath,
                  properties: ["openFile"],
                })
                .then((result) => {
                  if (result.filePaths.length) {
                    //   setLocation(result.filePaths[0]);
                    dispatch(setOfPackageManagerPath(result.filePaths[0]));
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
            fullWidth
          />
        </li>
        <li>
          <TextField
            label="ofProjectGenerator path"
            value={ofProjectGeneratorPath}
            onChange={(event) => {}}
            onKeyPress={(event) => {}}
            onClick={(event) => {
              dialog
                .showOpenDialog({
                  // defaultPath: defaultProjectPath,
                  properties: ["openFile"],
                })
                .then((result) => {
                  if (result.filePaths.length) {
                    dispatch(setProjectGeneratorPath(result.filePaths[0]));
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
            fullWidth
          />
        </li>
      </List>
      <Grid container alignItems="flex-start" justify="flex-end">
        <Grid item>
          <Button color="primary" variant="contained" onClick={saveAndReload()}>
            save
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
