import { NotifyMethods } from './NotifyMethods';
import { FrequencySettings } from './FrequencySettings';
import { PrevNextButtons } from './PrevNextButtons';
import { StepContent } from './StepContent';

import React, { FC } from 'react';
import { Steps } from 'fiber-ui';

const { Step } = Steps;

type FinishProps = {
  handlePrev: () => void;
  handleNext: () => void;
};

export const FinishStep: FC<FinishProps> = ({
  handlePrev,
  handleNext,
  ...props
}) => {
  return (
    <Step {...props} title="Finish Settings">
      <StepContent>
        <NotifyMethods />
        <FrequencySettings />
        <PrevNextButtons handlePrev={handlePrev} handleNext={handleNext} />
      </StepContent>
    </Step>
  );
};
