import React from 'react';
import styled from 'styled-components';

const CreatedPost = styled.div`
  width: 300px;
  height: 130px;
  margin-bottom: 5px;
  border-bottom: 5px dashed;
`;

const MusicInfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 5px;
`;

const MusicTitle = styled.div``;

const MusicSinger = styled.div``;

const CreatedInfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const MusicAlbumJacket = styled.div`
  border: 3px red solid;
  width: 73px;
  height: 73px;
  margin-top: 3px;
`;

const CreatedInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3px;
`;

const PostCreatedPlace = styled.div`
  width: 170px;
  padding: 2px;
`;

const PostCreatedAt = styled.div`
  width: 170px;
  padding: 2px;
`;

const MyPost = () => {
  return (
    <CreatedPost>
      <MusicInfoContainer>
        <MusicTitle>노래 제목</MusicTitle>
        <MusicSinger>가수이름</MusicSinger>
      </MusicInfoContainer>
      <CreatedInfoContainer>
        <MusicAlbumJacket>앨범 자켓</MusicAlbumJacket>
        <CreatedInfo>
          <PostCreatedPlace>숭실대 입구 3번 출구</PostCreatedPlace>
          <PostCreatedAt>2021.11.11</PostCreatedAt>
        </CreatedInfo>
      </CreatedInfoContainer>
    </CreatedPost>
  );
};

export default MyPost;
