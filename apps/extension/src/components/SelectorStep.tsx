import { PageSelection } from './PageSelection';
import { PrevNextButtons } from './PrevNextButtons';
import { StepContent } from './StepContent';

import React, { FC } from 'react';
import { Steps } from 'fiber-ui';

const { Step } = Steps;

type SelectorProps = {
  handlePrev: () => void;
  handleNext: () => void;
};

export const SelectorStep: FC<SelectorProps> = ({
  handlePrev,
  handleNext,
  ...props
}) => {
  return (
    <Step {...props} title="Select Part of Page">
      <StepContent>
        <PageSelection />
        <PrevNextButtons handlePrev={handlePrev} handleNext={handleNext} />
      </StepContent>
    </Step>
  );
};
