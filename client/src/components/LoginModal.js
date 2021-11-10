import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const LoginModalContainer = styled.div`
  margin: 40px;
  width: 500px;
  height: 500px;
  border: solid 3px red;
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

const LoginModalView = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  background-color: white;
  width: 388px;
  height: 435px;
`;

const CloseBtn = styled.div`
  font-size: 28px;
  color: black;
  cursor: pointer;
`;

const ModalInsideContainer = styled.div`
  margin-left: 10px;
`;

const Title = styled.div`
  margin: 40px;
`;

const Id_text = styled.div`
  margin: 40px;
`;

const Id_Input = styled.div`
  margin: 40px;
`;

const Pw_text = styled.div`
  margin: 40px;
`;

const Pw_Input = styled.div`
  margin: 40px;
`;

const LoginBtn = styled.div`
  margin: 40px;
`;

const LoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const loginBtnHandler = () => {
    setIsOpen(true);
  };
  const openModalHandler = () => {
    setIsOpen(false);
  };
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
      {isOpen === true ? (
        <LoginModalBackdrop onClick={openModalHandler}>
          <LoginModalView onClick={(e) => e.stopPropagation()}>
            <CloseBtn className="fas fa-times" onClick={openModalHandler}></CloseBtn>
            <ModalInsideContainer>
              <Title>Login</Title>
              <Id_text>아이디</Id_text>
              <Id_Input onChange={handleChange} />
              <Pw_text>비밀번호</Pw_text>
              <Pw_Input onChange={handleChange} />
              <LoginBtn onClick={() => loginBtnHandler()}>Login</LoginBtn>
            </ModalInsideContainer>
          </LoginModalView>
        </LoginModalBackdrop>
      ) : null}
    </LoginModalContainer>
  );
};

export default LoginModal;
