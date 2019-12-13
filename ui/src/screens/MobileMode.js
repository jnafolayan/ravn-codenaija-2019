import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import PushButton from "../components/PushButton";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 75px auto 30px;
  
  @media (orientation: landscape) {
    grid-template-rows: 75px 100vw 75px;
  }
`;

const MapViewWrapper = styled.div`
  position: relative;
`;

export default function Home() {
  return (
    <Wrapper>
      <Header />
      <PushButton />
    </Wrapper>
  );
}
