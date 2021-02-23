import React, { FC, useState } from 'react';
import { Card, Text, Dropdown, Menu, Radio, Slider, Checkbox } from 'fiber-ui';
import { MdExpandMore } from 'react-icons/md';
import { FaTimes } from 'react-icons/fa';

type SettingsProps = {
  notificationMethods: (
    | 'Audio Notification'
    | 'Popup Notification'
    | 'User Email'
  )[];
  frequency: number;
  image: string;
};

const Settings: FC<SettingsProps> = ({
  notificationMethods,
  frequency,
  image,
}) => {
  const [sliderValue, setSliderValue] = useState<number>(frequency);

  const menu = (
    <Menu>
      <Menu.Item>Audio Notification</Menu.Item>
      <Menu.Item>Popup Notification</Menu.Item>
      <Menu.Item>User Email</Menu.Item>
    </Menu>
  );

  const methodsNode = notificationMethods.map((method, idx) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 12,
      }}
      key={idx}
    >
      <FaTimes style={{ marginRight: 20 }} />
      <Text style={{ fontSize: 14 }}>{method}</Text>
    </div>
  ));

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Card
        width={280}
        style={{ boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.2)', color: 'black' }}
        bordered={false}
      >
        <div>
          <Text strong style={{ fontSize: 20 }}>
            Notification Method
          </Text>
        </div>
        <div style={{ marginBottom: 6 }}>
          <Text style={{ color: '#6b6b6b', fontSize: 14 }}>
            Notify me through
          </Text>
        </div>
        <div style={{ marginBottom: 12 }}>
          <Dropdown.Button
            overlay={menu}
            button={{
              endIcon: <MdExpandMore />,
              block: true,
            }}
            style={{ width: '100%' }}
          >
            Add Action
          </Dropdown.Button>
        </div>
        {methodsNode}
      </Card>
      <Card
        width={408}
        style={{ boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.2)', color: 'black' }}
        bordered={false}
      >
        <div style={{ marginBottom: 12 }}>
          <Text strong style={{ fontSize: 20 }}>
            Frequency
          </Text>
        </div>
        <div style={{ marginBottom: 15 }}>
          <Radio.Group buttonStyle="solid" size="lg">
            <Radio.Button value="hourly" style={{ width: 88 }}>
              Hourly
            </Radio.Button>
            <Radio.Button value="daily" style={{ width: 88 }}>
              Daily
            </Radio.Button>
            <Radio.Button value="weekly" style={{ width: 88 }}>
              Weekly
            </Radio.Button>
          </Radio.Group>
        </div>
        <div
          style={{
            borderRadius: 4,
            backgroundColor: '#e0e0e0',
            display: 'flex',
            alignItems: 'center',
            padding: '15px 20px',
            marginBottom: 25,
          }}
        >
          <Slider
            value={sliderValue}
            onChange={(value) => {
              setSliderValue(value);
            }}
            style={{ flex: 7 }}
            min={1}
            max={24}
            size="lg"
          />
          <Text strong style={{ flex: 3 }} textAlign="right">
            {sliderValue} Hr
          </Text>
        </div>
        <div>
          <Checkbox>Notify me even if the condition isn't met</Checkbox>
        </div>
      </Card>
      <Card
        width={320}
        style={{ boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.2)', color: 'black' }}
        bordered={false}
      >
        <div style={{ marginBottom: 6 }}>
          <Text strong style={{ fontSize: 20 }}>
            Web Page
          </Text>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={image} style={{ width: 260, height: 185 }} alt="Web Page" />
        </div>
      </Card>
    </div>
  );
};

export { Settings };
