import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import WithdrawalModal from './WithdrawalModal';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router';

const slideIn = keyframes`
    from {
      right: -435px;
    }
    to {
      right: 0;
    }
`;

const MyInfoFixModalContainer = styled.div`
  height: 100vh;
`;

const MyInfoFixModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;

  animation-name: ${slideIn};
  animation-duration: 1s;
  animation-delay: -0.3s;
  animation-timing-function: 300ms ease all;
`;

const MyInfoFixModalWindow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px 0 0 20px;
  height: 100%;
  width: 435px;
  margin-right: 0;
  margin-left: auto;
  background-color: white;
`;

const CloseBtn = styled.span`
  border-radius: 15px;
  font-size: 28px;
  cursor: pointer;
  margin: 10px 0 10px 370px;
`;

const IdPasswordContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 40px;
  text-align: center;
  margin-bottom: 25px;
`;

const MyinfoInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 35px 0 25px 35px;
`;

const NicknameText = styled.div`
  font-size: 25px;
  margin-bottom: 25px;
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

const EmailContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EmailText = styled.div`
  font-size: 25px;
  padding: 10px 0 2px;
  margin-bottom: 25px;
`;

const EmailUser = styled.div`
  font-size: 25px;
  margin-right: 25px;
  padding: 10px 0 2px;
`;

const IdContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IdText = styled.div`
  font-size: 25px;
  padding: 10px 0 2px;
  margin-bottom: 25px;
`;

const IdUser = styled.div`
  font-size: 25px;
  margin-right: 25px;
  padding: 10px 0 2px;
`;

const PwText = styled.div`
  font-size: 25px;
  padding: 10px 0 2px;
  margin-bottom: 25px;
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
  width: 188px;
  height: 40px;
  border: solid 3px;
  border-radius: 5px;
  margin-left: 86px;
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

const MyInfoFixSubmitBtn = styled.button`
  height: 45px;
  margin: 30px 30px 15px 30px;
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
  margin-bottom: 25px;

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

const WithdrawalBtn = styled.button`
  height: 45px;
  margin: 30px 30px 15px 30px;
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

const MyInfoFixModal = ({ accessToken, userinfoModalHandler, userInfo, setAccessToken, setIsLogin, issueTokens }) => {
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [withdrawalOpen, setWithdrawalOpen] = useState(false);

  const navigate = useNavigate();
  const Swal = require('sweetalert2');

  const {
    register,
    formState: { errors, isValid },
    watch,
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    setPasswordCheck(watch('verifyPassword') === watch('password'));
  }, [watch('verifyPassword'), watch('password')]);

  const MyinfoFixHandler = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/userinfo`,
        { nickname: watch().nickname, password: watch().password },
        {
          headers: { authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      )
      .then((res) => {
        userinfoModalHandler();
        setAccessToken('');
        axios
          .get(`${process.env.REACT_APP_API_URL}/user-logout`, { withCredentials: true })
          .then((res) => {
            setIsLogin(false);
            navigate('/');
          })
          .catch((err) => {
            console.log(err);
          });
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '???????????? ????????? ?????? ???????????????.',
          text: '?????? ???????????? ?????????!',
          confirmButtonText: '??????',
          confirmButtonColor: '#FF6E01',
          timer: 2000,
        });
      })
      .catch((err) => {
        issueTokens();
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '????????? ????????? ?????? ????????? ?????????',
          confirmButtonText: '??????',
          confirmButtonColor: '#FF6E01',
          timer: 2000,
        });
      });
  };

  const withdrawalModalHandler = () => {
    setWithdrawalOpen(!withdrawalOpen);
  };

  const enterKey = (e) => {
    if (isValid && e.key === 'Enter') return MyinfoFixHandler();
  };

  return (
    <MyInfoFixModalContainer>
      <MyInfoFixModalBackdrop>
        <MyInfoFixModalWindow>
          <CloseBtn className="fas fa-times" onClick={userinfoModalHandler} />
          <IdPasswordContainer>
            <Title>???????????? ??????</Title>
            <MyinfoInputContainer>
              <NicknameText>
                ?????????
                <NicknameInput
                  name="nickname"
                  onKeyPress={enterKey}
                  placeholder={'Nickname'}
                  {...register('nickname', {
                    required: true,
                    minLength: 2,
                  })}
                  onInvalid={(e) => {
                    e.target.setCustomValidity('???????????? 2?????? ??????????????? ?????????.');
                  }}
                  onInput={(e) => {
                    e.target.setCustomValidity('');
                  }}
                />
              </NicknameText>
              {errors.nickname ? (
                <Validation_Check>???????????? 2?????? ??????????????? ?????????.</Validation_Check>
              ) : (
                <Validation_Check />
              )}
              <EmailContainer>
                <EmailText>?????????</EmailText>
                <EmailUser>{userInfo.userInfo.email}</EmailUser>
              </EmailContainer>
              <IdContainer>
                <IdText>?????????</IdText>
                <IdUser>{userInfo.userInfo.userId}</IdUser>
              </IdContainer>
              <PwText>
                ????????????
                <PwInput
                  name="password"
                  onKeyPress={enterKey}
                  placeholder={'Password'}
                  {...register('password', {
                    pattern: /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/,
                    required: true,
                    minLength: 8,
                  })}
                  onInvalid={(e) => {
                    e.target.setCustomValidity('??????????????? 8?????? ??????, ??????, ?????? ??????????????? ?????????.');
                  }}
                  onInput={(e) => {
                    e.target.setCustomValidity('');
                  }}
                />
              </PwText>
              {errors.password ? (
                <Validation_Check>??????????????? 8?????? ??????, ??????, ?????? ??????????????? ?????????.</Validation_Check>
              ) : (
                <Validation_Check />
              )}
              <PwCheckText>
                ???????????? ??????
                <PwCheckInput
                  name="verifyPassword"
                  onKeyPress={enterKey}
                  placeholder={'Verify Password'}
                  {...register('verifyPassword', { required: true })}
                  onInvalid={(e) => {
                    e.target.setCustomValidity('??????????????? ???????????? ????????????.');
                  }}
                  onInput={(e) => {
                    e.target.setCustomValidity('');
                  }}
                />
              </PwCheckText>
              {!passwordCheck ? (
                <Validation_Check>??????????????? ???????????? ????????????.</Validation_Check>
              ) : (
                <Validation_Check />
              )}
              {!isValid || !passwordCheck ? (
                <MyInfoFixSubmitBtn disabled={true} onClick={MyinfoFixHandler}>
                  ??????
                </MyInfoFixSubmitBtn>
              ) : (
                <MyInfoFixSubmitBtn disabled={false} onClick={MyinfoFixHandler}>
                  ??????
                </MyInfoFixSubmitBtn>
              )}
              <WithdrawalBtn onClick={withdrawalModalHandler}>????????????</WithdrawalBtn>
              {withdrawalOpen ? (
                <WithdrawalModal
                  issueTokens={issueTokens}
                  accessToken={accessToken}
                  setIsLogin={setIsLogin}
                  withdrawalModalHandler={withdrawalModalHandler}
                />
              ) : null}
            </MyinfoInputContainer>
          </IdPasswordContainer>
        </MyInfoFixModalWindow>
      </MyInfoFixModalBackdrop>
    </MyInfoFixModalContainer>
  );
};

export default MyInfoFixModal;
