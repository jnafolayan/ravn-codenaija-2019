import React from "react";
import Navbar from "../components/Navbar";
import MapView from "../components/MapView";

export default function Home() {
  return (
    <div>
      <MapView />
      <Navbar />
    </div>
  );
}
