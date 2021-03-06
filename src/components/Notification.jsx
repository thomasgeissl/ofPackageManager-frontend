import { shell } from "electron";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import WarningIcon from "@material-ui/icons/Warning";
import FolderIcon from "@material-ui/icons/Folder";
import { amber, green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { hideNotification } from "../state/reducers/notification";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles1 = makeStyles((theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const {
    className,
    message,
    onClose,
    onOpenInIDE,
    variant,
    children,
    ...other
  } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="ide"
          aria-label="ide"
          color="inherit"
          onClick={onOpenInIDE}
        >
          <FolderIcon className={classes.icon} />
        </IconButton>,
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    ></SnackbarContent>
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  onOpenInIDE: PropTypes.func,
  variant: PropTypes.oneOf(["error", "info", "success", "warning"]).isRequired,
};

export default () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.notification.show);
  const message = useSelector((state) => state.notification.message);
  const cwd = useSelector((state) => state.project.cwd);
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={show}
      autoHideDuration={6000}
      onClose={(event) => dispatch(hideNotification())}
    >
      <MySnackbarContentWrapper
        variant="success"
        onClose={(event) => dispatch(hideNotification())}
        onOpenInIDE={(event) => {
          shell.openItem(cwd);
        }}
        message={message}
      />
    </Snackbar>
  );
};
