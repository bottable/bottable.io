import React, { FC } from 'react';
import { Card, Tag } from 'fiber-ui';

type PinnedProps = {
  data: { title: string; tags: string[] }[];
};

const Pinned: FC<PinnedProps> = ({ data }) => {
  const cardsNode = data.map(({ title, tags }, idx) => {
    const tagsNode = tags.map((tag, idx) => (
      <Tag key={idx} style={{ marginBottom: '7px', marginTop: '7px' }}>
        {tag}
      </Tag>
    ));

    return (
      <Card
        key={idx}
        width={350}
        style={{
          margin: '12px 16px 12px 0px',
          boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.2)',
        }}
        title={title}
        bordered={false}
      >
        {tagsNode}
      </Card>
    );
  });

  return (
    <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap' }}>
      {cardsNode}
    </div>
  );
};

export { Pinned };
