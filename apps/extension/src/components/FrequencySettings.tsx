import { InputWrapper } from './InputWrapper';
import { StyledCard } from './StyledCard';

import React, { useState } from 'react';
import styled from 'styled-components';
import { Checkbox, Paragraph, Radio, Text, Slider } from 'fiber-ui';
import { MdInfo } from 'react-icons/md';

const FrequencySliderWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #e0e0e0;
  margin-top: 10px;
  padding: 0 15px;
  border-radius: 4px;
`;

const NotifyAnywayWrapper = styled.section`
  display: flex;
  align-items: center;
  margin-top: 10px;
  cursor: pointer;

  & p {
    font-size: 11px;
    user-select: none;
  }
`;

const frequencyModes = {
  hourly: {
    label: 'Hourly',
    shorthand: 'Hr',
    min: 1,
    max: 23,
  },
  daily: {
    label: 'Daily',
    shorthand: 'D',
    min: 1,
    max: 6,
  },
  weekly: {
    label: 'Weekly',
    shorthand: 'W',
    min: 1,
    max: 3,
  },
};

type FrequencyMode = 'hourly' | 'daily' | 'weekly';

export const FrequencySettings = () => {
  const [frequencyMode, setFrequencyMode] = useState<FrequencyMode>('hourly');
  const [frequency, setFrequency] = useState(1);
  const [notifyAnyways, setNotifyAnyways] = useState(false);

  const frequencyModeData = frequencyModes[frequencyMode];

  const handleFreqSlide = (newValue: number | number[]) => {
    setFrequency(newValue as number);
  };

  const handleNotifyCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotifyAnyways(event.target.checked);
  };

  return (
    <StyledCard>
      <InputWrapper>
        <Paragraph>
          Set Frequency
          <MdInfo
            style={{
              marginBottom: '5px',
              fontSize: 10,
            }}
          />
        </Paragraph>
        {/* @ts-ignore */}
        <Radio.Group
          defaultValue="hourly"
          onChange={(e: any) => {
            const freqMode = e.target.value.toLowerCase() as FrequencyMode;
            setFrequencyMode(freqMode);
            setFrequency(frequencyModes[freqMode].min);
          }}
          buttonStyle="solid"
        >
          {/* @ts-ignore */}
          <Radio.Button value="hourly">Hourly</Radio.Button>
          {/* @ts-ignore */}
          <Radio.Button value="daily">Daily</Radio.Button>
          {/* @ts-ignore */}
          <Radio.Button value="weekly">Weekly</Radio.Button>
        </Radio.Group>
      </InputWrapper>
      <FrequencySliderWrapper>
        <Slider
          value={frequency}
          onChange={handleFreqSlide}
          style={{ flex: 8, marginRight: 10 }}
          min={frequencyModeData.min}
          max={frequencyModeData.max}
        />
        <Text style={{ flex: 2, textAlign: 'right' }}>
          {frequency}
          {frequencyModeData.shorthand}
        </Text>
      </FrequencySliderWrapper>
      <NotifyAnywayWrapper>
        <Checkbox
          style={{ fontSize: 12 }}
          checked={notifyAnyways}
          onChange={handleNotifyCheck}
        >
          Notify me even if the condition isn&#x27;t met
        </Checkbox>
      </NotifyAnywayWrapper>
    </StyledCard>
  );
};
