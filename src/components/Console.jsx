import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  max-height: 20%;
  overflow-y: scroll;
`;
const Console = styled.div`
  background-color: black;
  color: white;
  text-align: left;
  padding-left: 5px;
  padding-right: 5px;
`;
export default () => {
  const output = useSelector((state) => state.console.output);
  const showConsole = useSelector((state) => state.config.showConsole);
  const endRef = useRef(null);
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" })
    }
  });

  return (
    <Container>
      {showConsole && (
        <Console>
          {output === ""
            ? output
            : output.split("\n").map(function (item, key) {
              return (
                <span key={key}>
                  {item}
                  <br />
                </span>
              );
            })}
          <div ref={endRef} />
        </Console>
      )}
    </Container>
  );
};
