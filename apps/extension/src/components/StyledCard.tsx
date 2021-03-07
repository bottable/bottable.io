import React, { FC } from 'react';
import { Card } from 'fiber-ui';
import styled from 'styled-components';

type StyledCardProps = {
  isFocused?: boolean;
};

const StyledCardSkeleton = styled(Card)`
  margin: 0.5em 0;
  width: 260px;
`;

export const StyledCard: FC<StyledCardProps> = ({
  isFocused,
  children,
  ...props
}) => (
  <StyledCardSkeleton
    {...props}
    style={{
      boxShadow: isFocused ? '0px 10px 15px rgba(0, 0, 0, 0.2)' : 'none',
    }}
  >
    {children}
  </StyledCardSkeleton>
);

StyledCard.displayName = 'StyledCard';
