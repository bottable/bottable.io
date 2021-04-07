import { ME_QUERY } from '../graphql/queries';
import client from '../apollo-client';
import { CardStack, Sider, Footer, Section, Pinned } from '../components';
import { User } from '../types';

import React, { FC } from 'react';
import { Button, Heading, Layout, Text, Input } from 'fiber-ui';
import { MdWhatshot } from 'react-icons/md';
import { AiFillPushpin } from 'react-icons/ai';
import cookie from 'cookie';

export const Index: FC<User> = ({ firstName, lastName, trackers }) => {
  const hot: {
    trackerName: string;
    categoryName: string;
    prevValue: string;
    newValue: string;
  }[] = [];

  trackers.forEach(({ name, selectors }) => {
    selectors.forEach(({ values }) => {
      const lastValue = values[values.length - 1];
      const lastValueDate = new Date(lastValue.timestamp);
      const diffDays =
        (Date.now() - lastValueDate.getTime()) / (1000 * 60 * 60 * 24);
      if (diffDays < 7) {
        const lastLastValue = values[values.length - 2];
        hot.push({
          trackerName: name,
          categoryName: 'Category Name',
          prevValue: lastLastValue.value,
          newValue: lastValue.value,
        });
      }
    });
  });

  const pinned = trackers.filter((tracker) => tracker.pinned);

  return (
    <Layout>
      <Layout.Sider>
        <Sider name={`${firstName} ${lastName}`} />
      </Layout.Sider>
      <Layout style={{ flex: '1 0 0px', width: 0 }}>
        <Layout.Content
          style={{ background: '#f7f7f7', padding: '30px 70px 90px 70px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Heading style={{ margin: 0 }}>Hello {firstName},</Heading>
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
              <CardStack type="hot" data={hot} />
            </div>
          </Section>
          <Section
            title="Pinned"
            description="All your personal favorites"
            icon={AiFillPushpin}
          >
            <Pinned data={pinned} />
          </Section>
        </Layout.Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  console.log(req, res);
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

    if (me) return { props: me };
  }

  res.writeHead(301, {
    Location: '/login',
  });
  res.end();

  return { props: {} };
};

export default Index;
