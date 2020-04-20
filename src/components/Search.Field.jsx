import React from "react";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchButton from "./buttons/Search";

const StyledBox = styled(Box)`
  padding-left: 5px;
  padding-right: 5px;
`;

const StyledSearchButton = styled(SearchButton)`
  height: 100%;
`;

const SearchField = ({
  handleSearch,
  handleQueryChange,
  dispatch,
  database,
}) => {
  return (
    <Box display="flex" flexDirection="row">
      <StyledBox flexGrow={1}>
        <Autocomplete
          freeSolo
          options={database.map((option) => option.name)}
          onChange={handleQueryChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="name, user (e.g. user ofZach) or git url"
              size="small"
              margin="normal"
              variant="outlined"
              onChange={(event) => {
                dispatch({
                  type: "SETQUERY",
                  payload: { value: event.target.value },
                });
              }}
              onKeyPress={(event) => {
                if (event.charCode === 13) {
                  handleSearch();
                }
              }}
              fullWidth
            />
          )}
        />
      </StyledBox>

      <StyledBox>
        <StyledSearchButton
          variant="contained"
          onClick={(event) => {
            handleSearch();
          }}
        ></StyledSearchButton>
      </StyledBox>
    </Box>
  );
};

export default SearchField;
