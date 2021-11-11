import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';

const map = () => {
  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 37.51249519205713, lng: 126.99480974427608 }}
      options={{ disableDefaultUI: true }}
    />
  );
};

const WrappedMap = withScriptjs(withGoogleMap(map));

const MapContainer = styled.div`
  display: inline;
  width: 100vw;
  height: 100vh;
  z-index: -100;
`;

const Maps = () => {
  const [places, setPlaces] = useState([]);

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
