import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import ReactPlayer from 'react-player';
import MyInfoFixModal from './MyInfoFixModal';

const slideIn = keyframes`
    from {
      right: -380px;
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
  width: 385px;
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
  border-bottom: 3px dashed;
`;

const UserNickName = styled.div`
  border-bottom: #ff0066 3px dashed;
  margin-right: 40px;
  margin-left: 30px;
`;

const UserId = styled.div`
  margin-right: 40px;
`;

const UserPostCountContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 40px;
`;

const UserPostCountIcon = styled.div`
  margin-right: 50px;
  color: red;
`;

const UserPostCount = styled.div``;

const UserCreatedAt = styled.div``;

const CreatedPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 650px;
  width: 340px;
  padding: 15px;
  box-shadow: 4px 4px 4px 4px gray;
  border-radius: 15px;
`;

const CreatedPost = styled.div`
  width: 300px;
  height: 140px;
  margin: 5px;
  padding: 5px;
  box-shadow: 2px 2px 2px 2px gray;
  border-radius: 15px;
`;

const MusicInfoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 5px;
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
`;

const PostCreatedPlace = styled.textarea`
  border: none;
  resize: none;
`;

const PostCreatedAt = styled.textarea`
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
        alert('로그아웃 되었습니다.');
        navigate('/');
      })
      .catch((err) => {
        alert('잘못된 요청입니다.');
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
                    <UserId>  {userInfo.userInfo.userId} 님</UserId>
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
                        <MusicTitle>{el.musicTitle}</MusicTitle>
                        <MusicSinger>{el.musicArtist}</MusicSinger>
                      </MusicInfoContainer>
                      <CreatedInfoContainer>
                        <ReactPlayer
                          url={`https://www.youtube.com/watch?v=${el.url}`}
                          loop
                          width={'80px'}
                          height={'80px'}
                        />
                        <CreatedInfo>
                          <PostCreatedPlace>{el.getAddress}</PostCreatedPlace>
                          <PostCreatedAt>{el.createdAt.slice(0, 10)}</PostCreatedAt>
                        </CreatedInfo>
                      </CreatedInfoContainer>
                    </CreatedPost>
                  ))}
                </CreatedPostContainer>
                <UserInfoButtonContainer>
                  <UserInfoButton onClick={LogoutBtnHandler}>로그아웃</UserInfoButton>
                  <UserInfoButton onClick={userinfoModalHandler}>회원정보 수정</UserInfoButton>
                  {userinfoOpen ? (
                    <MyInfoFixModal accessToken={accessToken} userinfoModalHandler={userinfoModalHandler} userInfo={userInfo}/>
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