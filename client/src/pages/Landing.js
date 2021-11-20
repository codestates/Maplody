import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Button from '../components/Button';
import LoginModal from '../components/LoginModal';
import Footer from '../components/Footer';
import Loading from './Loading';

import img from '../img/daniel-schludi.jpg';

require('dotenv').config();

axios.defaults.withCredentials = true;

const LandingContainer = styled.div`
  height: 100vh;
  background-image: url(${img});
  background-repeat: no-repeat;
  background-size: cover;
`;

const AboutContainer = styled.div`
  width: fit-content;
  margin-left: 15px;
  height: 80%;
`;

const Logo = styled.img`
  height: 40%;
`;

const About = styled.div`
  font-size: 1.2rem;
  text-align: center;
  word-break: keep-all;
`;

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
          <AboutContainer>
            <Logo src={require('../img/Maplody_Logo.png').default} />
            <About>
              <p>"기억하고 싶은 순간의 들리던 음악을 소중한 추억으로 간직하세요"</p>
              <br />
              <p>누구나 한 순간 기억하고 싶은 때가 있습니다.</p>
              <p>그 순간을 함께한 소중한 인연과</p>
              <p>그때 들려오던 음악을 저장하고 추억을 언제나 꺼내보세요.</p>
              <br />
              <p>언젠가 그때 그 노래가 들려오면...</p>
              <p>다시 그곳에 방문하면...</p>
              <br />
              <p>당신을 다시 그곳으로 돌려 놓을</p>
              <br />
              <p>"Maplody 하세요"</p>
              <Button text="시작하기" onClick={openModalHandler} />
            </About>
            {loginOpen ? (
              <LoginModal
                accessToken={accessToken}
                setAccessToken={setAccessToken}
                openModalHandler={openModalHandler}
                setIsLogin={setIsLogin}
                setUserInfo={setUserInfo}
              />
            ) : null}
          </AboutContainer>
          <Footer />
        </LandingContainer>
      )}
    </>
  );
};
export default Landing;
