import React, { useState } from "react";
import styled from "styled-components";

export default function CancelDistress({ onCancel }) {
  const a = Math.floor(Math.random() * 10);
  const b = Math.floor(Math.random() * 10);
  const c = Math.floor(Math.random() * 10);
  const d = Math.floor(Math.random() * 10);
  const code = [a, b, c, d].join("");
  const [generatedCode, setGeneratedCode] = useState(code);
  const [input, setInput] = useState([null, null, null, null]);
  const [inputBox, setInputBox] = useState(0);

  const pushNumber = ({ target }) => {
    if (inputBox >= input.length) return;

    input[inputBox] = +target.dataset.value;
    setInput(input);
    setInputBox(inputBox + 1);

    if (inputBox == 3 && input.join("") == generatedCode) {
      setTimeout(onCancel(), 600);
    }
  };

  const reset = () => {
    setInput([null, null, null, null]);
    setInputBox(0);
  };

  return (
    <Wrapper>
      <p className="intro">Enter the code below to cancel the distress signal</p>
      <p className="generated-code">{generatedCode}</p>
      <div className="boxes">
        <div>{input[0]}</div>
        <div>{input[1]}</div>
        <div>{input[2]}</div>
        <div>{input[3]}</div>
      </div>
      <div className="numpad">
        <button type="button" data-value="1" onClick={pushNumber}>1</button>
        <button type="button" data-value="2" onClick={pushNumber}>2</button>
        <button type="button" data-value="3" onClick={pushNumber}>3</button>
        <button type="button" data-value="4" onClick={pushNumber}>4</button>
        <button type="button" data-value="5" onClick={pushNumber}>5</button>
        <button type="button" data-value="6" onClick={pushNumber}>6</button>
        <button type="button" data-value="7" onClick={pushNumber}>7</button>
        <button type="button" data-value="8" onClick={pushNumber}>8</button>
        <button type="button" data-value="9" onClick={pushNumber}>9</button>
        <div></div>
        <button type="button" data-value="0" onClick={pushNumber}>0</button>
        <button type="button" onClick={reset}>X</button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 12px 18px;

  .intro {
    font-family: "Open Sans", sans-serif;
    font-size: 1rem;
    color: #ddd;
    text-align: center;
    margin-bottom: 16px;
  }

  .generated-code {
    letter-spacing: 0.1rem;
    font-family: Poppins, sans-serif;
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 18px;
    color: #fff;
  }

  .boxes {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 12px;
    margin: 0 auto;
    width: 80%;

    > div {
      background: rgba(70,70,70,0.8);
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #fff;
      font-weight: bold;
      font-size: 1.4rem;
      font-family: "Open Sans", sans-serif;
    }
  }

  .numpad {
    display: grid;
    width: 100%;
    margin: 38px auto 0 auto;
    grid-template-columns: 85px 85px 85px;
    grid-template-rows: 85px 85px 85px 85px;
    grid-gap: 12px;
    justify-content: center;

    button {
      background: transparent;
      border: 1px solid rgb(100, 100, 100);
      color: #fff;
      font-size: 1.4rem;
      font-family: Poppins, sans-serif;
      transition: all 0.3s;

      &:hover,
      &:focus {
        background: hsl(50, 100%, 48%);
        outline: none;
        color: #111;
      }
    }
  }
`;