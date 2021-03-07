import React, { useState } from 'react';
import { Menu, Dropdown, Collapse } from 'fiber-ui';
import { MdClear } from 'react-icons/md';
import styled from 'styled-components';
import { Button, Paragraph } from 'fiber-ui';

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
  margin-bottom: 0;
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
    <Collapse>
      <Collapse.Panel
        header={
          <Dropdown overlay={menu}>
            <Paragraph>Notify me through</Paragraph>
          </Dropdown>
        }
      >
        <NotifMethodsWrapper>
          {notifMethods.map((method, i) => (
            <NotifMethodWrapper key={method + i}>
              <Button
                onClick={() => handleDelete(i)}
                shape="circle"
                type="text"
                icon={<MdClear />}
              />
              <NotifMethodText>{method}</NotifMethodText>
            </NotifMethodWrapper>
          ))}
        </NotifMethodsWrapper>
      </Collapse.Panel>
    </Collapse>
  );
};
