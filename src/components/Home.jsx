import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import { clearCorePackages } from "../state/reducers/corePackages";
import { clearGlobalPackages } from "../state/reducers/globalPackages";
import { clearLocalPackages } from "../state/reducers/localPackages";
import { clearProject } from "../state/reducers/project";

import RecentProjects from "./RecentProjects";
import CliInfo from "./CliInfo";

const Container = styled.div`
  padding: 100px;
`;

const StyledButton = styled(Button)`
  width: 200px;
  height: 100px;
`;

export default () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const showAdvancedFeatures = useSelector(
    (state) => state.config.showAdvancedFeatures
  );

  return (
    <Container>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={4}
      >
        <Grid item>
          <StyledButton
            variant="contained"
            onClick={() => {
              dispatch(clearCorePackages());
              dispatch(clearGlobalPackages());
              dispatch(clearLocalPackages());
              dispatch(clearProject());
              history.push("/new");
            }}
            size="large"
          >
            new
          </StyledButton>
        </Grid>
        <Grid item>
          <StyledButton
            variant="contained"
            onClick={() => {
              dispatch(clearCorePackages());
              dispatch(clearGlobalPackages());
              dispatch(clearLocalPackages());
              dispatch(clearProject());
              history.push("/update");
            }}
            size="large"
          >
            update
          </StyledButton>
        </Grid>
        {showAdvancedFeatures && (
          <Grid item>
            <StyledButton
              variant="contained"
              onClick={() => {
                dispatch(clearCorePackages());
                dispatch(clearGlobalPackages());
                dispatch(clearLocalPackages());
                dispatch(clearProject());
                history.push("/updateMultiple");
              }}
              size="large"
            >
              update multiple
            </StyledButton>
          </Grid>
        )}
      </Grid>
      <RecentProjects></RecentProjects>
      <CliInfo></CliInfo>
    </Container>
  );
};
