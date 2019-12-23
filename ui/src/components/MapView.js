import React, { useContext } from "react";
import DeckGL from "@deck.gl/react";
import { LineLayer } from "@deck.gl/layers";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import { NewsContext } from "../contexts/NewsContext";

export function MapView({ google, userCoords, onLoad }) {
  const { state: news } = useContext(NewsContext);
  console.log(userCoords)

  onLoad();

  return (
      <Map
        id="hello"
        google={google} 
        zoom={1}
        // center={{ lat: userCoords.lng, lng: userCoords.lat }}
        // center={userCoords}
        styles={[
          {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#263c3f'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#6b9a76'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#38414e'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#212a37'}]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9ca5b3'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#746855'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#1f2835'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#f3d19c'}]
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{color: '#2f3948'}]
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#17263c'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#515c6d'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#17263c'}]
          }
        ]}
      >
        <Marker 
          name={'Current location'}
          position={userCoords} />

        {
          news.nearby.map(d => (
            <Marker
              key={d._id}
              name={d.headline}
              position={{ lat: d.location[0], lng: d.location[1]}}
            />
          ))
        }
      </Map>
  );
}

export default GoogleApiWrapper({
  // apiKey: "AIzaSyC3IWu37nfnJ23ADg1MiXdlO6ui18hGy3I",
  apiKey: "AIzaSyDEMIU5oJBAJopuHiFud9Nju6txhDYihBg"
})(MapView);