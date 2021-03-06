import { ipcRenderer } from "electron";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { setCwd as setCwdCreator } from "../state/reducers/project";
import styled from "styled-components";
const { dialog } = require("electron").remote;
const channels = require("../channels");

const Container = styled.div``;
const StyledForm = styled.form`
  width: 50%;
  margin: auto;
`;
const Actions = styled(Grid)`
  margin-top: 25px;
`;

let doesDirectoryExistResponseCallback = (event, arg) => {};
ipcRenderer.on(channels.DOESDIRECTORYEXISTRESPONSE, (event, arg) => {
  doesDirectoryExistResponseCallback(event, arg);
});

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
  const verboseOutput = useSelector((state) => state.config.verboseOutput);
  const [location, setLocation] = useState("");
  const [cwd, setCwd] = useState("");
  const [valid, setValid] = useState(false);
  doesDirectoryExistResponseCallback = (event, arg) => {
    setValid(arg.value);
    setCwd(arg.path);
    dispatch(setCwdCreator(arg.path));
  };
  return (
    <Container>
      <StyledForm>
        <TextField
          label="location"
          value={location}
          onChange={(event) => {}}
          onKeyPress={(event) => {}}
          onClick={(event) => {
            dialog
              .showOpenDialog({
                defaultPath: defaultProjectPath,
                properties: ["openDirectory"],
              })
              .then((result) => {
                if (result.filePaths.length) {
                  setLocation(result.filePaths[0]);
                  ipcRenderer.send(channels.DOESDIRECTORYEXIST, {
                    location: result.filePaths[0],
                  });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }}
          fullWidth
        />
        <Actions container alignItems="flex-start" justify="flex-end">
          <Grid item>
            <Button
              variant="contained"
              disabled={!valid}
              onClick={(event) => {
                //   ipcRenderer.send("createDirectory", { path: cwd });
                // ipcRenderer.send("getConfig", {});
                ipcRenderer.send("updateMultiple", {
                  config,
                  path: cwd,
                  verboseOutput,
                });
              }}
            >
              next
            </Button>
          </Grid>
        </Actions>
      </StyledForm>
    </Container>
  );
};
