import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const slideIn = keyframes`
    from {
      right: -435px;
    }
    to {
      right: 0;
    }
`;
const WithdrawalModalContainer = styled.div`
  height: 13.5rem;
`;
const WithdrawalModalBackdrop = styled.div`
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
const CloseBtn = styled.span`
  border-radius: 15px;
  font-size: 28px;
  cursor: pointer;
  margin: 10px -60px 10px 370px;
`;
const WithdrawalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px 0 0 20px;
  height: 100%;
  width: 500px;
  margin-right: 0;
  margin-left: auto;
  background-color: white;
`;
const WithdrawalTitleBox = styled.div`
  width: 100%;
  height: 100px;
  margin: 40px 20px 20px 80px;
  font-size: 30px;
`;
const WithdrawalTitle = styled.div``;
const WithdrawalWarning = styled.div`
  font-size: 18px;
`;
const CheckboxContainer = styled.div`
  width: 100%;
  height: 40px;
  margin-top: 60px;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })``;

const ConsentTitle = styled.div`
  font-size: 20px;
  margin-left: 10px;
  color: #ff0066;
`;
const WithdrawalInputContainer = styled.div`
  margin: 30px;
`;
const WithdrawalComment = styled.div`
  font-size: 20px;
  margin-bottom: 15px;
`;
const WithdrawalInput = styled.input.attrs({ type: 'text' })`
  font-size: 20px;
  width: 100%;
  height: 50px;
  padding: 10px;
  border: solid 3px;
  border-radius: 5px;
  transition: 100ms ease all;

  &:focus {
    outline: 3px solid #ff0066;
    border: hidden;
  }
`;
const WithdrawalBtnContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
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
const BackBtn = styled.button`
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

const WithdrawalModal = ({ accessToken, withdrawalModalHandler, setIsLogin, issueTokens }) => {
  const [check, setCheck] = useState(false);
  const [inputCheck, setInputCheck] = useState('');

  const Swal = require('sweetalert2');

  const checkHandler = () => {
    setCheck(!check);
  };

  const inputCheckHandler = (e) => {
    setInputCheck(e.target.value);
  };

  const navigate = useNavigate();

  const withdrawalBtnHandler = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/user-withdrawal`, {
        headers: { authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then((res) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '??????????????? ?????? ???????????????',
          text: '???????????????!',
          confirmButtonText: '??????',
          confirmButtonColor: '#FF6E01',
          timer: 2000,
        });
        setIsLogin(false);
        navigate('/');
      })
      .catch((err) => {
        issueTokens();
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: '??? ?????? ???????????????.',
          confirmButtonText: '??????',
          confirmButtonColor: '#FF6E01',
          timer: 2000,
        });
      });
  };

  return (
    <WithdrawalModalContainer>
      <WithdrawalModalBackdrop>
        <WithdrawalContainer>
          <CloseBtn className="fas fa-times" onClick={withdrawalModalHandler} />
          <WithdrawalTitleBox>
            <WithdrawalTitle>????????????</WithdrawalTitle>
          </WithdrawalTitleBox>
          <WithdrawalWarning>
            <p>??????????????? ???????????? ?????? ??????????????? ??? ??????????????????.</p>
            <br />
            <p>??????????????? ???????????? ?????? ????????????, ?????? ?????? ??? ??? ????????????.</p>
            <br />
            <p>????????? ??????????????? ?????? ?????? ????????????</p>
            <br />
            <p>????????? ???????????? ????????? ?????? ????????? ?????? ??? ????????????.</p>
            <br />
            <p>????????? ????????? ????????? ???????????????.</p>
            <br />
          </WithdrawalWarning>
          <CheckboxContainer>
            <Checkbox onClick={checkHandler} />
            <ConsentTitle>?????? ????????? ?????? ??????????????????, ?????? ???????????????.</ConsentTitle>
          </CheckboxContainer>
          <WithdrawalInputContainer>
            <WithdrawalComment>"???????????????"??? ????????? ??????????????????</WithdrawalComment>
            <WithdrawalInput onChange={inputCheckHandler} />
          </WithdrawalInputContainer>
          <WithdrawalBtnContainer>
            {check && inputCheck === '???????????????' ? (
              <WithdrawalBtn disabled={false} onClick={withdrawalBtnHandler}>
                ??????
              </WithdrawalBtn>
            ) : (
              <WithdrawalBtn disabled={true} onClick={withdrawalBtnHandler}>
                ??????
              </WithdrawalBtn>
            )}
            <BackBtn onClick={withdrawalModalHandler}>??????(????????????)</BackBtn>
          </WithdrawalBtnContainer>
        </WithdrawalContainer>
      </WithdrawalModalBackdrop>
    </WithdrawalModalContainer>
  );
};

export default WithdrawalModal;
