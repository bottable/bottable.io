import {
  TopNav,
  MetadataStep,
  SelectorStep,
  FinishStep,
  PreviewSaveStep,
} from '../../../components';
import { TrackerContextProvider } from '../../../context';

import React from 'react';
import styled from 'styled-components';
import { Steps } from 'fiber-ui';
import { useCounter } from 'react-use';

const CreateTrackerWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: #f2f2f2;
  overflow-x: hidden;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ContentWrapper = styled.div`
  z-index: 10000;
  padding: 20px;
`;

export const CreateTracker = () => {
  const [activeStep, { inc, dec, set }] = useCounter(0, 3, 0);

  const handlePrev = () => dec(1);

  const handleNext = () => inc(1);

  const onChange = (newCurrent: number) => {
    set(newCurrent);
  };

  return (
    <CreateTrackerWrapper>
      <TopNav onSelectorClick={() => set(1)} />
      <ContentWrapper>
        <TrackerContextProvider>
          <Steps current={activeStep} vertical onChange={onChange}>
            <MetadataStep handleNext={handleNext} />
            <SelectorStep handlePrev={handlePrev} handleNext={handleNext} />
            <FinishStep handlePrev={handlePrev} handleNext={handleNext} />
            <PreviewSaveStep handlePrev={handlePrev} />
          </Steps>
        </TrackerContextProvider>
      </ContentWrapper>
    </CreateTrackerWrapper>
  );
};
