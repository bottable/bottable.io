import { Sider } from '../components';

import React from 'react';
import { Layout, Table, Heading, Text, Tag } from 'fiber-ui';

const Trackers = () => {
  return (
    <Layout style={{ height: '100%' }}>
      <Layout.Sider>
        <Sider />
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
              dataSource={[
                {
                  key: '1',
                  trackerName: 'Tracker 1',
                  categories: ['Category 1', 'Category 2', 'Category 3'],
                  tags: ['Tag 1', 'Tag 2', 'Tag 3'],
                },
                {
                  key: '2',
                  trackerName: 'Tracker 2',
                },
                {
                  key: '3',
                  trackerName: 'Tracker 3',
                },
                {
                  key: '4',
                  trackerName: 'Tracker 4',
                },
              ]}
              pagination={{ hideOnSinglePage: true }}
            />
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default Trackers;
