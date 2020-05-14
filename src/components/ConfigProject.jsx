import React, { useState } from "react";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";

import CorePackageSelector from "./CorePackageSelector";
import GloballyInstalledPackageSelector from "./GloballyInstalledPackageSelector";
import LocallyInstalledPackageSelector from "./LocallyInstalledPackageSelector";
import MissingPackages from "./MissingPackages";
import PackageInstaller from "./PackageInstaller";
import PlatformSelector from "./PlatformSelector";
import TemplateSelector from "./TemplateSelector";
import Generator from "./Generator";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default () => {
  const [globalPackagesExpanded, setGlobalPackagesExpanded] = useState(true);
  const [localPackagesExpanded, setLocalPackagesExpanded] = useState(true);
  const [
    platformsAndTemplateExpanded,
    setPlatformsAndTemplateExpanded,
  ] = useState(false);

  const locallyInstalledPackages = useSelector(
    (state) => state.localPackages.packages
  );
  const showAdvancedFeatures = useSelector(
    (state) => state.config.showAdvancedFeatures
  );
  return (
    <>
      <ExpansionPanel
        expanded={globalPackagesExpanded}
        onChange={() => {
          setGlobalPackagesExpanded(!globalPackagesExpanded);
        }}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Tooltip
            title={
              "addons that come bundled with openFrameworks or have been installed globally"
            }
            placement={"bottom-start"}
          >
            <Typography variant="h5">global addons</Typography>
          </Tooltip>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <CorePackageSelector></CorePackageSelector>
          <GloballyInstalledPackageSelector></GloballyInstalledPackageSelector>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      {locallyInstalledPackages.length > 0 && (
        <ExpansionPanel
          expanded={localPackagesExpanded}
          onChange={() => {
            setLocalPackagesExpanded(!localPackagesExpanded);
          }}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Tooltip
              title={"addons that live inside your project"}
              placement={"bottom-start"}
            >
              <Typography variant="h5">local addons</Typography>
            </Tooltip>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <LocallyInstalledPackageSelector></LocallyInstalledPackageSelector>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )}

      <MissingPackages></MissingPackages>

      {showAdvancedFeatures && (
        <ExpansionPanel
          expanded={platformsAndTemplateExpanded}
          onChange={() => {
            setPlatformsAndTemplateExpanded(!platformsAndTemplateExpanded);
          }}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Tooltip
              title={
                "addons that come bundled with openFrameworks or have been installed globally"
              }
              placement={"bottom-start"}
            >
              <Typography variant="h5">platforms, templates</Typography>
            </Tooltip>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <PlatformSelector></PlatformSelector>
            <TemplateSelector></TemplateSelector>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )}
      <ExpansionPanel expanded={true}>
        <ExpansionPanelDetails>
          <Grid
            container
            spacing={3}
            style={{ paddingLeft: "15px", paddingRight: "15px" }}
          >
            <PackageInstaller></PackageInstaller>
            <Generator></Generator>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
};
