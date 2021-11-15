import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
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
  height: 800px;
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
  padding: 0 0 25px 35px;
`;

const NicknameText = styled.div`
  font-size: 25px;
`;

const NicknameInput = styled.input.attrs({ type: 'text' })`
  font-size: 17px;
  width: 250px;
  height: 40px;
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

const Validation_Check = styled.div`
  color: red;
  font-size: 17px;
  width: fit-content;
  margin: 10px 0 15px 0;
`;

const Validation_Check_Green = styled.div`
  color: green;
  font-size: 17px;
  width: fit-content;
  margin: 10px 0 15px 0;
`;

const PwInput = styled.input.attrs({ type: 'password' })`
  font-size: 17px;
  width: 250px;
  height: 40px;
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

const SignupSubmitBtn = styled.button`
  align-items: center;
  height: 45px;
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
  const [passwordCheck, setPasswordCheck] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    setPasswordCheck(watch('verifyPassword') === watch('password'));
  }, [watch('verifyPassword'), watch('password')]);

  const SignupBtnHandler = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/user-signup`,
        { nickname: watch().nickname, email: watch().email, userId: watch().userId, password: watch().password },
        { withCredentials: true },
      )
      .then((res) => {
        console.log(res);
        alert('회원가입이 완료 되었습니다.');
        openSignupHandler();
      })
      .catch((err) => {
        alert('입력된 정보를 다시 확인해 주세요');
      });
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
                <NicknameInput
                  name="nickname"
                  placeholder={'Nickname'}
                  {...register('nickname', {
                    required: true,
                    minLength: 2,
                  })}
                  onInvalid={(e) => {
                    e.target.setCustomValidity('닉네임은 2글자 이상이어야 합니다.');
                  }}
                  onInput={(e) => {
                    e.target.setCustomValidity('');
                  }}
                />
              </NicknameText>
              {errors.nickname ? (
                <Validation_Check>닉네임은 2글자 이상이어야 합니다.</Validation_Check>
              ) : (
                <Validation_Check />
              )}
              <EmailText>
                이메일
                <EmailInput
                  name="email"
                  placeholder={'E-Mail'}
                  {...register('email', {
                    pattern: /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/,
                    minlength: 10,
                    required: true,
                  })}
                />
              </EmailText>
              {errors.email ? (
                <Validation_Check>올바른 이메일 형식이 아닙니다.</Validation_Check>
              ) : (
                <Validation_Check_Green>사용가능한 이메일 입니다.</Validation_Check_Green>
              )}
              <IdText>
                아이디
                <IdInput
                  name="userId"
                  placeholder={'ID'}
                  {...register('userId', {
                    pattern: /^[a-z0-9_-]{4,20}$/,
                    maxLength: 20,
                    minLength: 4,
                    required: true,
                  })}
                />
              </IdText>
              {errors.userId ? (
                <Validation_Check>아이디는 소문자, 숫자 4~20 글자여야 합니다.</Validation_Check>
              ) : (
                <Validation_Check_Green>사용가능한 아이디 입니다.</Validation_Check_Green>
              )}
              <PwText>
                비밀번호
                <PwInput
                  name="password"
                  placeholder={'Password'}
                  {...register('password', {
                    pattern: /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/,
                    required: true,
                    minLength: 8,
                  })}
                  onInvalid={(e) => {
                    e.target.setCustomValidity('비밀번호는 8글자 이상, 영문, 숫자 조합이어야 합니다.');
                  }}
                  onInput={(e) => {
                    e.target.setCustomValidity('');
                  }}
                />
              </PwText>
              {errors.password ? (
                <Validation_Check>비밀번호는 8글자 이상, 영문, 숫자 조합이어야 합니다.</Validation_Check>
              ) : (
                <Validation_Check_Green>사용가능한 비밀번호 입니다.</Validation_Check_Green>
              )}
              <PwCheckText>
                비밀번호 확인
                <PwCheckInput
                  name="verifyPassword"
                  placeholder={'Verify Password'}
                  {...register('verifyPassword', { required: true })}
                  onInvalid={(e) => {
                    e.target.setCustomValidity('비밀번호가 일치하지 않습니다.');
                  }}
                  onInput={(e) => {
                    e.target.setCustomValidity('');
                  }}
                />
              </PwCheckText>
              {!passwordCheck ? (
                <Validation_Check>비밀번호가 일치하지 않습니다.</Validation_Check>
              ) : (
                <Validation_Check_Green>비밀번호가 일치합니다.</Validation_Check_Green>
              )}
              <SignupSubmitBtn onClick={SignupBtnHandler}>회원가입</SignupSubmitBtn>
            </SignupInputContainer>
          </IdPasswordContainer>
        </SignupModalWindow>
      </SignupModalBackdrop>
    </SignupModalContainer>
  );
};

export default SignupModal;
