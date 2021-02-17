import React from 'react';
import { Layout, Space, Text } from 'fiber-ui';

const Footer = () => {
  return (
    <Layout.Footer style={{ background: '#f7f7f7', padding: '0px 70px' }}>
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: 10,
          padding: '45px 130px 50px 45px',
          boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.2)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ marginBottom: 50 }}>
            <Space>
              <img
                src={'icon.png'}
                style={{ height: 45, width: 45 }}
                alt="Logo"
              />
              <Text strong style={{ fontSize: 36 }}>
                Bottable
              </Text>
            </Space>
            <div style={{ marginTop: 12 }}>
              <Text>Web monitor. Automated and simple.</Text>
            </div>
            <div style={{ marginTop: 12 }}>
              <Text>© 2020 bottable.io. All Rights Reserved</Text>
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: 60 }}>
              <div>
                <Text strong>PRODUCT</Text>
              </div>
              <div style={{ marginTop: 25 }}>
                <Text>Overview</Text>
              </div>
              <div style={{ marginTop: 20 }}>
                <Text>Pricing</Text>
              </div>
            </div>
            <div style={{ marginRight: 60 }}>
              <div>
                <Text strong>COMPANY</Text>
              </div>
              <div style={{ marginTop: 25 }}>
                <Text>About</Text>
              </div>
              <div style={{ marginTop: 20 }}>
                <Text>Careers</Text>
              </div>
            </div>
            <div>
              <div>
                <Text strong>HELP & CONTACT</Text>
              </div>
              <div style={{ marginTop: 25 }}>
                <Text>Knowledge Base</Text>
              </div>
              <div style={{ marginTop: 20 }}>
                <Text>Contact Us</Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout.Footer>
  );
};
export { Footer };
