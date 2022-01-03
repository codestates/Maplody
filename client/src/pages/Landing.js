import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import LoginModal from '../components/LoginModal';
import Footer from '../components/Footer';
import Loading from './Loading';

import img from '../img/background-img.jpeg';

require('dotenv').config();

axios.defaults.withCredentials = true;

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  width: 120px;
  position: fixed;
  top: -30px;
  left: -10px;
`;

const LandingTitleContainer = styled.div`
  width: 58vw;
  border-radius: 30px;
  background-image: url(${img});
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: 60px;
  padding: 210px 0 0 30px;
`;

const About = styled.div`
  font-size: 20px;
`;

const Title = styled.h5`
  letter-spacing: 20px;
  color: white;
  font-family: Hanna;
  margin-top: 80px;
`;

const MainCatchphrase = styled.h1`
  color: white;
  font-family: Hanna;
  margin-top: 30px;
  width: 80%;
  word-break: keep-all;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  margin: 5px 20px 15px 0;
  width: 200px;
  height: 40px;
  border-radius: 10px;
  border: none;
  font-size: 20px;
  font-family: Hanna;
  transition: 120ms ease all;
  cursor: pointer;
`;

const SubCatchphraseContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 70%;
  font-size: 20px;
  margin-top: 30px;
`;

const SubCatchphrase = styled.div``;

const Landing = ({ accessToken, setAccessToken, setIsLogin, setUserInfo }) => {
  const [loginOpen, setLoginOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const openModalHandler = () => {
    setLoginOpen(!loginOpen);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <LandingContainer>
          <Logo src={require('../img/Maplody_Logo.png').default} />
          <LandingTitleContainer>
            <About>
              <Title>Maplody</Title>
              <MainCatchphrase>기억하고 싶은 순간의 들리던 음악을 소중한 추억으로 간직하세요</MainCatchphrase>
            </About>
            <ButtonContainer>
              <Button onClick={openModalHandler}>시작하기</Button>
            </ButtonContainer>
          </LandingTitleContainer>
          <SubCatchphraseContainer>
            <SubCatchphrase>
              <p>누구나 한 순간 기억하고 싶은 때가 있습니다.</p>
              <p>그 순간을 함께한 소중한 인연과 그때 들려오던 음악을 저장하고 추억을 언제나 꺼내보세요.</p>
              <br />
              <p>언젠가 그때 그 노래가 들려오면...</p>
              <p>다시 그곳에 방문하면...</p>
              <br />
              <p>당신을 다시 그곳으로 돌려 놓을</p>
              <br />
              <p>"Maplody 하세요"</p>
            </SubCatchphrase>
          </SubCatchphraseContainer>
          {loginOpen ? (
            <LoginModal
              accessToken={accessToken}
              setAccessToken={setAccessToken}
              openModalHandler={openModalHandler}
              setIsLogin={setIsLogin}
              setUserInfo={setUserInfo}
            />
          ) : null}
          <Footer />
        </LandingContainer>
      )}
    </>
  );
};
export default Landing;
