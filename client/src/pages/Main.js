import React from 'react';
import styled from 'styled-components';

const Maindiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  margin-bottom: 40px;
  width: 70%;
  height: 92%;
`;

const Main = () => {
  return <Maindiv>나는야 메인페이지</Maindiv>;
};
export default Main;
