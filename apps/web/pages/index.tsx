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
import { MdWhatshot, MdPerson } from 'react-icons/md';
import { FaLongArrowAltDown } from 'react-icons/fa';
import { AiFillPushpin, AiFillPlusCircle } from 'react-icons/ai';
import { HiDesktopComputer } from 'react-icons/hi';

export function Index() {
  return (
    <Layout>
      <Layout.Sider>
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
            <img
              src={'icon.png'}
              style={{ height: 35, width: 35 }}
              alt="Logo"
            />
            <Text strong style={{ fontSize: 20 }}>
              Bottable
            </Text>
          </Space>

          <Button
            style={{
              marginTop: 50,
              justifyContent: 'start',
              backgroundColor: '#333',
            }}
            endIcon={<AiFillPlusCircle />}
            type="primary"
            block
          >
            Add Tracker
          </Button>
          <Button
            style={{ marginTop: 20, justifyContent: 'start' }}
            type="text"
            startIcon={<HiDesktopComputer />}
            block
          >
            Dashboard
          </Button>
          <Button
            style={{ marginTop: 20, justifyContent: 'start' }}
            type="text"
            startIcon={<MdPerson />}
            block
          >
            Personal
          </Button>
          <Space style={{ position: 'fixed', bottom: 30, left: 25 }}>
            <img
              src={'icon.png'}
              style={{ height: 35, width: 35 }}
              alt="Logo"
            />
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
      </Layout.Sider>
      <Layout>
        <Layout.Content
          style={{ background: '#f7f7f7', padding: '30px 70px 90px 70px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Heading>Hello Kevin,</Heading>
            <Button
              type="primary"
              style={{ marginLeft: 'auto', backgroundColor: '#333' }}
            >
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
              borderRadius: 10,
            }}
            placeholder="Search for any tracker or category"
            bordered={false}
          />
          <div style={{ marginTop: 20 }}>
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
          <div style={{ marginTop: 20 }}>
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
