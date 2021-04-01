import { ME_QUERY } from '../graphql/queries';
import client from '../apollo-client';
import { CardStack, Sider, Footer, Section, Pinned } from '../components';

import React from 'react';
import { Button, Heading, Layout, Text, Input } from 'fiber-ui';
import { MdWhatshot } from 'react-icons/md';
import { AiFillPushpin } from 'react-icons/ai';
import cookie from 'cookie';

export const Index = (me) => {
  console.log(me);
  return (
    <Layout>
      <Layout.Sider>
        <Sider />
      </Layout.Sider>
      <Layout style={{ flex: '1 0 0px', width: 0 }}>
        <Layout.Content
          style={{ background: '#f7f7f7', padding: '30px 70px 90px 70px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Heading style={{ margin: 0 }}>Hello Kevin,</Heading>
            <Button
              type="primary"
              style={{ marginLeft: 'auto', backgroundColor: '#333' }}
            >
              See All Trackers
            </Button>
          </div>
          <div style={{ margin: '20px 0' }}>
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
          <Section
            title="Hot"
            description="Everything that changed"
            icon={MdWhatshot}
          >
            <div>
              <CardStack
                type="hot"
                data={[
                  {
                    trackerName: 'Amazon Nike React 4',
                    categoryName: 'Price',
                    prevValue: 5103,
                    newValue: 4500,
                  },
                  {
                    trackerName: 'Tracker Name',
                    categoryName: 'Category Name',
                    prevValue: 'Past Value',
                    newValue: 'New Value',
                  },
                ]}
              />
            </div>
          </Section>
          <Section
            title="Pinned"
            description="All your personal favorites"
            icon={AiFillPushpin}
          >
            <Pinned
              data={[
                {
                  title: 'Amazon Nike React 4',
                  tags: ['Tag 1', 'Tag 2', 'Tag 3'],
                },
                { title: 'Tracker Name', tags: ['Tag 1', 'Tag 2', 'Tag 3'] },
                { title: 'Tracker Name', tags: ['Tag 1', 'Tag 2', 'Tag 3'] },
                { title: 'Tracker Name', tags: ['Tag 1', 'Tag 2', 'Tag 3'] },
                { title: 'Tracker Name', tags: ['Tag 1', 'Tag 2', 'Tag 3'] },
                { title: 'Tracker Name', tags: ['Tag 1', 'Tag 2', 'Tag 3'] },
              ]}
            />
          </Section>
        </Layout.Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

Index.getInitialProps = async ({ req, res }) => {
  if (!req || !res) {
    return {};
  }

  if (req.headers.cookie) {
    const { token } = cookie.parse(req.headers.cookie);

    const {
      data: { me },
    } = await client.query({
      query: ME_QUERY,
      context: {
        headers: {
          authorization: token ? `Bearer ${token}` : '',
        },
      },
    });

    if (me) return me;
  }

  res.writeHead(301, {
    Location: `http://${req.headers.host}/login`,
  });
  res.end();
};

export default Index;
