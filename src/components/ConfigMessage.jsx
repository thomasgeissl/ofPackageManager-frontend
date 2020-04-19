import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  overflow: scroll;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
`;
const Inner = styled.div`
  width: 66%;
  height: 33%;
`;
export default () => {
  const foundCliConfig = useSelector((state) => state.meta.foundCliConfig);
  return (
    <>
      {!foundCliConfig && (
        <Container>
          <Inner>
            <h1>
              oups, it seems that the cli not installed or has not yet ran the
              config task
            </h1>
            <ul>
              <li>
                brew tap thomasgeissl/tools <br></br>brew install
                ofpackagemanager<br></br>
                brew install ofprojectgenerator
              </li>
              <li>ofPackageManager config -g</li>
            </ul>
          </Inner>
        </Container>
      )}
    </>
  );
};
