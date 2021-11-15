import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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

const SingerName = styled.input`
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
  margin-bottom: 10px;
  padding: 5px;
  padding-top: 0;
  padding-bottom: 0;
  width: fit-content;
`;

const MusicVideo = styled.div`
  z-index: 998;
  width: 100px;
  height: 100px;
  border: solid 3px red;
  margin-right: 15px;
  padding: 3px;
  box-shadow: gray 4px 4px 4px;
`;

const StoryBoard = styled.textarea`
  z-index: 998;
  width: 60%;
  padding: 3px;
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
  width: 120px;
  height: 30px;
  margin-top: 10px;
  margin-left: 58%;
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

const NewPostModal = ({ getAddress }) => {
  const [singerName, setSingerName] = useState('');
  const [musicTitle, setMusicTitle] = useState('');
  const [storyBoard, setStoryBoard] = useState('');

  const [getVideo, setGetVideo] = useState({});

  const paramsVideo = {
    q: `${singerName} ${musicTitle}`,
  };

  const videoSearchHandler = () => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_KEY}&part=snippet&q=${paramsVideo.q}&maxResults=1&type=video&regionCode=KR&videoDuration=short`,
        { withCredentials: false },
      )
      .then((res) => {
        setGetVideo(res);
      });
  };

  const postHandler = () => {};

  const handleChange = (e) => {
    if (e.target.placeholder === '가수 이름') {
      setSingerName(e.target.value);
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
        <SingerName placeholder="가수 이름" onChange={handleChange} />
        <MusicTitle placeholder="노래 제목" onChange={handleChange} />
      </MusicInfoContainer>
      <MarkerAddress>{getAddress}</MarkerAddress>
      <PostInfoContainer>
        <MusicVideo onClick={videoSearchHandler}>노래 제목과 가수 이름을 입력하시고 눌러주세요!</MusicVideo>
        <StoryBoard placeholder="사연을 적어 주세요." onChange={handleChange} />
      </PostInfoContainer>
      <RegisterButton>등록하기</RegisterButton>
    </NewPostModalContainer>
  );
};

export default NewPostModal;
