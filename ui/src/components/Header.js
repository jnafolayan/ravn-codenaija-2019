import React, { useContext } from "react";
import styled from "styled-components";

import { ThemeContext } from "../contexts/ThemeContext";
import Logo from "../assets/img/logo.png";

const Wrapper = styled.div`
  width: 100%;
  padding: 22px 18px;
  text-align: center;
  background: ${({ theme }) => theme.bg};

  img {
    display: block;
    width: 30px;
    height: auto;
    margin: 0 auto;
  }
`;

export default function Header() {
  const { state } = useContext(ThemeContext);

  return (
    <Wrapper theme={state}>
      <img src={Logo} alt="Logo" />
    </Wrapper>
  );
}