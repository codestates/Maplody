import React from 'react';
import styled from 'styled-components';

const SearchInputContainer = styled.span`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 300px;
  height: fit-content;
  border: 3px solid;
  border-radius: 15px;
  padding-left: 15px;
  padding-bottom: 5px;
`;

const SearchIcon = styled.i`
  padding: 5px;
  margin-top: 10px;
  transition: 300ms ease all;

  &:hover {
    color: #dd4a68;
    cursor: pointer;
  }
`;

const SearchInputText = styled.input`
  width: 200px;
  padding: 5px;
  text-align: left;
  border-top: none;
  border-left: none;
  border-right: none;
  padding-top: 10px;
  padding-left: 15px;

  &:focus {
    outline: none;
    border-bottom: 2px solid #dd4a68;
  }
`;

const SearchInput = () => {
  return (
    <SearchInputContainer>
      <SearchInputText placeholder="찾고 싶은 음악을 검색하세요." />
      <SearchIcon className="fas fa-search fa-lg" />
    </SearchInputContainer>
  );
};

export default SearchInput;
