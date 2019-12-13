import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import MapView from "../components/MapView";
import Navbar from "../components/Navbar";
import Drawer from "../components/Drawer";
import NewsContextProvider from "../contexts/NewsContext";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 75px auto 75px;

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
      <MapViewWrapper>
        <MapView />
        <NewsContextProvider>
          <Drawer />
        </NewsContextProvider>
      </MapViewWrapper>
      <Navbar />
    </Wrapper>
  );
}
