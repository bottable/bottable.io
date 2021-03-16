import { NotifyMethodsList } from './NotifyMethodsList';

import React from 'react';
import { Collapse, Text } from 'fiber-ui';

export const PreviewNotifyMethods = () => {
  return (
    <Collapse
      style={{ width: 260, backgroundColor: '#fff', boxShadow: 'none' }}
    >
      <Collapse.Panel
        header={
          <Text style={{ fontWeight: 500, fontSize: 14, color: '#828282' }}>
            Notification Methods
          </Text>
        }
      >
        <NotifyMethodsList />
      </Collapse.Panel>
    </Collapse>
  );
};
