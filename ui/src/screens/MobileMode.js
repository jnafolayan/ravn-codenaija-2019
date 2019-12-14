import React, { useState, useContext } from "react";
import { navigate } from "@reach/router";
import styled from "styled-components";
import { ThemeContext } from "../contexts/ThemeContext";
import Header from "../components/Header";
import PushButton from "../components/PushButton";
import CancelDistress from "../components/CancelDistress";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 75px calc(100vh - 135px) 60px;
  background: ${({ theme }) => theme.bg};

  > .cancel {
    color: #ddd;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.bg};
  }
`;

export default function Home() {
  const { state: theme } = useContext(ThemeContext);
  const [buttonPushed, setButtonPushed] = useState(false);

  const askForCancelCode = () => {
    setTimeout(() => setButtonPushed(true), 800);
  };

  const cancelDistress = () => {
    setButtonPushed(false);
  };

  const sendSignal = () => {
    console.log("Sending signal");
  };

  return (
    <Wrapper theme={theme}>
      <Header />
      {
        !buttonPushed ?
        <PushButton onRelease={askForCancelCode} /> :
        <CancelDistress onCancel={cancelDistress} onProceed={sendSignal} />
      }
      <div className="cancel">
        <i className="fa fa-2x fa-times" onClick={() => navigate("/")}></i>
      </div>
    </Wrapper>
  );
}
