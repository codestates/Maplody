import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SignoutContainer = styled.div`
  width: 600px;
  height: 650px;
  margin: 15px;
  padding: 20px;
  border: none;
  border-radius: 15px;
  box-shadow: 2px 2px 4px 4px gray;
  margin-bottom: 45px;
  background-color: white;
`;
const SignoutTitleBox = styled.div`
  width: 100%;
  height: 100px;
  font-size: 30px;
`;
const SignoutTitle = styled.div``;
const SignoutWarning = styled.div``;
const ConsentBox = styled.div`
  width: 100%;
  height: 40px;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ConsentTitle = styled.div`
  margin-left: 10px;
`;
const WithdrawalContainer = styled.div`
  width: 100%;
  height: 150px;
  margin-top: 20px;
`;
const WithdrawalComment = styled.div`
  font-size: 20px;
  margin-bottom: 15px;
`;
const WithdrawalInput = styled.input.attrs({ type: 'text' })`
  font-size: 20px;
  width: 80%;
`;
const WithdrawalBtnContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
const WithdrawalBtn = styled.div`
  font-size: 20px;
  border: 1px solid black;
  padding: 5px;
  width: 150px;
  height: 50px;
  color: black;
  cursor: pointer;
  margin-top: 25px;
  margin-left: 25px;
  text-align: center;
  &:hover {
    box-shadow: gray 3px 3px 3px;
  }
`;
const HomeBtn = styled.div`
  font-size: 20px;
  border: 1px solid black;
  padding: 5px;
  width: 150px;
  height: 50px;
  color: black;
  cursor: pointer;
  margin-top: 25px;
  margin-left: 25px;
  text-align: center;
  &:hover {
    box-shadow: gray 3px 3px 3px;
  }
`;

const WithdrawalModal = () => {
  const navigate = useNavigate();

  return (
    <SignoutContainer>
      <SignoutTitleBox>
        <SignoutTitle>탈퇴안내</SignoutTitle>
      </SignoutTitleBox>
      <SignoutWarning>
        <p>회원탈퇴를 신청하기 전에 안내사항을 꼭 확인해주세요.</p>
        <br />
        <p>사용하고 계신 아이디는 탈퇴할 경우 재사용 및 복구가 불가능합니다.</p>
        <br />
        <p>탈퇴한 아이디는 본인과 타인 모두 재사용 및 복구가 불가하오니 신중하게 선택하시기 바랍니다.</p>
        <br />
        <p>탈퇴 후에는 가입되어있으신 아이디로 다시 가입할 수 없으며 아이디와 데이터는 복구할 수 없습니다.</p>
        <br />
        <p>게시판형 서비스에 남아있는 게시글은 탈퇴 후 삭제할 수 없습니다.</p>
      </SignoutWarning>
      <ConsentBox>
        <input type="checkbox" />
        <ConsentTitle>안내 사항을 모두 확인하였으며, 이에 동의합니다.</ConsentTitle>
      </ConsentBox>
      <WithdrawalContainer>
        <WithdrawalComment>"탈퇴합니다"를 정확히 입력해주세요</WithdrawalComment>
        <WithdrawalInput />
        <WithdrawalBtnContainer>
          <WithdrawalBtn>탈퇴</WithdrawalBtn>
          <HomeBtn>취소(홈으로)</HomeBtn>
        </WithdrawalBtnContainer>
      </WithdrawalContainer>
    </SignoutContainer>
  );
};

export default WithdrawalModal;
