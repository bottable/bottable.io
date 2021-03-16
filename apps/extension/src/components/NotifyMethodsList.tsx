import { TrackerContext } from '../context';

import React, { useContext } from 'react';
import { Button, Paragraph } from 'fiber-ui';
import { MdClear } from 'react-icons/md';
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

const notifMethodDict = {
  AUDIO: 'Audio Notification',
  POPUP: 'Popup Notification',
  EMAIL: 'User Email',
};

export const NotifyMethodsList = () => {
  const { notificationMethods, setNotificationMethods } = useContext(
    TrackerContext
  );

  const handleDelete = (index: number) => {
    const tempNotifMethods = [...notificationMethods];
    tempNotifMethods.splice(index, 1);
    setNotificationMethods(tempNotifMethods);
  };

  return (
    <NotifMethodsWrapper>
      {notificationMethods.map((method, i) => (
        <NotifMethodWrapper key={method + i}>
          <Button
            onClick={() => handleDelete(i)}
            shape="circle"
            type="text"
            icon={<MdClear />}
            style={{ marginRight: 10 }}
          />
          <NotifMethodText>{notifMethodDict[method]}</NotifMethodText>
        </NotifMethodWrapper>
      ))}
    </NotifMethodsWrapper>
  );
};
