import React from 'react';
import { Space, Button, Text } from 'fiber-ui';
import { HiDesktopComputer } from 'react-icons/hi';
import { MdPerson } from 'react-icons/md';
import { AiFillPlusCircle } from 'react-icons/ai';

const Sider = () => {
  return (
    <div
      style={{
        width: 150,
        background: 'white',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        padding: '50px 25px',
      }}
    >
      <Space>
        <img src={'icon.png'} style={{ height: 35, width: 35 }} alt="Logo" />
        <Text strong style={{ fontSize: 20 }}>
          Bottable
        </Text>
      </Space>

      <Button
        style={{
          marginTop: 50,
          backgroundColor: '#333',
        }}
        endIcon={<AiFillPlusCircle />}
        type="primary"
        block
      >
        Add Tracker
      </Button>
      <Button
        style={{ marginTop: 20, justifyContent: 'flex-start', width: '100%' }}
        type="text"
        startIcon={<HiDesktopComputer />}
      >
        Dashboard
      </Button>
      <Button
        style={{ marginTop: 20, justifyContent: 'flex-start', width: '100%' }}
        type="text"
        startIcon={<MdPerson />}
      >
        Personal
      </Button>
      <Space style={{ position: 'fixed', bottom: 30, left: 25 }}>
        <img src={'icon.png'} style={{ height: 35, width: 35 }} alt="Logo" />
        <div>
          <div>
            <Text strong style={{ fontSize: 20 }}>
              Kevin Chen
            </Text>
          </div>
          <div>
            <Text style={{ color: '#a6a6a6' }}>Personal Plan</Text>
          </div>
        </div>
      </Space>
    </div>
  );
};

export { Sider };
