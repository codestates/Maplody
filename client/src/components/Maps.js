import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import Post from './Post';
import NewPostModal from './NewPostModal';
import Loading from '../pages/Loading';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import '@reach/combobox/styles.css';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};

const ComboboxContainer = styled.div`
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 400px;
  z-index: 10;

  .input {
    padding: 0.5rem;
    font-size: 1rem;
    width: 100%;
  }
`;

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

  const onMapClick = useCallback((e) => {
    setTarget({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    setMarkerVisible(true);
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
  }, []);

  useEffect(() => {
    getPostHandler();
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
      <Search panTo={panTo} />
      <GoogleMap
        accessToken={accessToken}
        issueTokens={issueTokens}
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}>
        <Marker
          onClick={() => {
            openNewPostModalHandler();
            markerAddressHandler();
          }}
          animation={2}
          position={target}
          visible={markerVisible}>
          {isOpenNewPostModal ? (
            <InfoWindow
              zIndex={998}
              onCloseClick={() => {
                openNewPostModalHandler();
              }}>
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
            icon={{
              url: require('../img/music-notes.png').default,
            }}>
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

const Search = ({ panTo }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 37.51249519205713, lng: () => 126.99480974427608 },
      radius: 200 * 1000,
    },
  });

  return (
    <ComboboxContainer>
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();
          try {
            const results = await getGeocode({ address: address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
            setValue('');
          } catch (err) {
            console.log('error');
          }
        }}>
        <ComboboxInput
          className="input"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder={'주소를 입력하세요'}
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === 'OK' && data.map(({ id, description }) => <ComboboxOption key={id} value={description} />)}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </ComboboxContainer>
  );
};

export default Maps;
