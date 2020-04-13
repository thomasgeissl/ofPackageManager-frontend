import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const Container = styled.footer`
  text-align: left;
  width: 100%;
  padding: 15px;
`;
const Name = styled.span`
  margin-left: 15px;
  font-size: 2em;
`;
export default () => {
  const history = useHistory();
  const cwd = useSelector((state) => state.project.cwd);
  const name = useSelector((state) => state.project.cwd)
    .split(/[\\/]/)
    .pop();
  return (
    <Container>
      <Button
        variant="contained"
        onClick={(event) =>
          // history.goBack()
          history.push("/")
        }
      >
        <ArrowBackIcon></ArrowBackIcon>
      </Button>
      <Tooltip title={`${cwd}`}>
        <Name>{name}</Name>
      </Tooltip>
    </Container>
  );
};
