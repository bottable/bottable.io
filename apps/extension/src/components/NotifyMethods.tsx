import React, { useState } from 'react';
import { Menu, Dropdown, Button, Paragraph, Card } from 'fiber-ui';
import { MdClear, MdExpandMore } from 'react-icons/md';
import styled from 'styled-components';

const NotifMethodsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const NotifMethodWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & span {
    color: #333;
  }
`;

const NotifMethodText = styled(Paragraph)`
  flex: 1;
  font-size: 12px;
  text-align: left;
  margin-bottom: 0px;
`;

export const NotifyMethods = () => {
  const [notifMethods, setNotifMethods] = useState<string[]>([]);

  const handleNotifSelect = (value: string) => {
    if (!notifMethods.includes(value))
      setNotifMethods([...notifMethods, value]);
  };

  const handleDelete = (index: number) => {
    const tempNotifMethods = [...notifMethods];
    tempNotifMethods.splice(index, 1);
    setNotifMethods(tempNotifMethods);
  };

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          handleNotifSelect('Audio Notification');
        }}
      >
        Audio Notification
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          handleNotifSelect('Popup Notification');
        }}
      >
        Popup Notification
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          handleNotifSelect('User Email');
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
      <NotifMethodsWrapper>
        {notifMethods.map((method, i) => (
          <NotifMethodWrapper key={method + i}>
            <Button
              onClick={() => handleDelete(i)}
              shape="circle"
              type="text"
              icon={<MdClear />}
              style={{ marginRight: 10 }}
            />
            <NotifMethodText>{method}</NotifMethodText>
          </NotifMethodWrapper>
        ))}
      </NotifMethodsWrapper>
    </Card>
  );
};
