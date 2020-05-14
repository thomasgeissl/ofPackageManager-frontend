import { ipcRenderer } from "electron";
import React from "react";
import { useSelector } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import PackageList from "./PackageList";
import InstallButton from "./buttons/Install";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

const Panel = styled(ExpansionPanel)`
  border: 3px solid #e71b74;
`;
export default () => {
  const cliConfig = useSelector((state) => state.cliConfig);
  const frontendConfig = useSelector((state) => state.config);
  const config = {
    ...cliConfig,
    ...frontendConfig,
  };
  const cwd = useSelector((state) => state.project.cwd);
  const localPackages = useSelector((state) => state.localPackages.packages);
  const globalPackages = useSelector(
    (state) => state.globalPackages.globalPackages
  );
  const packages = [...localPackages, ...globalPackages];
  const selectedLocalPackages = useSelector(
    (state) => state.localPackages.selected
  );
  const selectedGlobalPackages = useSelector(
    (state) => state.globalPackages.selected
  );
  const selectedPackages = [
    ...selectedLocalPackages,
    ...selectedGlobalPackages,
  ];
  const isPackageInstalled = (value) => {
    const index = packages.findIndex(
      (item) =>
        item.path.split(/[\\/]/).pop() === value.path.split(/[\\/]/).pop()
    );
    return index > -1;
  };
  // const isPackageSelected = value => {
  //   const index = selectedPackages.findIndex(item => item.path === value.path);

  //   return index > -1;
  // };

  const hasMissingPackages = () => {
    let value = false;
    selectedPackages.map((p) => {
      if (!isPackageInstalled(p)) {
        value = true;
        return true;
      } else {
        return false;
      }
    });
    return value;
  };

  return (
    <>
      {hasMissingPackages() && (
        <>
          <Panel expanded={true}>
            <ExpansionPanelSummary>
              <Tooltip
                title={
                  "addons that come bundled with openFrameworks or have been installed globally"
                }
                placement={"bottom-start"}
              >
                <>
                  <Typography variant="h5">missing addons</Typography>{" "}
                  <InstallButton
                    onClick={(event) => {
                      ipcRenderer.send("install", {
                        config,
                        cwd,
                      });
                    }}
                  ></InstallButton>
                </>
              </Tooltip>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <PackageList>
                {selectedPackages.map(function (value, index) {
                  console.log(value);
                  return (
                    !isPackageInstalled(value) && (
                      <Tooltip
                        title={`${value.path}\n${value.url}@${value.checkout}`}
                      >
                        <li key={index}>
                          {value.path.split(/[\\/]/).pop()}
                          {value.url && (
                            <InstallButton
                              onClick={(event) => {
                                ipcRenderer.send("installPackageByUrl", {
                                  config,
                                  ...value,
                                  cwd,
                                });
                              }}
                            ></InstallButton>
                          )}
                        </li>
                      </Tooltip>
                    )
                  );
                })}
              </PackageList>
            </ExpansionPanelDetails>
          </Panel>
        </>
      )}
    </>
  );
};
