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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const DeleteBtn = styled.button`
  height: 50px;
  border: solid 3px;
  border-radius: 15px;
  background-color: white;
  box-shadow: gray 4px 4px 4px;
  cursor: pointer;
  text-align-last: center;
  min-width: 60px;
  transition: 300ms ease all;
  font-size: 20px;

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

const Post = ({
  id,
  getAddress,
  musicTitle,
  musicArtist,
  createdAt,
  url,
  storyBoard,
  setSelected,
  navigate,
  issueTokens,
}) => {
  const Swal = require('sweetalert2');

  const DeleteBtnHandler = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/post/${id}`, { id: id }, { withCredentials: true })
      .then((res) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '포스트가 삭제되었습니다',
          confirmButtonText: '확인',
          confirmButtonColor: '#FF6E01',
          timer: 2000,
        });
        setSelected(null);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        issueTokens();
        // Swal.fire({
        //   position: 'center',
        //   icon: 'error',
        //   title: '잘 못 된 요청입니다',
        //   confirmButtonText: '확인',
        //   confirmButtonColor: '#FF6E01',
        //   timer: 2000,
        // });
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
        <ReactPlayer url={`https://www.youtube.com/watch?v=${url}`} loop controls width={'420px'} height={'250px'} />
        <PostStoryboard>{storyBoard}</PostStoryboard>
      </PostContentContainer>
      <ButtonContainer>
        <DeleteBtn onClick={DeleteBtnHandler}>삭제</DeleteBtn>
      </ButtonContainer>
    </PostContainer>
  );
};

export default Post;
