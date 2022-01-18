import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LoadingLogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
  border-radius: 15px;
`;

const LoadingBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

const animation = keyframes`
    100% {
    	transform: rotateY(360deg);
    }
`;

const LogoBorder = styled.div`
  border: 10px solid;
  border-radius: 15px;
`;

const Logo = styled.img`
  height: 23vh;
  transition: all ease 1s;
  animation: ${animation} 4s linear infinite;
`;

const LoadingText = styled.div`
  position: absolute;
  top: 59vh;
`;

const Loading = () => {
  return (
    <LoadingPageContainer>
      <LoadingBackdrop>
        <LoadingLogoContainer>
          <LogoBorder>
            <Logo src={require('../img/Maplody_Logo.png').default} />
          </LogoBorder>
          <LoadingText>Loading...</LoadingText>
        </LoadingLogoContainer>
      </LoadingBackdrop>
    </LoadingPageContainer>
  );
};
export default Loading;
