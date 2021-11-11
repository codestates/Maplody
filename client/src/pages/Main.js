import React from 'react';
import styled from 'styled-components';

import SearchInput from '../components/SearchInput';
import MypageSidebar from '../components/MypageSidebar';

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px;
`;

const Logo = styled.img`
  position: fixed;
  height: 120px;
  top: 85%;
  left: 0;
  bottom: 0;
  right: 0;
`;

const Main = () => {
  return (
    <MainContainer>
      <SearchInput />
      <Logo src={require('../img/Maplody_Logo.png').default} />
      <MypageSidebar />
    </MainContainer>
  );
};
export default Main;

// {sidebarOpen ? <MypageSidebar /> : null}
