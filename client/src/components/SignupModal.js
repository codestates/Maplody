import React from 'react';
import { useState } from 'react';
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
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  background-color: white;
  width: 450px;
  height: 650px;
`;
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
const ProfileContainer = styled.div`
display: flex;
`;
const ProfilePicture = styled.div`
border: solid 3px black;
width: 90px;
height: 90px;
`;
const ProfileText = styled.div`
  font-size: 25px;
  color: black;
  padding: 10px 0 2px 30px;
`;
const NicknameText = styled.div`
  font-size: 25px;
  color: black;
  padding: 10px 0 2px;
`;
export const NicknameInput = styled.input.attrs({ type: 'text' })`
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
const EmailText = styled.div`
  font-size: 25px;
  color: black;
  padding: 10px 0 2px;
`;
export const EmailInput = styled.input.attrs({ type: 'text' })`
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
export const PwCheckText = styled.div`
  font-size: 25px;
  color: black;
  padding: 10px 0 2px;
`;
export const PwCheckInput = styled.input.attrs({ type: 'password' })`
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
const BottomContainer = styled.div`
display: flex;
margin-top: 40px;
`;
const HomeBtn = styled.div`
  font-size: 20px;
  border: 1px solid black;
  padding: 5px;
  width: 150px;
  color: black;
  cursor: pointer;
  margin-top: 25px;
  margin-left: 25px;
  text-align: center;
  &:hover {
    box-shadow: gray 3px 3px 3px;
  }
`;
const SignupSubmitBtn = styled.div`
  font-size: 20px;
  border: 1px solid black;
  padding: 5px;
  width: 150px;
  color: black;
  cursor: pointer;
  margin-top: 25px;
  margin-left: 25px;
  text-align: center;
  &:hover {
    box-shadow: gray 3px 3px 3px;
  }
`;

const SignupModal = ({openSignupHandler}) => {
  const [nickname, setNickname] = useState('')
  const [email, setemail] = useState('')
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const handleChange = (e) => {
    if (e.target.type === 'text') {
      setUserId(e.target.value);
    }
    if (e.target.type === 'password') {
      setPassword(e.target.value);
    }
  };
  return (
  <SignupModalContainer>
  <SignupModalBackdrop onClick={openSignupHandler}>
   <SignupModalWindow onClick={(e) => e.stopPropagation()}>
     <IdPasswordContainer>
           <Title>회원가입</Title>
           <ProfileContainer>
            <ProfilePicture />
            <ProfileText>프로필 사진</ProfileText>
           </ProfileContainer>
           <NicknameText>닉네임
             <NicknameInput onChange={handleChange} />
           </NicknameText>
           <EmailText>이메일
              <EmailInput onChange={handleChange} />           
            </EmailText>
           <IdText>아이디
             <IdInput onChange={handleChange} />
           </IdText>
           <PwText>비밀번호
             <PwInput onChange={handleChange} />
           </PwText>
           <PwCheckText>비밀번호 확인
             <PwCheckInput onChange={handleChange} />
           </PwCheckText>
          <BottomContainer>
           <HomeBtn>홈으로</HomeBtn>
          <SignupSubmitBtn> 회원가입</SignupSubmitBtn>
          </BottomContainer>
         </IdPasswordContainer>
   </SignupModalWindow>
  </SignupModalBackdrop>
 </SignupModalContainer>
 )
};

export default SignupModal;
