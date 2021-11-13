import React, { useState } from 'react';
import styled from 'styled-components';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import MapDummydata from '../static/MapDummydata';
import NewPostModal from './NewPostModal';

const MapContainer = styled.div`
  display: inline;
  width: 100%;
  height: 100%;
  z-index: -100;
`;

const Map = () => {
  const [target, setTarget] = useState({ lat: null, lng: null });
  const [selected, setSelected] = useState(null);
  const [isOpenNewPostModal, setIsOpenNewPostModal] = useState(false);
  const addMarkerHandler = (e) => {
    setTarget({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };
  const openNewPostModalHandler = () => {
    setIsOpenNewPostModal(!isOpenNewPostModal);
  };

  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 37.51249519205713, lng: 126.99480974427608 }}
      options={{ disableDefaultUI: true }}
      onClick={addMarkerHandler}>
      <Marker onClick={openNewPostModalHandler} animation={2} position={target}>
        {isOpenNewPostModal ? (
          <InfoWindow>
            <NewPostModal />
          </InfoWindow>
        ) : null}
      </Marker>

      {MapDummydata.map((el) => (
        <Marker
          key={el.id}
          position={{
            lat: el.lat,
            lng: el.lng,
          }}
          place={el.place}
          music={el.music}
          onClick={() => {
            setSelected(el);
          }}
          icon={{ url: require('../img/music-notes.png').default }}>
          {selected && selected.id === el.id && (
            <InfoWindow
              onCloseClick={() => {
                setSelected(null);
              }}>
              <div>
                <h2>{selected.music}</h2>
                <p>{selected.place}</p>
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}
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
