import { TextPreview } from './TextPreview';

import React, { FC, useState } from 'react';
import { Collapse, Menu, Dropdown } from 'fiber-ui';
import { MdDelete, MdExpandMore } from 'react-icons/md';
import { Paragraph, Text } from 'fiber-ui';

type AlertTrigger = 'has changed' | 'has increased' | 'has decreased';

type SelectionCardProps = {
  id: string;
  preview: string;
  onDelete: (id: string) => void;
};

export const SelectionCard: FC<SelectionCardProps> = ({ preview }) => {
  const [category, setCategory] = useState('Category');
  const [alertTrigger, setAlertTrigger] = useState<AlertTrigger>('has changed');

  const handleAlertTriggerSelect = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const value = event.target.value as AlertTrigger;
    setAlertTrigger(value);
  };

  const categoryMenu = (
    <Menu>
      <Menu.Item>Category 1</Menu.Item>
      <Menu.Item>Category 2</Menu.Item>
      <Menu.Item>Category 3</Menu.Item>
    </Menu>
  );

  const alertTriggerMenu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          setAlertTrigger('has changed');
        }}
      >
        has changed
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          setAlertTrigger('has increased');
        }}
      >
        has increased
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          setAlertTrigger('has decreased');
        }}
      >
        has decreased
      </Menu.Item>
    </Menu>
  );

  return (
    <Collapse style={{ width: 260, backgroundColor: '#fff' }}>
      <Collapse.Panel
        header={
          <Dropdown.Input
            overlay={categoryMenu}
            description={
              <Text style={{ fontSize: 12 }}>
                Select an option or create one
              </Text>
            }
            input={{
              value: category,
              onChange: (event: any) => setCategory(event.target.value),
              style: { width: '100%' },
            }}
            dropdownStyle={{ fontWeight: 400, top: 'auto' }}
            style={{ position: 'static' }}
          />
        }
        extra={<MdDelete />}
        key="1"
      >
        <Paragraph style={{ fontSize: 12, margin: '8px 0' }}>
          Notify me when the selected value
        </Paragraph>
        <TextPreview>{preview}</TextPreview>
        <Dropdown.Button
          onChange={handleAlertTriggerSelect}
          style={{ width: '100%', position: 'static', fontSize: 14 }}
          dropdownStyle={{ top: 'auto' }}
          overlay={alertTriggerMenu}
          button={{
            block: true,
            endIcon: <MdExpandMore />,
          }}
        >
          {alertTrigger}
        </Dropdown.Button>
      </Collapse.Panel>
    </Collapse>
  );
};
