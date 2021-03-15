import { TextPreview } from './TextPreview';
import { CategoryInput } from './CategoryInput';

import { TrackerContext } from '../context';

import React, { FC, useContext } from 'react';
import { Collapse, Menu, Dropdown } from 'fiber-ui';
import { MdDelete, MdExpandMore } from 'react-icons/md';
import { Paragraph } from 'fiber-ui';

type SelectionCardProps = {
  id: string;
  preview: string;
  onDelete: (id: string) => void;
};

const alertTriggerDict = {
  CHANGE: 'has changed',
  INCREASE: 'has increased',
  DECREASE: 'has decreased',
  GREATER_THAN: 'greater than',
  LESS_THAN: 'less than',
  CONTAIN: 'contains',
};

export const SelectionCard: FC<SelectionCardProps> = ({
  id,
  preview,
  onDelete,
}) => {
  const { selectors, editSelector } = useContext(TrackerContext);

  const { category, alertTrigger } = selectors.find((s) => s.id === id);

  const setCategory = (category: string) => {
    editSelector(id, { category });
  };

  const alertTriggerMenu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          editSelector(id, { alertTrigger: { type: 'CHANGE' } });
        }}
      >
        has changed
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          editSelector(id, { alertTrigger: { type: 'INCREASE' } });
        }}
      >
        has increased
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          editSelector(id, { alertTrigger: { type: 'DECREASE' } });
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
          style={{ width: '100%', position: 'static', fontSize: 14 }}
          dropdownStyle={{ top: 'auto' }}
          overlay={alertTriggerMenu}
          button={{
            block: true,
            endIcon: <MdExpandMore />,
          }}
        >
          {alertTriggerDict[alertTrigger.type]}
        </Dropdown.Button>
      </Collapse.Panel>
    </Collapse>
  );
};
