import React, { useState, useContext } from "react";
import { navigate } from "@reach/router";
import styled from "styled-components";
import { ThemeContext } from "../contexts/ThemeContext";
import Header from "../components/Header";
import MapView from "../components/MapView";
import Navbar from "../components/Navbar";
import Drawer from "../components/Drawer";
import NewsContextProvider from "../contexts/NewsContext";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 75px calc(100vh - 150px) 75px;

  @media (orientation: landscape) {
    grid-template-rows: 75px 100vw 75px;
  }
`;

const MapViewWrapper = styled.div`
  position: relative;
`;

const LoadingMap = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ddd;
  font-family: "Open Sans", sans-serif;
  font-size: 1.2rem;
  text-align: center;
  background: ${({ theme }) => theme.bg};
`;

const Write = styled.div`
  position: absolute;
  top: 10px;
  left: 12px;
  border-radius: 50%;
  background: #fff;
  width: 50px;
  height: 50px;
  text-align: center;
  z-index: 10;
  box-shadow: 0 4px 16px rgba(20,20,20,0.6);
  cursor: pointer;

  i {
    line-height: 50px;
  }
`;

export default function Home() {
  const { state: theme } = useContext(ThemeContext);
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <Wrapper>
      <Header />
      <MapViewWrapper>
        <MapView onLoad={() => setMapLoaded(true)} />
        {
          mapLoaded ? 
          <React.Fragment>
            <Write onClick={() => navigate("/write")}>
              <i className="fa fa-bullhorn"></i>
            </Write>
            <NewsContextProvider>
              <Drawer />
            </NewsContextProvider>
          </React.Fragment> :
          <LoadingMap theme={theme}>Loading map...</LoadingMap>
        }
      </MapViewWrapper>
      <Navbar />
    </Wrapper>
  );
}
