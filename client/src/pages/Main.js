import React from 'react';
import styled from 'styled-components';

import Maps from '../components/Maps';
import MypageSidebar from '../components/MypageSidebar';

const MainContainer = styled.div``;

const Logo = styled.img`
  position: fixed;
  height: 150px;
  top: 82%;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
`;

const MapContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
`;

const Main = ({ accessToken, setAccessToken, setIsLogin, issueTokens }) => {
  return (
    <MainContainer>
      <MypageSidebar
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        issueTokens={issueTokens}
        setIsLogin={setIsLogin}
      />
      <Logo src={require('../img/Maplody_Logo.png').default} />
      <MapContainer>
        <Maps accessToken={accessToken} issueTokens={issueTokens} />
      </MapContainer>
    </MainContainer>
  );
};

export default Main;
