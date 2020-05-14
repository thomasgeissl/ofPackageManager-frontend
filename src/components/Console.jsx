import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Console = styled.div`
  max-height: 150px;
  overflow-y: scroll;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  padding: 15px;
  background-color: rgb(24, 24, 24);
  color: white;
  text-align: left;
`;
export default () => {
  const output = useSelector((state) => state.console.output);
  const endRef = useRef(null);
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  return (
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
  );
};
