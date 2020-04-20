import { ipcRenderer } from "electron";
import React from "react";
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import StarIcon from "@material-ui/icons/Star";
import ForkIcon from "@material-ui/icons/Restaurant";
import InstallIcon from "@material-ui/icons/GetApp";
import LastUpdatedIcon from "@material-ui/icons/Timer";

import Autocomplete from "@material-ui/lab/Autocomplete";

import parseISODate from "date-fns/parseISO";
import formatDate from "date-fns/format";

const Container = styled.ul`
  background-color: lightgrey;
  padding-left: 0;
  list-style-type: none;
  li {
    padding: 15px;
  }
  li:nth-child(even) {
    background-color: #c3c3c3;
  }
`;
const DatabaseResultItem = styled.li`
  /* border-left: 5px solid rgba(231, 27, 116, 1); */
`;
const StyledListItemContent = styled.div``;
const StyledButton = styled(Button)`
  width: 10%;
`;
const Download = styled(Grid)`
  margin-top: 15px;
  padding-top: 5px;
  width: 100%;
`;

const Result = ({ config, cwd, state, dispatch }) => {
  const { result, databaseResult, urlResult } = state;
  return (
    <Container>
      {/* database results */}
      {databaseResult.map(function (item, index) {
        return (
          <DatabaseResultItem key={index}>
            <StyledListItemContent>
              <div>
                <a href={item.website} target="_bank">
                  {item.name}
                </a>{" "}
                by {item.author}
              </div>
              <div>{item.description}</div>
              <div>{item.license}</div>
            </StyledListItemContent>
            <Download container spacing={3}>
              <Grid item xs={4}>
                <Autocomplete
                  freeSolo
                  options={item.tags}
                  value={item.checkout}
                  onChange={(event, value) => {
                    dispatch({
                      type: "SETDATABASECHECKOUT",
                      payload: { index, value },
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="tag or commit hash"
                      margin="none"
                      variant="outlined"
                      onChange={(event) => {
                        dispatch({
                          type: "SETDATABASECHECKOUT",
                          payload: { index, value: event.target.value },
                        });
                      }}
                      fullWidth
                    />
                  )}
                />
              </Grid>

              <Grid item>
                <StyledButton
                  variant="contained"
                  onClick={(event) => {
                    console.log("install package by url", item);
                    ipcRenderer.send("installPackageByUrl", {
                      config,
                      url: item.cloneUrl,
                      checkout: item.checkout,
                      cwd,
                    });
                  }}
                >
                  <InstallIcon></InstallIcon>
                </StyledButton>
              </Grid>
            </Download>
          </DatabaseResultItem>
        );
      })}

      {/* url results */}
      {Array.isArray(result) &&
        urlResult.map(function (item, index) {
          return (
            <li key={index}>
              <StyledListItemContent>{item}</StyledListItemContent>
              <Download container spacing={3}>
                <Grid item xs={4}>
                  <Autocomplete
                    freeSolo
                    options={item.tags}
                    value={item.checkout}
                    onChange={(event, value) => {
                      dispatch({
                        type: "SETURLCHECKOUT",
                        payload: { index, value },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="tag or commit hash"
                        margin="none"
                        variant="outlined"
                        onChange={(event) => {
                          dispatch({
                            type: "SETURLCHECKOUT",
                            payload: { index, value: event.target.value },
                          });
                        }}
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item>
                  <StyledButton
                    variant="contained"
                    onClick={(event) => {
                      ipcRenderer.send("installPackageByUrl", {
                        config,
                        url: item.value,
                        checkout: item.checkout,
                        cwd,
                      });
                    }}
                  >
                    <InstallIcon></InstallIcon>
                  </StyledButton>
                </Grid>
              </Download>
            </li>
          );
        })}

      {/* gh results */}
      {Array.isArray(result) &&
        result.map(function (item, index) {
          return (
            <li key={index}>
              <StyledListItemContent>
                <a
                  href={item.owner.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.owner.login}
                </a>{" "}
                /{" "}
                <a
                  href={item.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.name}
                </a>
                <div>{item.description}</div>
                <Grid container spacing={3}>
                  <Grid item>
                    <StarIcon></StarIcon> {item.stargazers_count}
                  </Grid>
                  <Grid item>
                    <a
                      href={item.html_url + "/network"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ForkIcon></ForkIcon> {item.forks_count}
                    </a>
                  </Grid>
                  <Grid item>
                    <LastUpdatedIcon></LastUpdatedIcon>
                    {formatDate(parseISODate(item.updated_at), "yyyy/MM/dd")}
                  </Grid>
                </Grid>
              </StyledListItemContent>
              <Download container spacing={3}>
                <Grid item xs={4}>
                  <Autocomplete
                    freeSolo
                    options={item.tags}
                    value={item.checkout}
                    onChange={(event, value) => {
                      dispatch({
                        type: "SETCHECKOUT",
                        payload: { index, value },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="tag or commit hash"
                        size="small"
                        margin="none"
                        variant="outlined"
                        onChange={(event) => {
                          dispatch({
                            type: "SETCHECKOUT",
                            payload: { index, value: event.target.value },
                          });
                        }}
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item>
                  <StyledButton
                    variant="contained"
                    onClick={(event) => {
                      ipcRenderer.send("installPackageByUrl", {
                        config,
                        url: item.clone_url,
                        checkout: item.checkout,
                        cwd,
                      });
                    }}
                  >
                    <InstallIcon></InstallIcon>
                  </StyledButton>
                </Grid>
              </Download>
            </li>
          );
        })}
    </Container>
  );
};

export default Result;
