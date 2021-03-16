import { PrevNextButtons } from './PrevNextButtons';
import { StepContent } from './StepContent';
import { PreviewSelection } from './PreviewSelection';
import { PreviewFrequency } from './PreviewFrequency';
import { PreviewNotifyMethods } from './PreviewNotifyMethods';

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
        <PreviewSelection />
        <PreviewFrequency />
        <PreviewNotifyMethods />
        <PrevNextButtons handlePrev={handlePrev} />
      </StepContent>
    </Step>
  );
};
