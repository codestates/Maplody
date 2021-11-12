import React from 'react';
import styled, { keyframes } from 'styled-components';

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

const MusicAlbumJaket = styled.div`
  z-index: 998;
  width: 100px;
  height: 100px;
  border: solid 3px red;
  margin-right: 15px;
  padding: 3px;
  box-shadow: gray 4px 4px 4px;
`;

const StoryBord = styled.textarea`
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

const NewPostModal = () => {
  return (
    <NewPostModalContainer>
      <MusicInfoContainer>
        <SingerName placeholder="가수이름" />
        <MusicTitle placeholder="노래 제목" />
      </MusicInfoContainer>
      <PostInfoContainer>
        <MusicAlbumJaket>앨범자켓</MusicAlbumJaket>
        <StoryBord placeholder="사연을 적어 주세요." />
      </PostInfoContainer>
      <RegisterButton>등록하기</RegisterButton>
    </NewPostModalContainer>
  );
};

export default NewPostModal;
