import React from 'react';
import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

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
  border-radius: 70%;
  overflow: hidden;
  cursor: pointer;
  transition: 300ms ease all;

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
  justify-content: center;
  height: 100%;
  width: 380px;
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
`;

const AboutUser = styled.div`
  text-align: end;
`;

const UserNickName = styled.div`
  font-weight: bolder;
  margin-bottom: 10px;
`;

const UserId = styled.div`
  opacity: 70%;
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

const MypageSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <MenuContainer>
      <MyProfile onClick={openModalHandler} src={require('../img/빡빡이아죠시.jpg').default}></MyProfile>
      {isOpen ? (
        <ModalBackdrop onClick={openModalHandler}>
          <SidebarContainer onClick={(e) => e.stopPropagation()}>
            <UserInfo>
              <MyProfile src={require('../img/빡빡이아죠시.jpg').default} />
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
          </SidebarContainer>
        </ModalBackdrop>
      ) : null}
    </MenuContainer>
  );
};

export default MypageSidebar;
