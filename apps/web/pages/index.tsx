import React from 'react';
import {
  Button,
  Heading,
  Layout,
  Text,
  Input,
  Space,
  Card,
  Tag,
} from 'fiber-ui';
import { MdWhatshot } from 'react-icons/md';
import { FaLongArrowAltDown } from 'react-icons/fa';
import { AiFillPushpin } from 'react-icons/ai';

export function Index() {
  const { Search } = Input;

  return (
    <Layout>
      <Layout.Sider>
        <Heading>Bottable</Heading>
      </Layout.Sider>
      <Layout>
        <Layout.Content
          style={{ background: '#f7f7f7', padding: '30px 70px 90px 70px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Heading>Hello Kevin,</Heading>
            <Button type="primary" style={{ marginLeft: 'auto' }}>
              See All Trackers
            </Button>
          </div>
          <div style={{ marginBottom: 20 }}>
            <Text>We've done the work for you. Check it out.</Text>
          </div>
          <Input.Search
            style={{
              width: '100%',
              boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.2)',
              padding: '16px 20px',
            }}
            placeholder="Search for any tracker or category"
            bordered={false}
          />
          <div>
            <Space size="sm">
              <MdWhatshot size={40} />
              <Heading size={2}>Hot</Heading>
            </Space>
          </div>
          <div style={{ marginBottom: 20 }}>
            <Text>Everything that changed</Text>
          </div>
          <div>
            <Card
              bordered={false}
              width={350}
              style={{
                color: 'black',
                boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.2)',
              }}
            >
              <div>
                <Text strong>Amazon Nike React 4</Text>
              </div>
              <div style={{ marginBottom: 12 }}>
                <Text strong style={{ color: '#929292' }}>
                  Price
                </Text>
              </div>
              <div
                style={{
                  background: '#eee',
                  textAlign: 'center',
                  padding: '10px 0px',
                }}
              >
                <Text>5103</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <FaLongArrowAltDown />
              </div>
              <div
                style={{
                  background: '#eee',
                  textAlign: 'center',
                  padding: '10px 0px',
                }}
              >
                <Text strong>4500</Text>
              </div>
            </Card>
          </div>
          <div>
            <Space size="sm">
              <AiFillPushpin size={40} />
              <Heading size={2}>Pinned</Heading>
            </Space>
          </div>
          <div style={{ marginBottom: 20 }}>
            <Text>All your personal favorites</Text>
          </div>
          <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap' }}>
            <Card
              width={350}
              style={{
                margin: '12px 16px 12px 0px',
                boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.2)',
              }}
              title="Amazon Nike React 4"
              bordered={false}
            >
              <Tag style={{ marginBottom: '7px', marginTop: '7px' }}>Tag 1</Tag>
              <Tag style={{ marginBottom: '7px', marginTop: '7px' }}>Tag 2</Tag>
              <Tag style={{ marginBottom: '7px', marginTop: '7px' }}>Tag 3</Tag>
            </Card>
            <Card
              width={350}
              style={{
                margin: '12px 16px 12px 0px',
                boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.2)',
              }}
              title="Tracker Name"
              bordered={false}
            >
              <Tag style={{ marginBottom: '7px', marginTop: '7px' }}>Tag 1</Tag>
              <Tag style={{ marginBottom: '7px', marginTop: '7px' }}>Tag 2</Tag>
              <Tag style={{ marginBottom: '7px', marginTop: '7px' }}>Tag 3</Tag>
            </Card>
            <Card
              width={350}
              style={{
                margin: '12px 16px 12px 0px',
                boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.2)',
              }}
              title="Tracker Name"
              bordered={false}
            >
              <Tag style={{ marginBottom: '7px', marginTop: '7px' }}>Tag 1</Tag>
              <Tag style={{ marginBottom: '7px', marginTop: '7px' }}>Tag 2</Tag>
              <Tag style={{ marginBottom: '7px', marginTop: '7px' }}>Tag 3</Tag>
            </Card>
            <Card
              width={350}
              style={{
                margin: '12px 16px 12px 0px',
                boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.2)',
              }}
              title="Tracker Name"
              bordered={false}
            >
              <Tag style={{ marginBottom: '7px', marginTop: '7px' }}>Tag 1</Tag>
              <Tag style={{ marginBottom: '7px', marginTop: '7px' }}>Tag 2</Tag>
              <Tag style={{ marginBottom: '7px', marginTop: '7px' }}>Tag 3</Tag>
            </Card>
            <Card
              width={350}
              style={{
                margin: '12px 16px 12px 0px',
                boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.2)',
              }}
              title="Tracker Name"
              bordered={false}
            >
              <Tag style={{ marginBottom: '7px', marginTop: '7px' }}>Tag 1</Tag>
              <Tag style={{ marginBottom: '7px', marginTop: '7px' }}>Tag 2</Tag>
              <Tag style={{ marginBottom: '7px', marginTop: '7px' }}>Tag 3</Tag>
            </Card>
            <Card
              width={350}
              style={{
                margin: '12px 16px 12px 0px',
                boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.2)',
              }}
              title="Tracker Name"
              bordered={false}
            >
              <Tag style={{ marginBottom: '7px', marginTop: '7px' }}>Tag 1</Tag>
              <Tag style={{ marginBottom: '7px', marginTop: '7px' }}>Tag 2</Tag>
              <Tag style={{ marginBottom: '7px', marginTop: '7px' }}>Tag 3</Tag>
            </Card>
          </div>
        </Layout.Content>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout>
    </Layout>
  );
}

export default Index;
