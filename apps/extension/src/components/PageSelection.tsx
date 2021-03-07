import { SelectionCard } from './SelectionCard';
import { EmptyBox } from './EmptyBox';

import { useOuterApp } from '../utils/useOuterApp';

import React, { FC, useCallback, useEffect, useState } from 'react';
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
  padding-top: 16px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const EmptyBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;
  padding-top: 20px;
  padding-top: 10px;
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

  const handleDelete = useCallback(
    (id) => {
      const index = selections.findIndex((s) => (s.id = id));
      setSelections([...selections].splice(index, 1));
    },
    [selections, setSelections]
  );

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
              color: '#333333',
              textAlign: 'center',
              fontSize: 12,
            }}
          >
            Click anything on the page to track!
          </Paragraph>
        </EmptySelectionWrapper>
      ) : (
        selections.map(({ id, preview }) => (
          <SelectionCard
            id={id}
            key={id}
            preview={preview}
            onDelete={handleDelete}
          />
        ))
      )}
    </PageSelectionWrapper>
  );
};
