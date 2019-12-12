import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import MapView from "../components/MapView";
import Navbar from "../components/Navbar";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 10vh 80vh 10vh;
`;

const MapViewWrapper = styled.div`
  position: relative;
  
  > .overlay {
    background: rgba(80,80,80,0.45);
    width: 100%;
    height: 100%;
    position: absolute;
  }
`;

export default function Home() {
  return (
    <Wrapper>
      <Header />
      <MapViewWrapper>
        <MapView style={{}} />
        {/*<div className="overlay"></div>*/}
        <Drawer title="Nearby" body={null} />
      </MapViewWrapper>
      <Navbar />
    </Wrapper>
  );
}
