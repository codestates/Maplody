import React from 'react';
import styled from 'styled-components';

const SearchInputContainer = styled.span`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 300px;
  border: 3px solid;
  border-radius: 15px;
  padding-left: 15px;
  padding-bottom: 3px;
`;

const SearchIcon = styled.i`
  padding: 10px;
`;

const SearchInputText = styled.input`
  width: 210px;
  padding: 5px;
  text-align: center;
  border-top: none;
  border-left: none;
  border-right: none;
  padding-top: 5px;

  &:focus {
    outline: none;
    border-bottom: 2px solid #dd4a68;
  }
`;

const SearchInput = () => {
  return (
    <SearchInputContainer>
      <SearchInputText placeholder="찾고 싶은 음악을 검색하세요" />
      <SearchIcon className="fas fa-search fa-lg" />
    </SearchInputContainer>
  );
};

export default SearchInput;
