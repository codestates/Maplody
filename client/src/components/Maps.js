import React, { useState } from 'react';
import styled from 'styled-components';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';

const MapContainer = styled.div`
  display: inline;
  width: 100vw;
  height: 100vh;
  z-index: -100;
`;

const Map = () => {
  const [target, setTarget] = useState({ lat: null, lng: null });

  const addMarkerHandler = (e) => {
    setTarget({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    console.log({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 37.51249519205713, lng: 126.99480974427608 }}
      options={{ disableDefaultUI: true }}
      onClick={addMarkerHandler}>
      <Marker position={target} />;{/* 마커를 찍으면 저장하고 그 이후 그 갯수마다 다 불러온다. */}
    </GoogleMap>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

const Maps = () => {
  return (
    <MapContainer>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&
        libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    </MapContainer>
  );
};

export default Maps;
