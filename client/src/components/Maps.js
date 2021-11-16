import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import Post from './Post';
import MypageDummydata from '../static/MypageDummydata';
import NewPostModal from './NewPostModal';

const MapContainer = styled.div`
  display: inline;
  width: 100%;
  height: 100%;
  z-index: -100;
`;

const Map = () => {
  const [target, setTarget] = useState({ lat: '', lng: '' });
  const [selected, setSelected] = useState(null);
  const [isOpenNewPostModal, setIsOpenNewPostModal] = useState(false);
  const [getAddress, setGetAddress] = useState(null);
  const [post, setPost] = useState([]);

  const paramsAddress = {
    latlng: `${target.lat},${target.lng}`,
  };

  const markerAddressHandler = () => {
    if (paramsAddress.latlng === ',') return;
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${paramsAddress.latlng}&language=ko&key=${process.env.REACT_APP_GEOCODING_KEY}`,
        { withCredentials: false },
      )
      .then((res) => {
        setGetAddress(res.data.results[0].formatted_address);
      });
    return;
  };

  const addMarkerHandler = (e) => {
    setTarget({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    markerAddressHandler();
  };

  const openNewPostModalHandler = () => {
    setIsOpenNewPostModal(!isOpenNewPostModal);
  };
  useEffect(() => {
    //header에 accessToken 추가해주세요~
    axios.get(`${process.env.REACT_APP_API_URL}/post`, { withCredentials: true }).then((res) => {
      setPost(res.data.data);
    });
  }, []);

  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 37.51249519205713, lng: 126.99480974427608 }}
      options={{ disableDefaultUI: true }}
      onClick={addMarkerHandler}>
      <Marker onClick={openNewPostModalHandler} animation={2} position={target}>
        {isOpenNewPostModal ? (
          <InfoWindow zIndex={998}>
            <NewPostModal target={target} getAddress={getAddress} />
          </InfoWindow>
        ) : null}
      </Marker>

      {post.map((el) => (
        <Marker
          key={el.id}
          position={{
            lat: Number(el.lat),
            lng: Number(el.lng),
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
              <Post
                key={el.id}
                getAddress={el.getAddress}
                musicTitle={el.musicTitle}
                musicArtist={el.musicArtist}
                createdAt={el.createdAt}
                url={el.url}
                storyBoard={el.storyBoard}
              />
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
