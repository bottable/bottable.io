import { TextPreview } from './TextPreview';

import { TrackerContext } from '../context';

import React, { FC, useContext, useState } from 'react';
import { Collapse, Menu, Dropdown } from 'fiber-ui';
import { MdDelete, MdExpandMore, MdInfo } from 'react-icons/md';
import { Paragraph, Text } from 'fiber-ui';

type PreviewSelectionCardProps = {
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

export const PreviewSelectionCard: FC<PreviewSelectionCardProps> = ({
  id,
  preview,
  onDelete,
}) => {
  const { selectors, editSelector } = useContext(TrackerContext);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const { category, alertTrigger } = selectors.find((s) => s.id === id);

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
        header={
          <Text style={{ fontWeight: 600, fontSize: 14, color: '#4f4f4f' }}>
            {category}
          </Text>
        }
        extra={
          <MdDelete
            onClick={() => {
              onDelete(id);
            }}
            style={{ cursor: 'pointer' }}
          />
        }
        key="1"
      >
        <Paragraph style={{ fontSize: 12, margin: '8px 0' }}>
          Notify me when the selected value
          <MdInfo
            style={{
              color: 'black',
              width: 12,
              height: 12,
              verticalAlign: 'top',
              cursor: 'pointer',
            }}
            onClick={() => {
              setShowPreview((prevShowPreview) => !prevShowPreview);
            }}
          />
        </Paragraph>
        {showPreview ? <TextPreview>{preview}</TextPreview> : null}
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
