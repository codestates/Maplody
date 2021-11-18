import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ReactPlayer from 'react-player';

const NewPostModalContainer = styled.div`
  z-index: 998;
  margin: 15px;
`;

const MusicInfoContainer = styled.div`
  z-index: 998;
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;
`;

const MusicArtist = styled.input`
  z-index: 998;
  width: 100px;
  margin-right: 25px;
  padding: 3px;
  text-align: left;
  border-top: none;
  border-left: none;
  border-right: none;
  padding-top: 10px;
  padding-left: 15px;
  transition: 100ms ease all;

  &:focus {
    outline: none;
    border-bottom: 2px solid #dd4a68;
  }
`;

const MusicTitle = styled.input`
  z-index: 998;
  width: 60%;
  padding: 3px;
  margin-right: 10px;
  padding: 3px;
  text-align: left;
  border-top: none;
  border-left: none;
  border-right: none;
  padding-top: 10px;
  padding-left: 15px;
  transition: 100ms ease all;

  &:focus {
    outline: none;
    border-bottom: 2px solid #dd4a68;
  }
`;

const PostInfoContainer = styled.div`
  z-index: 998;
  display: flex;
  justify-content: space-around;
`;

const MarkerAddress = styled.div`
  z-index: 998;
  text-align: left;
  font-size: 20px;
  border-bottom: 1px solid;
  margin-bottom: 20px;
  padding: 5px;
  width: fit-content;
`;

const NewPostButContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
`;

const MusicSearchButton = styled.button`
  z-index: 998;
  width: 130px;
  height: 30px;
  margin-top: 10px;
  border: solid 3px;
  border-radius: 15px;
  background-color: white;
  box-shadow: gray 4px 4px 4px;
  cursor: pointer;
  text-align-last: center;
  transition: 300ms ease all;

  &:hover {
    box-shadow: gray 4px 4px 4px;
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 0;
    transition: ease all;
  }

  &:hover:before,
  &:hover:after {
    width: 100%;
    transition: ease all;
  }

  &:active {
    box-shadow: none;
  }
`;

const StoryBoard = styled.textarea`
  z-index: 998;
  width: 60%;
  padding: 10px;
  margin-left: 15px;
  resize: none;
  border-radius: 15px;
  transition: 100ms ease all;

  &:focus {
    outline: none;
    border: 2px solid #dd4a68;
    box-shadow: 2px 2px 2px gray;
  }
`;

const RegisterButton = styled.button`
  z-index: 998;
  width: 130px;
  height: 30px;
  margin-top: 10px;
  border: solid 3px;
  border-radius: 15px;
  background-color: white;
  box-shadow: gray 4px 4px 4px;
  cursor: pointer;
  text-align-last: center;
  transition: 300ms ease all;

  &:hover {
    box-shadow: gray 4px 4px 4px;
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 0;
    transition: ease all;
  }

  &:hover:before,
  &:hover:after {
    width: 100%;
    transition: ease all;
  }

  &:active {
    box-shadow: none;
  }
`;

const NewPostModal = ({ getAddress, openNewPostModalHandler, target, accessToken, navigate }) => {
  const [musicArtist, setMusicArtist] = useState('');
  const [musicTitle, setMusicTitle] = useState('');
  const [storyBoard, setStoryBoard] = useState('');
  const [url, setUrl] = useState('');
  const [buttonClick, setButtonClick] = useState(false);

  const paramsVideo = {
    q: `${musicArtist} ${musicTitle}`,
  };

  const buttonClickHandler = () => {
    setButtonClick(!buttonClick);
  };

  const videoSearchHandler = () => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_KEY}&part=snippet&q=${paramsVideo.q}&maxResults=1&type=video&regionCode=KR&videoDuration=short`,
        { headers: { 'Content-Type': 'application/json' }, withCredentials: false },
      )
      .then((res) => {
        setUrl(res.data.items[0].id.videoId);
        buttonClickHandler();
      })
      .catch((err) => console.log(err));
  };

  const Swal = require('sweetalert2');

  const postHandler = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/post`,
        {
          musicArtist: musicArtist,
          musicTitle: musicTitle,
          getAddress: getAddress,
          url: url,
          storyBoard: storyBoard,
          lat: target.lat,
          lng: target.lng,
        },
        {
          headers: { authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      )
      .then((res) => {
        buttonClickHandler();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '등록되었습니다',
          confirmButtonText: '확인',
          confirmButtonColor: '#FF6E01',
          timer: 2000,
        });
        openNewPostModalHandler();
        navigate('/');
      })
      .catch((err) => {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: '잘 못 된 요청입니다.',
          confirmButtonText: '확인',
          confirmButtonColor: '#FF6E01',
          timer: 2000,
        });
      });
  };

  const handleChange = (e) => {
    if (e.target.placeholder === '가수 이름') {
      setMusicArtist(e.target.value);
    }
    if (e.target.placeholder === '노래 제목') {
      setMusicTitle(e.target.value);
    }
    if (e.target.placeholder === '사연을 적어 주세요.') {
      setStoryBoard(e.target.value);
    }
  };

  return (
    <NewPostModalContainer>
      <MusicInfoContainer>
        <MusicArtist placeholder="가수 이름" onChange={handleChange} />
        <MusicTitle placeholder="노래 제목" onChange={handleChange} />
      </MusicInfoContainer>
      <MarkerAddress>{getAddress}</MarkerAddress>
      <PostInfoContainer>
        <ReactPlayer url={`https://www.youtube.com/watch?v=${url}`} playing={false} width={'280px'} height={'140px'} />
        <StoryBoard placeholder="사연을 적어 주세요." onChange={handleChange} />
      </PostInfoContainer>
      <NewPostButContainer>
        <MusicSearchButton onClick={videoSearchHandler}>음악 검색</MusicSearchButton>
        <RegisterButton onClick={postHandler}>등록하기</RegisterButton>
      </NewPostButContainer>
    </NewPostModalContainer>
  );
};

export default NewPostModal;
