import React from "react";
import styled from "styled-components";
const Container = styled.div`
  margin-top: 50px;
`;
const Headline = styled.h2`
  font-size: 1.25em;
`;
const CliInfo = () => {
  return (
    <Container>
      <Headline>CLI</Headline>
      <p>
        By the way, <br></br>
        there is also a cli version of the package manager available.<br></br>
        Feel free to check out its{" "}
        <a
          href="https://thomasgeissl.github.io/ofPackageManager/"
          target="_blank"
          rel="noopener noreferrer"
        >
          website
        </a>
        .
      </p>
    </Container>
  );
};

export default CliInfo;
