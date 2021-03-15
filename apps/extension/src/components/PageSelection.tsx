import { SelectionCard } from './SelectionCard';
import { EmptyBox } from './EmptyBox';

import { useOuterApp } from '../utils/useOuterApp';

import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Paragraph } from 'fiber-ui';

const PageSelectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const EmptySelectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 16px;
`;

const EmptyBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  place-items: center;
`;

type Selection = {
  id: string;
  preview: string;
  path: string;
};

export const PageSelection: FC = () => {
  const { setSelectorListener } = useOuterApp();
  const [selections, setSelections] = useState<Selection[]>([]);

  useEffect(() => {
    setSelectorListener({
      select: (e, path) => {
        console.log(e, path);
        setSelections([
          ...selections,
          {
            id: selections.length + '123',
            preview: e.innerText,
            path,
          },
        ]);
      },
    });
  }, [setSelectorListener, selections, setSelections]);

  const handleDelete = (id: string) => {
    setSelections((prevSelections) => {
      const newSelections = prevSelections.filter((s) => s.id !== id);
      return newSelections;
    });
  };

  return (
    <PageSelectionWrapper>
      {selections.length === 0 ? (
        <EmptySelectionWrapper>
          <EmptyBoxWrapper>
            <EmptyBox />
            <Paragraph
              style={{
                fontSize: 12,
                color: '#a8a8a8',
                margin: 5,
              }}
            >
              No Selectors
            </Paragraph>
          </EmptyBoxWrapper>
          <Paragraph
            style={{
              color: '#333',
              textAlign: 'center',
              fontSize: 12,
            }}
          >
            Click anything on the page to track!
          </Paragraph>
        </EmptySelectionWrapper>
      ) : (
        selections.map(({ id, preview }, idx) => (
          <div
            style={{ margin: idx !== selections.length - 1 ? 20 : 0 }}
            key={id}
          >
            <SelectionCard id={id} preview={preview} onDelete={handleDelete} />
          </div>
        ))
      )}
    </PageSelectionWrapper>
  );
};
