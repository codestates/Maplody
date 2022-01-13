import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import { useNavigate } from 'react-router';
import Post from './Post';
import NewPostModal from './NewPostModal';
import Loading from '../pages/Loading';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const center = {
  lat: 37.51249519205713,
  lng: 126.99480974427608,
};

const Maps = ({ accessToken, issueTokens }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
    libraries,
  });
  const [posts, setPosts] = useState([]);
  const [target, setTarget] = useState({ lat: null, lng: null });
  const [selected, setSelected] = useState(null);
  const [isOpenNewPostModal, setIsOpenNewPostModal] = useState(false);
  const [getAddress, setGetAddress] = useState(null);
  const [markerVisible, setMarkerVisible] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);

  const getPostHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/post`, {
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      })
      .then((res) => {
        setPosts(res.data.data);
        setIsDeleted(false);
        console.log('res.data', res.data.data);
      })
      .catch((err) => {
        issueTokens();
      });
  };

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

  useEffect(() => {
    getPostHandler();
    console.log('useEffect');
  }, [isOpenNewPostModal, isDeleted]);

  if (loadError) {
    return 'Error loading maps';
  }
  if (!isLoaded) {
    return <Loading />;
  }

  const openNewPostModalHandler = () => {
    setIsOpenNewPostModal(!isOpenNewPostModal);
  };

  return (
    <div>
      <GoogleMap
        accessToken={accessToken}
        issueTokens={issueTokens}
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
        onClick={(e) => {
          setTarget({ lat: e.latLng.lat(), lng: e.latLng.lng() });
          markerAddressHandler();
          setMarkerVisible(true);
        }}>
        <Marker
          onClick={() => {
            openNewPostModalHandler();
            markerAddressHandler();
          }}
          animation={2}
          position={target}
          visible={markerVisible}>
          {isOpenNewPostModal ? (
            <InfoWindow zIndex={998}>
              <NewPostModal
                issueTokens={issueTokens}
                setMarkerVisible={setMarkerVisible}
                posts={posts}
                setPosts={setPosts}
                target={target}
                getAddress={getAddress}
                openNewPostModalHandler={openNewPostModalHandler}
              />
            </InfoWindow>
          ) : null}
        </Marker>

        {posts.map((el) => (
          <Marker
            key={el.id}
            position={{
              lat: Number(el.lat),
              lng: Number(el.lng),
            }}
            onClick={() => {
              setSelected(el);
            }}
            icon={{ url: require('../img/music-notes.png').default }}>
            {selected && selected.id === el.id && (
              <InfoWindow
                key={el.id}
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
                  setPosts={setPosts}
                  getPostHandler={getPostHandler}
                  posts={posts}
                  setIsDeleted={setIsDeleted}
                />
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </div>
  );
};

export default Maps;
