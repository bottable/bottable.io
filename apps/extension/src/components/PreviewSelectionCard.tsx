import { TextPreview } from './TextPreview';
import { CategoryInput } from './CategoryInput';

import React, { FC, useState } from 'react';
import { Collapse, Menu, Dropdown } from 'fiber-ui';
import { MdDelete, MdExpandMore } from 'react-icons/md';
import { Paragraph } from 'fiber-ui';

type AlertTrigger = 'has changed' | 'has increased' | 'has decreased';

type PreviewSelectionCardProps = {
  id: string;
  preview: string;
  onDelete: (id: string) => void;
};

export const PreviewSelectionCard: FC<PreviewSelectionCardProps> = ({
  id,
  preview,
  onDelete,
}) => {
  const [category, setCategory] = useState<string>('Category');
  const [alertTrigger, setAlertTrigger] = useState<AlertTrigger>('has changed');

  const handleAlertTriggerSelect = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const value = event.target.value as AlertTrigger;
    setAlertTrigger(value);
  };

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
        header={<CategoryInput category={category} setCategory={setCategory} />}
        extra={
          <MdDelete
            onClick={() => {
              onDelete(id);
            }}
            style={{ cursor: 'pointer' }}
          />
        }
        key="1"
        headerStyle={{ position: 'static' }}
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
