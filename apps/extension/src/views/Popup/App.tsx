import React from 'react';
import { Text, Space, Button } from 'fiber-ui';

function App() {
  return (
    <div
      style={{
        width: 283,
        height: 378,
        backgroundColor: '#fff',
        padding: '20px 16px',
      }}
    >
      <Space>
        <img src={'icon.png'} style={{ height: 29, width: 29 }} alt="Logo" />
        <Text style={{ fontWeight: 500 }}>Bottable</Text>
      </Space>
      <div
        style={{
          margin: '88px 64px 93px 64px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: 600 }}>Go Have Fun.</Text>
        <Text style={{ fontSize: 24, fontWeight: 600 }}>We Got You.</Text>
      </div>
      <Button block style={{ backgroundColor: '#333' }} type="primary">
        SIGN UP FREE
      </Button>
      <Button block style={{ marginTop: 10 }} type="text">
        LOG IN
      </Button>
    </div>
  );
}

export default App;
