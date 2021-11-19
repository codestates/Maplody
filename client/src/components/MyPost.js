import React from 'react';
import ReactPlayer from 'react-player';
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
  width: 30px;
  height: 40px;
  border: 3px solid green;
  z-index: 999;
`;

const MusicTitle = styled.div`
  width: 10px;
`;

const MusicSinger = styled.div``;

const CreatedInfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 50;
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

const MyPost = ({ postList }) => {
  return (
    <>
      {postList.map((el) => (
        <CreatedPost>
          <MusicInfoContainer>
            <MusicTitle>{el.musicTitle}</MusicTitle>
            <MusicSinger>{el.musicArtist}</MusicSinger>
          </MusicInfoContainer>
          <CreatedInfoContainer>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${el.url}`}
              playing
              loop
              controls
              width={'73px'}
              height={'73px'}
            />
            <CreatedInfo>
              <PostCreatedPlace>{el.getAddress}</PostCreatedPlace>
              <PostCreatedAt>{el.createdAt.slice(0, 10)}</PostCreatedAt>
            </CreatedInfo>
          </CreatedInfoContainer>
        </CreatedPost>
      ))}
    </>
  );
};

export default MyPost;
