import React, { FC } from 'react';
import { IconType } from 'react-icons';
import { Heading, Space, Text } from 'fiber-ui';

type SectionProps = {
  icon: IconType;
  title: string;
  description: string;
  children: React.ReactNode;
};

const Section: FC<SectionProps> = ({
  icon: Icon,
  title,
  description,
  children,
}) => {
  return (
    <>
      <div style={{ marginTop: 20 }}>
        <Space size="sm">
          <Icon size={40} />
          <Heading size={2}>{title}</Heading>
        </Space>
      </div>
      <div style={{ marginBottom: 20 }}>
        <Text>{description}</Text>
      </div>
      {children}
    </>
  );
};

export { Section };
