import React, { FC, ReactText, useState } from 'react';
import styled from 'styled-components';
import { Text } from 'fiber-ui';

const SelectionPreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: #eeeeee;
  border-radius: 4px;
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 8px;

  & p {
    font-size: 12px;
    line-height: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    /* -webkit-line-clamp: 3; number of lines to show */
    -webkit-box-orient: vertical;
  }
`;

type TextPreviewProps = {
  children: ReactText;
};

export const TextPreview: FC<TextPreviewProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <SelectionPreviewWrapper>
      <Text
        style={{
          WebkitLineClamp: isExpanded ? 'unset' : 3,
        }}
        onClick={() => {
          setIsExpanded(!isExpanded);
          console.log('damn');
        }}
      >
        {children}
      </Text>
    </SelectionPreviewWrapper>
  );
};
