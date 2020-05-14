import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";
import styled from "styled-components";
import store from "./state/store";
import Modal from "@material-ui/core/Modal";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Footer from "./components/Footer";
import ConfigApp from "./components/ConfigApp";
import Notification from "./components/Notification";
import ConfigMessage from "./components/ConfigMessage";
import Home from "./components/Home";
import New from "./components/New";
import Update from "./components/Open";
import UpdateMultiple from "./components/UpdateMultiple";
import ConfigProject from "./components/ConfigProject";
import Header from "./components/Header";
import "./App.css";

const StyledApp = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const StyledContent = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  padding: 15px;
`;
const StyledModal = styled(Modal)`
  overflow: scroll;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#E71B74",
    },
    secondary: {
      main: "#000",
    },
  },
  status: {
    danger: "orange",
  },
});

function App() {
  const [configModalOpen, setConfigModalOpen] = useState(false);
  return (
    <StyledApp className="App">
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <Header
              openConfigHandler={() => {
                setConfigModalOpen(true);
              }}
            ></Header>
            <StyledContent>
              <Switch>
                <Route path="/configProject">
                  <ConfigProject></ConfigProject>
                </Route>
                <Route path="/new">
                  <New></New>
                </Route>
                <Route path="/update">
                  <Update></Update>
                </Route>
                <Route path="/updateMultiple">
                  <UpdateMultiple></UpdateMultiple>
                </Route>
                <Route path="/">
                  <Home></Home>
                </Route>
              </Switch>
            </StyledContent>
            <Footer></Footer>
            <StyledModal
              open={configModalOpen}
              onClose={(event) => {
                setConfigModalOpen(false);
              }}
            >
              <ConfigApp></ConfigApp>
            </StyledModal>
            <Notification></Notification>
            <ConfigMessage></ConfigMessage>
          </Router>
        </ThemeProvider>
      </StoreProvider>
    </StyledApp>
  );
}

export default App;
