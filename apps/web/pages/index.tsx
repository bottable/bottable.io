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
    <Layout style={{ marginTop: 48 }}>
      <Layout.Sider>
        <Heading>Bottable</Heading>
      </Layout.Sider>
      <Layout>
        <Layout.Content style={{ background: '#f7f7f7' }}>
          <div style={{ display: 'flex' }}>
            <Heading>Hello Kevin,</Heading>
            <Button type="primary" style={{ alignSelf: 'flex-end' }}>
              See All Trackers
            </Button>
          </div>
          <Text>We've done the work for you. Check it out.</Text>
          <Input.Search
            style={{ width: '100%' }}
            placeholder="Search for any tracker or category"
          />
          <Space>
            <MdWhatshot />
            <Heading size={2}>Hot</Heading>
          </Space>
          <Text>Everything that changed</Text>
          <Space>
            <Card bordered={false} title="Amazon Nike React 4" width={300}>
              <Text strong style={{ color: '#929292' }}>
                Price
              </Text>
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
          </Space>
          <Space>
            <AiFillPushpin />
            <Heading size={2}>Pinned</Heading>
          </Space>
          <Text>All your personal favorites</Text>
          <Space direction="vertical">
            <Space>
              <Card width={300} title="Amazon Nike React 4" bordered={false}>
                <Tag>Tag 1</Tag>
                <Tag>Tag 2</Tag>
                <Tag>Tag 3</Tag>
              </Card>
              <Card width={300} title="Tracker Name" bordered={false}>
                <Tag>Tag 1</Tag>
                <Tag>Tag 2</Tag>
                <Tag>Tag 3</Tag>
              </Card>
              <Card width={300} title="Tracker Name" bordered={false}>
                <Tag>Tag 1</Tag>
                <Tag>Tag 2</Tag>
                <Tag>Tag 3</Tag>
              </Card>
            </Space>
            <Space>
              <Card width={300} title="Tracker Name" bordered={false}>
                <Tag>Tag 1</Tag>
                <Tag>Tag 2</Tag>
                <Tag>Tag 3</Tag>
              </Card>
              <Card width={300} title="Tracker Name" bordered={false}>
                <Tag>Tag 1</Tag>
                <Tag>Tag 2</Tag>
                <Tag>Tag 3</Tag>
              </Card>
              <Card width={300} title="Tracker Name" bordered={false}>
                <Tag>Tag 1</Tag>
                <Tag>Tag 2</Tag>
                <Tag>Tag 3</Tag>
              </Card>
            </Space>
          </Space>
        </Layout.Content>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout>
    </Layout>
  );
}

export default Index;
