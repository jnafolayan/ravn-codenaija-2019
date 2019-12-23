import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../contexts/ThemeContext";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .button-outline {
    border-radius: 50%;
    width: 240px;
    height: 240px;
    background: rgba(28,28,28,0);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation: grow 0.7s infinite ease-in;

    .button {
      border-radius: 50%;
      width: 220px;
      height: 220px;
      background: radial-gradient(circle at center, hsl(5, 100%, 25%) 40%, hsl(3, 82%, 42%));
      box-shadow: 0 8px 24px rgba(30,30,30,0.85);
      transition: all 0.5s;

      &:hover {
        cursor: pointer;
      }

      &.down {
        background: radial-gradient(circle at center, hsl(140, 100%, 25%) 55%, hsl(142, 82%, 38%));
      }
    }
  }

  .tip {
    display: none;
    text-align: center;
    margin: 20px auto;
    font-family: "Open Sans", sans-serif;
    font-size: 1rem;
    padding: 0 18px;
    max-width: 468px;
    color: #dcdcdc;
  }
`;

export default function PushButton({ onRelease }) {
  const { state: theme } = useContext(ThemeContext);
  const [buttonDown, setButtonDown] = useState(false);

  const startButtonPress = () => {
    setButtonDown(true);
  };

  const endButtonPress = (event) => {
    setButtonDown(false);
    onRelease();
  };
 
  return (
    <Wrapper theme={theme}>
      <div className="button-outline">
        <div 
          className={"button" + (buttonDown ? " down" : "")} 
          onTouchStart={startButtonPress} 
          onTouchEnd={endButtonPress} 
          onMouseDown={startButtonPress} 
          onMouseUp={endButtonPress}>
        </div>
      </div>
      <p className="tip">
        Press and hold to send a distress signal
      </p>
    </Wrapper>
  );
}