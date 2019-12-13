import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import MapView from "../components/MapView";
import Navbar from "../components/Navbar";
import Drawer from "../components/Drawer";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 10vh 80vh 10vh;
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
        <Drawer />
      </MapViewWrapper>
      <Navbar />
    </Wrapper>
  );
}
