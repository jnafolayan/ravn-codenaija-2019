import React, { useContext } from "react";
import { Link } from "@reach/router";
import styled from "styled-components";
import { ThemeContext } from "../contexts/ThemeContext";

const Wrapper = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.bg};
  display: flex;
  align-items: center;
  justify-content: center;

  > a {
    text-decoration: none;
    flex: 1;
    padding: 12px;
    text-align: center;
    color: #fff;
  }
`;

export default function Navbar() {
  const { state } = useContext(ThemeContext);

  return (
    <Wrapper theme={state}>
      <Link to="/nearby">
        <i className="fa fa-2x fa-exclamation-circle"></i>
      </Link>
      <Link to="/">
        <i className="fa fa-2x fa-home"></i>
      </Link>
      <Link to="/profile">
        <i className="fa fa-2x fa-user"></i>
      </Link>
      <Link to="/mobile">
        <i className="fa fa-2x fa-shield-alt"></i>
      </Link>
    </Wrapper>
  );
}
