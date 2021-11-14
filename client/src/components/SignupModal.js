import React, { useState } from 'react';
import styled from 'styled-components';

const SignupModalContainer = styled.div`
  height: 13.5rem;
`;

const SignupModalBackdrop = styled.div`
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

const SignupModalWindow = styled.div`
  border-radius: 15px;
  background-color: white;
  width: 450px;
  height: 650px;
`;

const CloseBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  border-radius: 15px;
  font-size: 28px;
  cursor: pointer;
  margin: 10px;
`;

const IdPasswordContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 40px;
  text-align: center;
`;
const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 35px;
`;
const ProfilePicture = styled.div`
  border: solid 3px red;
  width: 90px;
  height: 90px;
`;

const ProfileText = styled.div`
  font-size: 25px;
  font-weight: bolder;
  border-bottom: solid 3px #ff0066;
`;

const SignupInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 0 25px 35px;
`;

const NicknameText = styled.div`
  font-size: 25px;
`;

const NicknameInput = styled.input.attrs({ type: 'text' })`
  font-size: 17px;
  width: 250px;
  height: 40px;
  cursor: pointer;
  border: solid 3px;
  border-radius: 5px;
  margin-left: 42px;
  padding: 10px;
  transition: 100ms ease all;

  &:focus {
    outline: 3px solid #ff0066;
    border: hidden;
  }
`;

const EmailText = styled.div`
  font-size: 25px;
  padding: 10px 0 2px;
`;

const EmailInput = styled.input.attrs({ type: 'text' })`
  font-size: 17px;
  width: 250px;
  height: 40px;
  cursor: pointer;
  border: solid 3px;
  border-radius: 5px;
  margin-left: 42px;
  padding: 10px;
  transition: 100ms ease all;

  &:focus {
    outline: 3px solid #ff0066;
    border: hidden;
  }
`;

const IdText = styled.div`
  font-size: 25px;
  padding: 10px 0 2px;
`;

const IdInput = styled.input.attrs({ type: 'text' })`
  font-size: 17px;
  width: 250px;
  height: 40px;
  cursor: pointer;
  border: solid 3px;
  border-radius: 5px;
  margin-left: 42px;
  padding: 10px;
  transition: 100ms ease all;

  &:focus {
    outline: 3px solid #ff0066;
    border: hidden;
  }
`;

const PwText = styled.div`
  font-size: 25px;
  padding: 10px 0 2px;
`;

const PwInput = styled.input.attrs({ type: 'password' })`
  font-size: 17px;
  width: 250px;
  height: 40px;
  cursor: pointer;
  border: solid 3px;
  border-radius: 5px;
  margin-left: 24px;
  padding: 10px;
  transition: 100ms ease all;

  &:focus {
    outline: 3px solid #ff0066;
    border: hidden;
  }
`;

const PwCheckText = styled.div`
  font-size: 25px;
  padding: 10px 0 2px;
`;

const PwCheckInput = styled.input.attrs({ type: 'password' })`
  font-size: 17px;
  width: 188px;
  height: 40px;
  cursor: pointer;
  border: solid 3px;
  border-radius: 5px;
  margin-left: 42px;
  padding: 10px;
  transition: 100ms ease all;

  &:focus {
    outline: 3px solid #ff0066;
    border: hidden;
  }
`;

const SignupSubmitBtn = styled.div`
  height: 45px;
  margin: 5px 30px 15px 30px;
  border: solid 3px;
  border-radius: 15px;
  background-color: white;
  box-shadow: gray 4px 4px 4px;
  cursor: pointer;
  text-align-last: center;
  min-width: 200px;
  transition: 300ms ease all;
  padding-top: 2px;
  font-size: 25px;

  &:hover {
    box-shadow: gray 4px 4px 4px;
    color: #ff0066;
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

const SignupModal = ({ openSignupHandler }) => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const handleChange = (e) => {
    if (e.target.placeholder === 'Nickname') {
      setNickname(e.target.value);
    }
    if (e.target.placeholder === 'E-Mail') {
      setEmail(e.target.value);
    }
    if (e.target.placeholder === 'ID') {
      setUserId(e.target.value);
    }
    if (e.target.placeholder === 'Password') {
      setPassword(e.target.value);
    }
    if (e.target.placeholder === 'Verify Password') {
      setPasswordCheck(e.target.value);
    }
  };
  return (
    <SignupModalContainer>
      <SignupModalBackdrop onClick={openSignupHandler}>
        <SignupModalWindow onClick={(e) => e.stopPropagation()}>
          <CloseBtn className="fas fa-times" onClick={openSignupHandler} />
          <IdPasswordContainer>
            <Title>회원가입</Title>
            <ProfileContainer>
              <ProfilePicture />
              <ProfileText>프로필 사진</ProfileText>
            </ProfileContainer>
            <SignupInputContainer>
              <NicknameText>
                닉네임
                <NicknameInput placeholder={'Nickname'} onChange={handleChange} />
              </NicknameText>
              <EmailText>
                이메일
                <EmailInput placeholder={'E-Mail'} onChange={handleChange} />
              </EmailText>
              <IdText>
                아이디
                <IdInput placeholder={'ID'} onChange={handleChange} />
              </IdText>
              <PwText>
                비밀번호
                <PwInput placeholder={'Password'} nChange={handleChange} />
              </PwText>
              <PwCheckText>
                비밀번호 확인
                <PwCheckInput placeholder={'Verify Password'} onChange={handleChange} />
              </PwCheckText>
            </SignupInputContainer>
            <SignupSubmitBtn>회원가입</SignupSubmitBtn>
            {/* 버튼 눌렀을때 회원가입 성공하면 알려주고, 창 닫겨서 바로 로그인 할 수 있게 만든다. */}
          </IdPasswordContainer>
        </SignupModalWindow>
      </SignupModalBackdrop>
    </SignupModalContainer>
  );
};

export default SignupModal;
