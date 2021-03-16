import { TrackerContext } from '../context';

import React, { useContext } from 'react';
import { Card, Text } from 'fiber-ui';

export const PreviewFrequency = () => {
  const { updateFrequency } = useContext(TrackerContext);

  let freq = 0;
  let mode = '';

  const cron = updateFrequency.split(' ');
  if (cron[1] !== '0') {
    freq = parseInt(cron[1].substring(2));
    mode = 'Hr';
  } else {
    freq = parseInt(cron[2].substring(2));
    if (freq <= 6) {
      mode = 'D';
    } else {
      freq /= 7;
      mode = 'W';
    }
  }

  return (
    <Card width={260} bordered={false} style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Text style={{ fontWeight: 500, color: '#828282', fontSize: 14 }}>
          Frequency
        </Text>
        <Text
          style={{ fontWeight: 500, color: '#000', fontSize: 14 }}
        >{`${freq} ${mode}`}</Text>
      </div>
    </Card>
  );
};
