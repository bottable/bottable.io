import { TopNav } from '../../../components';

import React from 'react';
import styled from 'styled-components';

const HomeWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: #fff;
`;

export const Home = () => {
  return (
    <HomeWrapper>
      <TopNav />
    </HomeWrapper>
  );
};
