import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { useNavigate } from 'react-router';
import Post from './Post';
import NewPostModal from './NewPostModal';

const MapContainer = styled.div`
  display: inline;
  width: 100%;
  height: 100%;
  z-index: -100;
`;

const Map = ({ accessToken, issueTokens }) => {
  const [target, setTarget] = useState({ lat: null, lng: null });
  const [selected, setSelected] = useState(null);
  const [isOpenNewPostModal, setIsOpenNewPostModal] = useState(false);
  const [getAddress, setGetAddress] = useState(null);
  const [post, setPost] = useState([]);
  const [markerVisible, setMarkerVisible] = useState(true);
  const navigate = useNavigate();

  const paramsAddress = {
    latlng: `${target.lat},${target.lng}`,
  };

  const markerAddressHandler = () => {
    if (paramsAddress.latlng === ',' || target.lat === null) return;
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

  const getPostHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/post`, {
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      })
      .then((res) => {
        setPost(res.data.data);
      })
      .catch((err) => {
        issueTokens();
      });
  };

  useEffect(() => {
    getPostHandler();
    markerAddressHandler();
  }, [isOpenNewPostModal]);

  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 37.51249519205713, lng: 126.99480974427608 }}
      options={{ disableDefaultUI: true }}
      onClick={(e) => {
        addMarkerHandler(e);
        setMarkerVisible(true);
      }}>
      <Marker onClick={openNewPostModalHandler} animation={2} position={target} visible={markerVisible}>
        {isOpenNewPostModal ? (
          <InfoWindow zIndex={998}>
            <NewPostModal
              issueTokens={issueTokens}
              setMarkerVisible={setMarkerVisible}
              post={post}
              setPost={setPost}
              target={target}
              getAddress={getAddress}
              openNewPostModalHandler={openNewPostModalHandler}
              navigate={navigate}
            />
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
                id={el.id}
                getAddress={el.getAddress}
                musicArtist={el.musicArtist}
                musicTitle={el.musicTitle}
                createdAt={el.createdAt}
                url={el.url}
                storyBoard={el.storyBoard}
                setSelected={setSelected}
                issueTokens={issueTokens}
                navigate={navigate}
              />
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

const Maps = ({ accessToken, issueTokens }) => {
  return (
    <MapContainer>
      <WrappedMap
        accessToken={accessToken}
        issueTokens={issueTokens}
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
