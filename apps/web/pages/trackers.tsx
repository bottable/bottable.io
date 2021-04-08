import { Sider } from '../components';
import { getAuth } from '../utils';
import { User } from '../types';

import React, { FC } from 'react';
import { Layout, Table, Heading, Text, Tag } from 'fiber-ui';

const Trackers: FC<User> = ({ firstName, lastName, trackers }) => {
  const data = trackers.map(({ name, selectors, tags }, i) => {
    const categories = selectors.map((_, i) => {
      return `Category ${i}`;
    });

    const stringTags = tags.map(({ name }) => name);

    return { key: i, trackerName: name, categories, tags: stringTags };
  });

  return (
    <Layout style={{ height: '100%' }}>
      <Layout.Sider>
        <Sider name={`${firstName} ${lastName}`} />
      </Layout.Sider>
      <Layout style={{ flex: '1 0 0px', width: 0 }}>
        <Layout.Content
          style={{
            background: '#f7f7f7',
            padding: '30px 70px 90px 70px',
            overflow: 'hidden',
          }}
        >
          <Heading style={{ margin: 0 }}>All Trackers</Heading>
          <div style={{ margin: '20px 0' }}>
            <Text>We've done the work for you. Check it out.</Text>
          </div>
          <div style={{ background: '#fff', padding: 60, borderRadius: 10 }}>
            <Table
              columns={[
                {
                  title: 'Tracker Name',
                  dataIndex: 'trackerName',
                  render: (text) => <Text>{text}</Text>,
                },
                {
                  title: 'Category',
                  dataIndex: 'categories',
                  render: (categories) =>
                    categories ? <Text>{categories.join(', ')}</Text> : null,
                },
                {
                  title: 'Tag (s)',
                  dataIndex: 'tags',
                  render: (tags) =>
                    tags ? (
                      <React.Fragment>
                        {tags.map((tag) => {
                          return <Tag key={tag}>{tag}</Tag>;
                        })}
                      </React.Fragment>
                    ) : null,
                },
              ]}
              dataSource={data}
              pagination={{ hideOnSinglePage: true }}
            />
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export const getServerSideProps = getAuth;

export default Trackers;
