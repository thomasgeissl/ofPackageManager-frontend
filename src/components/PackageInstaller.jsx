import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
import styled from "styled-components";
import Search from "./Search";

const StyledModal = styled(Modal)`
  overflow: scroll;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  background-color: white;
  position: relative;
  width: 90%;
  height: 90%;
  padding: 15px;
  overflow: auto;
`;

export default () => {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <>
      <Box display="flex" justifyContent="flex-end">
        <Box>
          <Button variant="contained" onClick={() => setSearchModalOpen(true)}>
            install additional addons
          </Button>
        </Box>
      </Box>

      <StyledModal
        open={searchModalOpen}
        onClose={() => {
          setSearchModalOpen(false);
        }}
      >
        <Container>
          <Search></Search>
        </Container>
      </StyledModal>
    </>
  );
};
