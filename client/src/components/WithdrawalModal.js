import React, { useState, useEffect } from 'react';
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
  padding: 10px;
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

const WithdrawalModal = ({ accessToken, withdrawalModalHandler, setIsLogin }) => {
  const [check, setCheck] = useState(false);
  const [inputCheck, setInputCheck] = useState('');

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
        alert('탈퇴되었습니다. 그동안 감사했습니다. 더 좋은 서비스로 다시 찾아 뵙겠습니다.');
        setIsLogin(false);
        navigate('/');
      })
      .catch((err) => {
        alert('잘못된 요청입니다');
      });
  };

  return (
    <WithdrawalModalContainer>
      <WithdrawalModalBackdrop>
        <WithdrawalContainer>
          <CloseBtn className="fas fa-times" onClick={withdrawalModalHandler} />
          <WithdrawalTitleBox>
            <WithdrawalTitle>탈퇴안내</WithdrawalTitle>
          </WithdrawalTitleBox>
          <WithdrawalWarning>
            <p>회원탈퇴를 신청하기 전에 안내사항을 꼭 확인해주세요.</p>
            <br />
            <p>사용하고 계신 아이디는 탈퇴할 경우 재사용 및 복구가 불가능합니다.</p>
            <br />
            <p>탈퇴한 아이디는 본인과 타인 모두 재사용 및 복구가 불가하오니</p>
            <br />
            <p>신중하게 선택하시기 바랍니다.</p>
            <br />
            <p>탈퇴 후에는 가입되어있으신 아이디로 다시 가입할 수 없으며</p>
            <br />
            <p>아이디와 데이터는 복구할 수 없습니다.</p>
            <br />
            <p>게시판형 서비스에 남아있는 게시글은 탈퇴 후 삭제할 수 없습니다.</p>
          </WithdrawalWarning>
          <CheckboxContainer>
            <Checkbox onClick={checkHandler} />
            <ConsentTitle>안내 사항을 모두 확인하였으며, 이에 동의합니다.</ConsentTitle>
          </CheckboxContainer>
          <WithdrawalInputContainer>
            <WithdrawalComment>"탈퇴합니다"를 정확히 입력해주세요</WithdrawalComment>
            <WithdrawalInput onChange={inputCheckHandler} />
          </WithdrawalInputContainer>
          <WithdrawalBtnContainer>
            {check && inputCheck === '탈퇴합니다' ? (
              <WithdrawalBtn disabled={false} onClick={withdrawalBtnHandler}>
                탈퇴
              </WithdrawalBtn>
            ) : (
              <WithdrawalBtn disabled={true} onClick={withdrawalBtnHandler}>
                탈퇴
              </WithdrawalBtn>
            )}
            <BackBtn onClick={withdrawalModalHandler}>취소(뒤로가기)</BackBtn>
          </WithdrawalBtnContainer>
        </WithdrawalContainer>
      </WithdrawalModalBackdrop>
    </WithdrawalModalContainer>
  );
};

export default WithdrawalModal;
