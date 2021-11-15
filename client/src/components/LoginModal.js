import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import SignupModal from './SignupModal';

const LoginModalContainer = styled.div`
  height: 13.5rem;
`;
const LoginModalBackdrop = styled.div`
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
const LoginModalWindow = styled.div`
  border-radius: 15px;
  background-color: white;
  width: 388px;
  height: 500px;
`;

const CloseBtn = styled.a`
  display: flex;
  justify-content: flex-end;
  border-radius: 15px;
  font-size: 28px;
  cursor: pointer;
  margin: 10px;
`;

const Title = styled.div`
  font-size: 40px;
  color: black;
  width: 365px;
  text-align: center;
  margin: 0 0 5px 0;
`;
const IdText = styled.div`
  font-size: 25px;
  padding: 15px 20px 0 35px;
`;

const IdPasswordContainer = styled.div``;

const IdInput = styled.input`
  margin: 15px;
  font-size: 23px;
  padding: 5px 0 5px 10px;
`;

const PwText = styled.div`
  font-size: 25px;
  padding: 0 15px 15px 15px;
`;

const LoginBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PwInput = styled.input.attrs({ type: 'password' })`
  margin: 15px;
  font-size: 23px;
  padding: 5px 0 5px 10px;
`;

const LoginBtn = styled.div`
  height: 45px;
  width: 350px;
  border: solid 3px;
  border-radius: 15px;
  background-color: white;
  box-shadow: gray 4px 4px 4px;
  cursor: pointer;
  text-align-last: center;
  min-width: 200px;
  transition: 300ms ease all;
  font-size: 25px;
  margin-bottom: 15px;
  padding-top: 3px;

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

const GoogleBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  width: 350px;
  border: solid 3px;
  border-radius: 15px;
  background-color: white;
  box-shadow: gray 4px 4px 4px;
  cursor: pointer;
  min-width: 200px;
  transition: 300ms ease all;
  font-size: 25px;
  margin-bottom: 15px;

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

const GoogleIcon = styled.img`
  width: 30px;
  margin-right: 10px;
`;

const SignupBtn = styled.div`
  height: 45px;
  width: 350px;
  border: solid 3px;
  border-radius: 15px;
  background-color: white;
  box-shadow: gray 4px 4px 4px;
  cursor: pointer;
  text-align-last: center;
  min-width: 200px;
  transition: 300ms ease all;
  font-size: 25px;
  padding-top: 3px;

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

const LoginModal = ({ accessToken, setAccessToken, loginOpen, setLoginOpen, openModalHandler }) => {
  const [signupOpen, setSignupOpen] = useState(false);
  const openSignupHandler = () => {
    setSignupOpen(!signupOpen);
  };
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.type === 'text') {
      setUserId(e.target.value);
    }
    if (e.target.type === 'password') {
      setPassword(e.target.value);
    }
  };

  const loginBtnHandler = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/user-login`,
        { userId: userId, password: password },
        { withCredentials: true },
      )
      .then((res) => {
        setAccessToken(res.data.data);
        navigate('/main');
      })
      .catch((err) => {
        alert('ID와 Password를 확인해 주세요!');
      });
  };

  return (
    <LoginModalContainer>
      <LoginModalBackdrop onClick={openModalHandler}>
        <LoginModalWindow onClick={(e) => e.stopPropagation()}>
          <CloseBtn className="fas fa-times" onClick={openModalHandler} />
          <IdPasswordContainer>
            <Title>Login</Title>
            <IdText>
              아이디
              <IdInput onChange={handleChange} />
            </IdText>
            <PwText>
              비밀번호
              <PwInput onChange={handleChange} />
            </PwText>
            <LoginBtnContainer>
              <LoginBtn onClick={loginBtnHandler}>로그인</LoginBtn>
              <GoogleBtn>
                <GoogleIcon src={require('../img/google login logo.png').default} />
                Google로 로그인
              </GoogleBtn>
              <SignupBtn onClick={openSignupHandler}> 회원가입</SignupBtn>
              {signupOpen ? <SignupModal openSignupHandler={openSignupHandler} /> : null}
            </LoginBtnContainer>
          </IdPasswordContainer>
        </LoginModalWindow>
      </LoginModalBackdrop>
    </LoginModalContainer>
  );
};

export default LoginModal;
