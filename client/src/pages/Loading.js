import React, { useState, useEffect } from 'react';
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
  min-height: 100vh;
`;

const animation = keyframes`
    100% {
    	transform: rotateY(360deg);
    }
`;

const LogoBorder = styled.div`
  border: 10px solid;
  border-radius: 15px;
  box-shadow: 15px 15px 15px 15px gray;
`;

const Logo = styled.img`
  height: 60vh;
  transition: all ease 1s;
  animation: ${animation} 4s linear infinite;
`;

const Loading = () => {
  return (
    <LoadingPageContainer>
      <LoadingLogoContainer>
        <LogoBorder>
          <Logo src={require('../img/Maplody_Logo.png').default} />
        </LogoBorder>
      </LoadingLogoContainer>
    </LoadingPageContainer>
  );
};
export default Loading;
