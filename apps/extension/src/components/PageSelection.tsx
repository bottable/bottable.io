import { SelectionCard } from './SelectionCard';
import { EmptyBox } from './EmptyBox';

import { useOuterApp } from '../utils/useOuterApp';
import { TrackerContext } from '../context';

import React, { FC, useEffect, useContext } from 'react';
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

export const PageSelection: FC = () => {
  const { setSelectorListener } = useOuterApp();

  const { selectors, addSelector, removeSelector } = useContext(TrackerContext);

  useEffect(() => {
    setSelectorListener({
      select: (e, path) => {
        addSelector({
          id: selectors.length + '123',
          preview: e.innerText,
          location: path,
          values: [{ timestamp: new Date(), value: e.innerText }],
          category: 'Category',
          alertTrigger: { type: 'CHANGE' },
        });
      },
    });
  }, [setSelectorListener, selectors, addSelector]);

  const handleDelete = (id: string) => {
    removeSelector(id);
  };

  return (
    <PageSelectionWrapper>
      {selectors.length === 0 ? (
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
        selectors.map(({ id, preview }, idx) => (
          <div
            style={{ marginBottom: idx !== selectors.length - 1 ? 20 : 0 }}
            key={id}
          >
            <SelectionCard id={id} preview={preview} onDelete={handleDelete} />
          </div>
        ))
      )}
    </PageSelectionWrapper>
  );
};
