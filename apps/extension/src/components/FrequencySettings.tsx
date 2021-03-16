import { InputWrapper } from './InputWrapper';

import { TrackerContext } from '../context';

import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Checkbox, Paragraph, Radio, Text, Slider, Card } from 'fiber-ui';
import { MdInfo } from 'react-icons/md';

const FrequencySliderWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #e0e0e0;
  margin-top: 10px;
  padding: 5px 15px;
  border-radius: 4px;
  color: #000;
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
  const { notifyAnyway, setUpdateFrequency, setNotifyAnyway } = useContext(
    TrackerContext
  );

  const [frequencyMode, setFrequencyMode] = useState<FrequencyMode>('hourly');
  const [frequency, setFrequency] = useState(1);

  const frequencyModeData = frequencyModes[frequencyMode];

  const handleFreqSlide = (newValue: number) => {
    setFrequency(newValue);
    setUpdateFrequency(newValue, frequencyMode);
  };

  const handleNotifyCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotifyAnyway(event.target.checked);
  };

  return (
    <Card width={260} bordered={false}>
      <InputWrapper>
        <Paragraph>
          Set Frequency
          <MdInfo
            style={{
              marginBottom: '5px',
              fontSize: 10,
              color: '#000',
            }}
          />
        </Paragraph>
        <Radio.Group
          defaultValue="hourly"
          onChange={(e: any) => {
            const freqMode = e.target.value.toLowerCase() as FrequencyMode;
            const newFreq = frequencyModes[freqMode].min;
            setFrequencyMode(freqMode);
            setFrequency(newFreq);
            setUpdateFrequency(newFreq, freqMode);
          }}
          buttonStyle="solid"
        >
          <Radio.Button value="hourly" style={{ width: 76 }}>
            Hourly
          </Radio.Button>
          <Radio.Button value="daily" style={{ width: 76 }}>
            Daily
          </Radio.Button>
          <Radio.Button value="weekly" style={{ width: 76 }}>
            Weekly
          </Radio.Button>
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
          style={{ fontSize: 11 }}
          checked={notifyAnyway}
          onChange={handleNotifyCheck}
        >
          Notify me even if the condition isn&#x27;t met
        </Checkbox>
      </NotifyAnywayWrapper>
    </Card>
  );
};
