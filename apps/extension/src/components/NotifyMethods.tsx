import { NotifyMethodsList } from './NotifyMethodsList';

import { TrackerContext, NotificationMethods } from '../context';

import React, { useContext } from 'react';
import { Menu, Dropdown, Paragraph, Card } from 'fiber-ui';
import { MdExpandMore } from 'react-icons/md';

export const NotifyMethods = () => {
  const { notificationMethods, setNotificationMethods } = useContext(
    TrackerContext
  );

  const handleNotifSelect = (value: NotificationMethods) => {
    if (!notificationMethods.includes(value))
      setNotificationMethods([...notificationMethods, value]);
  };

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          handleNotifSelect('AUDIO');
        }}
      >
        Audio Notification
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          handleNotifSelect('POPUP');
        }}
      >
        Popup Notification
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          handleNotifSelect('EMAIL');
        }}
      >
        User Email
      </Menu.Item>
    </Menu>
  );

  return (
    <Card width={260} bordered={false} style={{ marginBottom: 16 }}>
      <div style={{ marginBottom: 8 }}>
        <Paragraph style={{ fontSize: 12, color: '#6B6B6B' }}>
          Notify me through
        </Paragraph>
      </div>
      <Dropdown.Button
        style={{
          width: '100%',
          position: 'static',
          fontSize: 14,
          marginBottom: 5,
        }}
        dropdownStyle={{ top: 'auto' }}
        overlay={menu}
        button={{
          block: true,
          endIcon: <MdExpandMore />,
        }}
      >
        Add Action
      </Dropdown.Button>
      <NotifyMethodsList />
    </Card>
  );
};
