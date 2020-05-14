import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SettingsIcon from "@material-ui/icons/Settings";
import { clearProject } from "../state/reducers/project";

export default ({ openConfigHandler }) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const cwd = useSelector((state) => state.project.cwd);
  const name = useSelector((state) => state.project.cwd)
    .split(/[\\/]/)
    .pop();
  return (
    <AppBar position="static" variant="dense" color="primary">
      <Toolbar>
        {location.pathname !== "/" && (
          <IconButton
            variant="contained"
            onClick={(event) => {
              // history.goBack()
              history.push("/");
              dispatch(clearProject());
            }}
          >
            <ArrowBackIcon></ArrowBackIcon>
          </IconButton>
        )}
        <Box flexGrow={1} textAlign="center">
          <Tooltip title={`${cwd}`}>
            <Typography variant="h6">{name}</Typography>
          </Tooltip>
        </Box>
        <IconButton onClick={openConfigHandler}>
          <SettingsIcon></SettingsIcon>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
