import { getAuth, getHot } from '../utils';
import { CardStack, Sider, Footer, Section, Pinned } from '../components';
import { User } from '../types';

import React, { FC } from 'react';
import { Button, Heading, Layout, Text, Input } from 'fiber-ui';
import { MdWhatshot } from 'react-icons/md';
import { AiFillPushpin } from 'react-icons/ai';
import { useRouter } from 'next/router';

export const Index: FC<User> = ({ firstName, lastName, trackers }) => {
  const router = useRouter();

  const hot = getHot(trackers);

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
              onClick={() => {
                router.push('/trackers');
              }}
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

export const getServerSideProps = getAuth;

export default Index;
