import React from 'react';
import styled from 'styled-components';

const StratButton = styled.button`
  height: 50px;
  width: 300px;
  border: solid 3px;
  border-radius: 15px;
  background-color: white;
  box-shadow: #c85a4d 4px 4px 4px;
  cursor: pointer;
  text-align-last: center;
  min-width: 200px;
  transition: 300ms ease all;
  font-size: 25px;
  margin-left: 140px;

  &:hover {
    box-shadow: #c85a4d 4px 4px 4px;
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

const Button = ({ text, onClick }) => {
  return <StratButton onClick={onClick}>{text}</StratButton>;
};

export default Button;
