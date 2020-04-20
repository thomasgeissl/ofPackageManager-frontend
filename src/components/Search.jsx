import React, { useReducer } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import reducer, { initialState } from "./Search.reducer";
import Field from "./Search.Field";
import Results from "./Search.Results";

import ghSearch, { ghUserSearch } from "./Search.github";

const Container = styled.div`
  background-color: white;
  position: relative;
  overflow: auto;
`;

const isGitUrl = (value) => {
  const suffix = ".git";
  return value.indexOf(suffix, value.length - suffix.length) !== -1;
};

export default () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const cliConfig = useSelector((state) => state.cliConfig);
  const frontendConfig = useSelector((state) => state.config);
  const config = { ...cliConfig, ...frontendConfig };
  const cwd = useSelector((state) => state.project.cwd);
  const database = useSelector((state) => state.localPackages.database);

  const { query } = state;

  const handleQueryChange = (event, value) => {
    if (value) {
      dispatch({
        type: "SETQUERY",
        payload: { value },
      });
    }
  };
  const handleSearch = () => {
    dispatch({ type: "RESET" });

    // database
    let databaseR = [];
    database.forEach((value) => {
      if (value.name.toLowerCase().search(query.toLowerCase()) > -1) {
        value.tags = ["latest"];
        value.checkout = "latest";
        databaseR.push(value);
      }
    });
    dispatch({ type: "SETDATABASERESULT", payload: { value: databaseR } });

    // github
    if (query.search("user") === 0) {
      ghUserSearch(query, (data) => {
        dispatch({
          type: "SETRESULT",
          payload: {
            value: data.filter((item) => item.name.startsWith("ofx")),
          },
        });
      });
    } else {
      ghSearch(query, (data) => {
        dispatch({ type: "SETRESULT", payload: { value: data } });
      });
    }

    // url
    if (isGitUrl(query)) {
      dispatch({
        type: "SETURLRESULT",
        payload: {
          checkout: "latest",
          value: [{ value: query, checkout: "latest" }],
        },
      });
    }
  };
  return (
    <Container>
      <Field
        handleSearch={handleSearch}
        handleQueryChange={handleQueryChange}
        dispatch={dispatch}
        database={database}
      ></Field>
      <Results
        dispatch={dispatch}
        config={config}
        cwd={cwd}
        state={state}
      ></Results>
    </Container>
  );
};
