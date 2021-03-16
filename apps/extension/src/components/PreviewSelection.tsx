import { PreviewSelectionCard } from './PreviewSelectionCard';

import { TrackerContext } from '../context';

import React, { FC, useContext } from 'react';
import styled from 'styled-components';

const PreviewSelectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const PreviewSelection: FC = () => {
  const { selectors, removeSelector } = useContext(TrackerContext);

  console.log(selectors);

  const handleDelete = (id: string) => {
    removeSelector(id);
  };

  return (
    <PreviewSelectionWrapper>
      {selectors.length === 0
        ? null
        : selectors.map(({ id, preview }) => (
            <div style={{ marginBottom: 20 }} key={id}>
              <PreviewSelectionCard
                id={id}
                preview={preview}
                onDelete={handleDelete}
              />
            </div>
          ))}
    </PreviewSelectionWrapper>
  );
};
