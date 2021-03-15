import { PreviewSelectionCard } from './PreviewSelectionCard';

import React, { FC, useState } from 'react';
import styled from 'styled-components';

const PreviewSelectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

type Selection = {
  id: string;
  preview: string;
  path: string;
};

export const PreviewSelection: FC = () => {
  const [selections, setSelections] = useState<Selection[]>([]);

  const handleDelete = (id: string) => {
    setSelections((prevSelections) => {
      const newSelections = prevSelections.filter((s) => s.id !== id);
      return newSelections;
    });
  };

  return (
    <PreviewSelectionWrapper>
      {selections.length === 0
        ? null
        : selections.map(({ id, preview }, idx) => (
            <div
              style={{ margin: idx !== selections.length - 1 ? 20 : 0 }}
              key={id}
            >
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
