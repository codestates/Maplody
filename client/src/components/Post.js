import React from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import styled from 'styled-components';

const PostContainer = styled.div`
  margin-bottom: 5px;
`;

const MusicInfoContainer = styled.div`
  width: fit-content;
  font-size: 23px;
  display: flex;
  justify-content: flex-start;
  margin: 5px;
  border-bottom: 3px #dd4a68 solid;
`;

const MicIcon = styled.i`
  margin-right: 15px;
  color: #dd4a68;
`;

const MusicTitle = styled.div`
  margin-left: 15px;
`;

const MusicSinger = styled.div``;

const PostInfo = styled.div`
  font-size: 18px;
  display: flex;
  justify-content: flex-start;
  margin-top: 15px;
  padding: 0 0 0 15px;
`;

const PostPlaceIcon = styled.i`
  margin-right: 15px;
  color: #dd4a68;
`;

const PostCreatedPlace = styled.div``;

const PostCreatedAtIcon = styled.i`
  margin-right: 15px;
  color: #dd4a68;
  margin-left: 40px;
  padding-top: 2px;
`;

const PostCreatedAt = styled.div``;

const PostContentContainer = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  margin-top: 10px;
`;

const PostStoryboard = styled.div`
  font-size: 16px;
  word-wrap: break-word;
  width: 300px;
  padding: 10px;
  margin-left: 15px;
`;
const ButtonContainer = styled.button`
width: 55px;
height: 25px;
margin-top: 5px;
margin-left: 500px;
margin-bottom: -10px;
align-items: right;
`;
const DeleteBtn = styled.div`
font-size: 13px;
`;

const Post = ({ id, getAddress, musicTitle, musicArtist, createdAt, url, storyBoard }) => {

  const DeleteBtnHandler = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/post/${id}`, 
      {id: id},
      {withCredentials: true})
      .then((res) => {
        alert('포스트가 삭제되었습니다.');
       return;
      })
      .catch((err) => {
        alert('잘못된 요청입니다.');
      });
  };

  return (
    <PostContainer>
      <MusicInfoContainer>
        <MicIcon className="fas fa-microphone-alt" />
        <MusicSinger>{musicArtist}</MusicSinger>
        <MusicTitle>{musicTitle}</MusicTitle>
      </MusicInfoContainer>
      <PostInfo>
        <PostPlaceIcon className="fas fa-map-marked-alt" />
        <PostCreatedPlace>{getAddress}</PostCreatedPlace>
        <PostCreatedAtIcon className="fas fa-calendar-day" />
        <PostCreatedAt>{createdAt.slice(0, 10)}</PostCreatedAt>
      </PostInfo>
      <PostContentContainer>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${url}`}
          loop
          controls
          width={'180px'}
          height={'100px'}
        />
        <PostStoryboard>{storyBoard}</PostStoryboard>
      </PostContentContainer>
      <ButtonContainer onClick={DeleteBtnHandler}>
          <DeleteBtn>삭제</DeleteBtn>
      </ButtonContainer>
    </PostContainer>
  );
};

export default Post;
