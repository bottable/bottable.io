import { PrevNextButtons } from './PrevNextButtons';
import { StepContent } from './StepContent';

import React, { FC } from 'react';
import { Steps } from 'fiber-ui';

const { Step } = Steps;

type PreviewSaveProps = {
  handlePrev: () => void;
};

export const PreviewSaveStep: FC<PreviewSaveProps> = ({
  handlePrev,
  ...props
}) => {
  return (
    <Step {...props} title="Preview and Save">
      <StepContent>
        <p>TO BE DONE</p>
        <PrevNextButtons handlePrev={handlePrev} />
      </StepContent>
    </Step>
  );
};
