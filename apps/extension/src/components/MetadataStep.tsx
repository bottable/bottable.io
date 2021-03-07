import { InputWrapper } from './InputWrapper';
import { PrevNextButtons } from './PrevNextButtons';
import { StepContent } from './StepContent';

import { getChromeValues, setChromeValue } from '../utils';
import * as config from '../config';

import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Steps, Input, Paragraph } from 'fiber-ui';

const { Step } = Steps;

type MetadataProps = {
  handleNext: () => void;
};

export const MetadataStep: FC<MetadataProps> = ({ handleNext, ...props }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    const syncChrome = async () => {
      const { name, tags } = config.CHROME.keys;
      const storage = await getChromeValues([name, tags]);
      // const { [name]: n, [tags]: t } = storage
      const { [name]: n } = storage;
      setName(n || '');
    };

    syncChrome();
  }, []);

  const handleNameChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newName = e.target.value;
    setName(newName);

    setChromeValue({ [config.CHROME.keys.name]: newName }, function () {
      console.log('Value is set to ' + newName);
    });
  };

  return (
    <Step {...props} title="Set Up Tracker">
      <StepContent>
        <InputWrapper>
          <Paragraph>Project Name</Paragraph>
          <Input
            placeholder="Enter Project Name"
            onChange={handleNameChange}
            value={name}
            bordered={false}
          />
        </InputWrapper>
        <InputWrapper>
          <Paragraph>Tags</Paragraph>
          <Input.Tag
            placeholder="Add Tags"
            onChange={(values: any) => {
              console.log(values);
            }}
            bordered={false}
          />
        </InputWrapper>
        <PrevNextButtons handleNext={handleNext} />
      </StepContent>
    </Step>
  );
};
