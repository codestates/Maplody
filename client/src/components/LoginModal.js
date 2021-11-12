import React from 'react';
import { useState } from 'react';
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
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  background-color: white;
  width: 388px;
  height: 500px;
`;
const CloseBtn = styled.a`
  border-radius: 50px;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: black;
`
export const IdPasswordContainer = styled.div`
  margin-left: 10px;
`;
const Title = styled.div`
  font-size: 40px;
  color: black;
  width: 365px;
  text-align: center;
  margin: 0 0 15px 0;
`;
const IdText = styled.div`
  font-size: 25px;
  color: black;
  padding: 10px 0 2px;
`;
export const IdInput = styled.input.attrs({ type: 'text' })`
  font-size: 17px;
  width: 250px;
  height: 2.1em;
  outline: none;
  cursor: pointer;
  border: solid 1px black;
  margin-left: 42px;

  &:focus {
    outline: 1px solid #FF0066;
    border: hidden;
  }
`;
export const PwText = styled.div`
  font-size: 25px;
  color: black;
  padding: 10px 0 2px;
`;
export const PwInput = styled.input.attrs({ type: 'password' })`
  font-size: 17px;
  width: 250px;
  height: 2.2em;
  outline: none;
  border: solid 1px black;
  cursor: pointer;
  margin-left: 20px;

  &:focus {
    outline: 1px solid #FF0066;
    border: hidden;
  }
`;
const LoginBtn = styled.div`
  font-size: 20px;
  border: 1px solid black;
  padding: 5px;
  width: 300px;
  color: black;
  cursor: pointer;
  margin-top: 70px;
  margin-left: 25px;
  text-align: center;
  &:hover {
    box-shadow: gray 3px 3px 3px;
  }
`;

const GoogleBtn = styled.div`
  font-size: 20px;
  border: 1px solid black;
  padding: 5px;
  width: 300px;
  color: black;
  cursor: pointer;
  margin-top: 25px;
  margin-left: 25px;
  text-align: center;
  &:hover {
    box-shadow: gray 3px 3px 3px;
  }
`;
const SignupBtn = styled.div`
  font-size: 20px;
  border: 1px solid black;
  padding: 5px;
  width: 300px;
  color: black;
  cursor: pointer;
  margin-top: 25px;
  margin-left: 25px;
  text-align: center;
  &:hover {
    box-shadow: gray 3px 3px 3px;
  }
`;


const LoginModal = ({loginOpen, setLoginOpen, openModalHandler}) => {
  const [signupOpen, setSignupOpen] = useState(false)
  const openSignupHandler = () => {
    setSignupOpen(!signupOpen)
  }
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  
  const handleChange = (e) => {
    if (e.target.type === 'text') {
      setUserId(e.target.value);
    }
    if (e.target.type === 'password') {
      setPassword(e.target.value);
    }
  };
  

  return (
    
    <LoginModalContainer>
     <LoginModalBackdrop onClick={openModalHandler}>
      <LoginModalWindow onClick={(e) => e.stopPropagation()}>
        <CloseBtn className="fas fa-times" onClick={openModalHandler}></CloseBtn>
        <IdPasswordContainer>
              <Title>Login</Title>
              <IdText>아이디
                <IdInput onChange={handleChange} />
              </IdText>
              <PwText>비밀번호
                <PwInput onChange={handleChange} />
              </PwText>
              <LoginBtn>로그인</LoginBtn>
              <GoogleBtn>Google로 로그인</GoogleBtn>
              <SignupBtn onClick={openSignupHandler}> 회원가입</SignupBtn>
              {signupOpen ? <SignupModal openSignupHandler={openSignupHandler} /> : null}
            </IdPasswordContainer>
      </LoginModalWindow>
     </LoginModalBackdrop>
    </LoginModalContainer>

  );
};

export default LoginModal;
