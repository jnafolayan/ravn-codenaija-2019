import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../contexts/ThemeContext";

const Wrapper = styled.div`
  position: absolute;
  height: 70%;
  width: 100%;
  z-index: 2;
  top: 30%;

  .header {
    display: flex;
    align-items: center;

    > h3 {
      flex: 1;
      color: #fff;
      padding: 16px 18px;
      text-align: center;
      font-size: 18px;
      font-family: Poppins, sans-serif;
      background: ${({ theme }) => theme.bg};
    
      &:nth-child(1) {
        border-top-left-radius: 8px;
      }

      &:nth-child(2) {
        border-top-right-radius: 8px;
      }

      &:not(.active) {
        background: #777;
      }
    }
  }

  .body {
    background: ${({ theme }) => theme.bg};
  }
`;

export default function Drawer() {
  const { state } = useContext(ThemeContext);

  const openTab = ({ target }) => {
    console.log(target)
  };

  return (
    <Wrapper theme={state}>
      <header className="header">
        <h3 className="active" onClick={openTab}>Nearby</h3>
        <h3 onClick={openTab}>Trending</h3>
      </header>
      <div className="body">
      </div>
    </Wrapper>
  );
}
