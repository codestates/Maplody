import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import ReactPlayer from 'react-player';
import MyInfoFixModal from './MyInfoFixModal';

const slideIn = keyframes`
    from {
      right: -400px;
    }
    to {
      right: 0;
    }
`;

const MenuContainer = styled.div``;

const MyProfile = styled.img`
  width: 90px;
  height: 90px;
  border: 3px solid;
  border-radius: 70%;
  overflow: hidden;
  cursor: pointer;
  transition: 300ms ease all;
  z-index: 997;
  position: fixed;
  top: 35px;
  left: auto;
  bottom: 0;
  right: 50px;

  &:hover {
    opacity: 80%;
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;

  animation-name: ${slideIn};
  animation-duration: 1s;
  animation-delay: -0.3s;
  animation-timing-function: 300ms ease all;
`;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px 0 0 20px;
  height: 100%;
  width: 400px;
  margin-right: 0;
  margin-left: auto;
  background-color: white;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: fit-content;
  margin: 15px;
  padding: 15px;
  border-radius: 15px;
  box-shadow: 4px 4px 4px 4px gray;
  font-size: 25px;
`;

const AboutUser = styled.div`
  display: flex;
  align-items: end;
  flex-direction: column;
  width: 200px;
`;

const UserNickName = styled.div`
  border-bottom: #ff0066 3px dashed;
`;

const UserId = styled.div``;

const UserPostCountContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const UserPostCountIcon = styled.div`
  margin-right: 50px;
  color: red;
`;

const UserPostCount = styled.div``;

const UserCreatedAt = styled.div`
  border-bottom: 3px dashed;
`;

const CreatedPostContainer = styled.div`
  height: 650px;
  width: 350px;
  box-shadow: 4px 4px 4px 4px gray;
  border-radius: 15px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const CreatedPost = styled.div`
  width: 300px;
  height: fit-content;
  margin: 15px 5px 15px 20px;
  padding: 5px 15px 15px 15px;
  box-shadow: 2px 2px 2px 2px gray;
  border-radius: 15px;
`;

const MusicInfoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 5px;
`;

const MicIcon = styled.i`
  margin-right: 15px;
  color: #dd4a68;
`;

const MusicTitle = styled.div`
  margin-right: 15px;
`;

const MusicSinger = styled.div``;

const CreatedInfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const CreatedInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 140px;
  font-size: 18px;
`;

const PostPlaceContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const PostPlaceIcon = styled.i`
  margin-left: 8px;
  margin-right: 10px;
  color: #dd4a68;
  padding-top: 2px;
`;

const PostCreatedPlace = styled.text`
  border: none;
  resize: none;
  font-size: 14px;
`;

const PostCreatedAtIcon = styled.i`
  margin-left: 15px;
  margin-right: 10px;
  color: #dd4a68;
  padding-top: 2px;
`;

const PostCreatedAtContainer = styled.div`
  display: flex;
  width: 150px;
`;

const PostCreatedAt = styled.text`
  border: none;
  resize: none;
`;

const UserInfoButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 335px;
  margin-top: 15px;
`;

const UserInfoButton = styled.button`
  height: 50px;
  border: solid 3px;
  border-radius: 15px;
  background-color: white;
  box-shadow: gray 4px 4px 4px;
  cursor: pointer;
  text-align-last: center;
  min-width: 150px;
  transition: 300ms ease all;
  font-size: 25px;

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

const MypageSidebar = ({ accessToken, setAccessToken, setIsLogin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userinfoOpen, setUserinfoOpen] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({ userInfo: { nickname: '', userId: '', createdAt: '' }, postList: [] });

  const Swal = require('sweetalert2');

  const userInfoHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/userinfo`, {
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      })
      .then((res) => {
        setUserInfo(res.data.userinfo);
        setisLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setisLoading(true);
    userInfoHandler();
  }, []);

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };
  const userinfoModalHandler = () => {
    setUserinfoOpen(!userinfoOpen);
  };

  const navigate = useNavigate();

  const LogoutBtnHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user-logout`)
      .then((res) => {
        setAccessToken('');
        setIsLogin(false);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '로그아웃 되었습니다.',
          confirmButtonText: '확인',
          confirmButtonColor: '#FF6E01',
          width: '20rem',
          timer: 2000,
        });
        navigate('/');
      })
      .catch((err) => {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: '잘 못 된 요청입니다.',
          confirmButtonText: '확인',
          confirmButtonColor: '#FF6E01',
          width: '20rem',
          timer: 2000,
        });
      });
  };

  return (
    <>
      {isLoading ? (
        'loading...'
      ) : (
        <MenuContainer>
          <MyProfile onClick={openModalHandler} src={require('../img/user.png').default} />
          {isOpen ? (
            <ModalBackdrop onClick={openModalHandler}>
              <SidebarContainer onClick={(e) => e.stopPropagation()}>
                <UserInfo>
                  <MyProfile onClick={openModalHandler} src={require('../img/user.png').default} />
                  <AboutUser>
                    <UserNickName>{userInfo.userInfo.nickname}</UserNickName>
                    <UserId>{userInfo.userInfo.userId}</UserId>
                    <UserPostCountContainer>
                      <UserPostCountIcon className="fas fa-map-marked-alt" />
                      <UserPostCount>{userInfo.postList.length}</UserPostCount>
                    </UserPostCountContainer>
                    <UserCreatedAt>{userInfo.userInfo.createdAt.slice(0, 10)}</UserCreatedAt>
                  </AboutUser>
                </UserInfo>
                <CreatedPostContainer>
                  {userInfo.postList.map((el) => (
                    <CreatedPost>
                      <MusicInfoContainer>
                        <MicIcon className="fas fa-microphone-alt" />
                        <MusicTitle>{el.musicTitle}</MusicTitle>
                        <MusicSinger>{el.musicArtist}</MusicSinger>
                      </MusicInfoContainer>
                      <CreatedInfoContainer>
                        <ReactPlayer
                          url={`https://www.youtube.com/watch?v=${el.url}`}
                          loop
                          width={'120px'}
                          height={'90px'}
                        />
                        <CreatedInfo>
                          <PostPlaceContainer>
                            <PostPlaceIcon className="fas fa-map-marked-alt" />
                            <PostCreatedPlace>{el.getAddress.slice(5)}</PostCreatedPlace>
                          </PostPlaceContainer>
                          <PostCreatedAtContainer>
                            <PostCreatedAtIcon className="fas fa-calendar-day" />
                            <PostCreatedAt>{el.createdAt.slice(0, 10)}</PostCreatedAt>
                          </PostCreatedAtContainer>
                        </CreatedInfo>
                      </CreatedInfoContainer>
                    </CreatedPost>
                  ))}
                </CreatedPostContainer>
                <UserInfoButtonContainer>
                  <UserInfoButton onClick={LogoutBtnHandler}>로그아웃</UserInfoButton>
                  <UserInfoButton onClick={userinfoModalHandler}>회원정보 수정</UserInfoButton>
                  {userinfoOpen ? (
                    <MyInfoFixModal
                      accessToken={accessToken}
                      userinfoModalHandler={userinfoModalHandler}
                      userInfo={userInfo}
                      setAccessToken={setAccessToken}
                      setIsLogin={setIsLogin}
                    />
                  ) : null}
                </UserInfoButtonContainer>
              </SidebarContainer>
            </ModalBackdrop>
          ) : null}
        </MenuContainer>
      )}
    </>
  );
};

export default MypageSidebar;