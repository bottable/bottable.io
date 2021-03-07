import React, { FC } from 'react';
import { Button } from 'fiber-ui';
import styled from 'styled-components';

const ButtonsWrapper = styled.div`
  margin-top: 1em;
`;

type PrevNextButtonsProps = {
  handlePrev?: () => void;
  handleNext?: () => void;
};

export const PrevNextButtons: FC<PrevNextButtonsProps> = ({
  handlePrev,
  handleNext,
}) => {
  return (
    <ButtonsWrapper>
      {handlePrev && (
        <Button onClick={handlePrev} style={{ marginRight: '1em' }}>
          Previous
        </Button>
      )}
      {handleNext && (
        <Button type="primary" color="primary" onClick={handleNext}>
          Next
        </Button>
      )}
    </ButtonsWrapper>
  );
};
