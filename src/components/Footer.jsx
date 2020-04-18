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
        ofPackageManager CLI
      </a>{" "}
      version: {version.major}.{version.minor}.{version.patch}, frontend
      version: {frontendVersion}
    </Container>
  );
};
