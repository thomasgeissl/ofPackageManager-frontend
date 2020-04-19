import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import packageConfig from "../../package.json";
const frontendVersion = packageConfig.version;

const Container = styled.footer`
  text-align: left;
  padding-top: 5px;
  padding-bottom: 5px;
`;
export default () => {
  const version = useSelector((state) => state.meta.ofPackageManagerCliVersion);
  return (
    <Container>
      <a
        href="https://github.com/thomasgeissl/ofPackageManager"
        target="_blank"
        rel="noopener noreferrer"
      >
        cli
      </a>
      @{version.major}.{version.minor}.{version.patch},{" "}
      <a
        href="https://github.com/thomasgeissl/ofPackageManager-frontend"
        target="_blank"
        rel="noopener noreferrer"
      >
        frontend
      </a>
      @{frontendVersion},{" "}
      <a
        href="https://github.com/openframeworks/projectGenerator"
        target="_blank"
        rel="noopener noreferrer"
      >
        ofProjectGenerator
      </a>
      @n/a
    </Container>
  );
};
