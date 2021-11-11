import React from 'react';
import styled from 'styled-components';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';

const map = () => {
  return <GoogleMap defaultZoom={10} defaultCenter={{ lat: 45.421532, lng: -75.697189 }} />;
};

const WrappedMap = withScriptjs(withGoogleMap(map));

const MapContainer = styled.div`
  display: inline;
  width: 100vw;
  height: 100vh;
  z-index: -100;
`;

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
