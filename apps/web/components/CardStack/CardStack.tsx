import { CardStackContainer } from './styles';

import React, { FC, useState } from 'react';
import { Card, Text } from 'fiber-ui';
import { FaLongArrowAltDown } from 'react-icons/fa';

type CardStackProps = {
  type: 'hot' | 'categories';
  data: { [key: string]: string | number }[];
};

const CardStack: FC<CardStackProps> = ({ type, data }) => {
  const [focus, setFocus] = useState<number>(0);

  let cardsNode: React.ReactNode;

  switch (type) {
    case 'hot':
      cardsNode = data.map(
        ({ trackerName, categoryName, prevValue, newValue }, idx) => (
          <Card
            bordered={false}
            width={350}
            style={{
              color: 'black',
              boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.2)',
              marginLeft: idx !== 0 ? -40 : 0,
              zIndex: idx === focus ? 10000 : idx,
              flex: '0 0 auto',
            }}
            onMouseEnter={() => {
              setFocus(idx);
            }}
          >
            <div>
              <Text strong>{trackerName}</Text>
            </div>
            <div style={{ marginBottom: 12 }}>
              <Text strong style={{ color: '#929292' }}>
                {categoryName}
              </Text>
            </div>
            <div
              style={{
                background: '#eee',
                textAlign: 'center',
                padding: '10px 0px',
              }}
            >
              <Text>{prevValue}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <FaLongArrowAltDown />
            </div>
            <div
              style={{
                background: '#eee',
                textAlign: 'center',
                padding: '10px 0px',
              }}
            >
              <Text strong>{newValue}</Text>
            </div>
          </Card>
        )
      );
  }

  return <CardStackContainer>{cardsNode}</CardStackContainer>;
};

export { CardStack };
