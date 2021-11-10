import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  position: fixed;
  text-align: right;
  font-size: 23px;
  top: 100;
  left: 0;
  bottom: 10px;
  right: 30px;
`;

const Footer = () => {
  return <FooterContainer>2021 @ SUDO_HIRED corp.</FooterContainer>;
};

export default Footer;
