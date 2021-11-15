import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import Post from './Post';
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
  padding: 10px;
  border-radius: 15px;
  box-shadow: 4px 4px 4px 4px gray;
`;

const AboutUser = styled.div`
  text-align: end;
  font-size: 23px;
  padding-left: 25px;
`;

const UserNickName = styled.div`
  font-weight: bolder;
  margin-bottom: 10px;
`;

const UserId = styled.div`
  opacity: 60%;
  margin-bottom: 3px;
`;

const UserPostCountContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 3px;
`;

const UserPostCountIcon = styled.div`
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

const MypageSidebar = ({ accessToken, setAccessToken }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userinfoOpen, setUserinfoOpen] = useState(false);

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };
  const userinfoModalHandler = () => {
    setUserinfoOpen(!userinfoOpen);
  };

  const navigate = useNavigate();

  const LogoutBtnHandler = () => {
    axios
      .get()
      .then((res) => {
        setAccessToken('');
        alert('로그아웃 되었습니다.');
        navigate({ pathname: '/' });
      })
      .catch((err) => {
        alert('잘못된 요청입니다.');
      });
  };

  return (
    <MenuContainer>
      <MyProfile onClick={openModalHandler} src={require('../img/빡빡이아죠시.jpg').default}></MyProfile>
      {isOpen ? (
        <ModalBackdrop onClick={openModalHandler}>
          <SidebarContainer onClick={(e) => e.stopPropagation()}>
            <UserInfo>
              <MyProfile onClick={openModalHandler} src={require('../img/빡빡이아죠시.jpg').default} />
              <AboutUser>
                <UserNickName>갬성폭팔님</UserNickName>
                <UserId>hhhghg100</UserId>
                <UserPostCountContainer>
                  <UserPostCountIcon className="fas fa-map-marked-alt" />
                  <UserPostCount>4</UserPostCount>
                </UserPostCountContainer>
                <UserCreatedAt>2021.11.08</UserCreatedAt>
              </AboutUser>
            </UserInfo>
            <CreatedPostContainer>
              <Post />
            </CreatedPostContainer>
            <UserInfoButtonContainer>
              <UserInfoButton onClick={LogoutBtnHandler}>로그아웃</UserInfoButton>
              <UserInfoButton onClick={userinfoModalHandler}>회원정보 수정</UserInfoButton>
              {userinfoOpen ? <MyInfoFixModal userinfoModalHandler={userinfoModalHandler} /> : null}
            </UserInfoButtonContainer>
          </SidebarContainer>
        </ModalBackdrop>
      ) : null}
    </MenuContainer>
  );
};

export default MypageSidebar;
