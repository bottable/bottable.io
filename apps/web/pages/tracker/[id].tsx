import {
  CardStack,
  Sider,
  Footer,
  Section,
  AllCategories,
  Settings,
} from '../../components';
import { getAuth, getHot } from '../../utils';
import { User, Selector } from '../../types';

import React, { FC, useState } from 'react';
import { Button, Heading, Layout, Table, Tag, Text } from 'fiber-ui';
import { MdWhatshot, MdSettings, MdInsertChart } from 'react-icons/md';
import { AiFillPushpin, AiOutlinePushpin } from 'react-icons/ai';
import { FiExternalLink } from 'react-icons/fi';
import { FaShapes } from 'react-icons/fa';
import { useRouter } from 'next/router';

const Tracker: FC<User> = ({ firstName, lastName, trackers }) => {
  const router = useRouter();
  const { id } = router.query;

  const tracker = trackers.find((curTracker) => curTracker.id === id);

  //Temp: Add type and name to selectors
  const tempSelectors: Selector[] = tracker.selectors.map((selector, idx) => {
    return { ...selector, name: `Category ${idx}`, type: 'string' };
  });

  const [pinned, setPinned] = useState<boolean>(tracker.pinned);
  const [selectors, setSelectors] = useState<Selector[]>(tempSelectors);

  const PushPinComponent = pinned ? AiFillPushpin : AiOutlinePushpin;

  const hot = getHot([tracker]);

  return (
    <Layout>
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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Heading style={{ margin: 0 }}>{tracker.name}</Heading>
            <PushPinComponent
              size={40}
              style={{ marginLeft: 20, cursor: 'pointer' }}
              onClick={() => {
                setPinned((prevVal) => !prevVal);
              }}
            />
            <Button
              type="primary"
              startIcon={<FiExternalLink />}
              style={{ marginLeft: 'auto', backgroundColor: '#333' }}
            >
              Open Tracker
            </Button>
          </div>
          <div style={{ margin: '10px 0 20px 0' }}>
            {tracker.tags.map(({ name, color }, i) => (
              <Tag key={i} color={color}>
                {name}
              </Tag>
            ))}
          </div>
          <Section
            title="Hot"
            description="All the categories that changed"
            icon={MdWhatshot}
          >
            <div>
              <CardStack type="hot-tracker" data={hot} />
            </div>
          </Section>
          <Section
            title="All Categories"
            description="Everything you want to track"
            icon={FaShapes}
          >
            <AllCategories data={selectors} />
          </Section>
          <Section
            title="Settings"
            icon={MdSettings}
            description="Just some housekeeping to set up"
          >
            <Settings
              notificationMethods={[
                'Audio Notification',
                'Popup Notification',
                'User Email',
              ]}
              frequency={1}
              image="https://fiber-docusaurus.netlify.app/img/fatoldsun.png"
            />
          </Section>
          <Section
            title="Historical Data"
            description="View all the changes at once"
            icon={MdInsertChart}
          >
            <div style={{ background: '#fff', padding: 60, borderRadius: 10 }}>
              <Table
                columns={[
                  {
                    title: 'Category Name',
                    dataIndex: 'categoryName',
                    onClick: (value) => {
                      console.log(value);
                    },
                  },
                  {
                    title: 'Updated Time',
                    dataIndex: 'updatedTime',
                    onClick: (value) => {
                      console.log(value);
                    },
                  },
                  {
                    title: 'Past Content',
                    dataIndex: 'pastContent',
                    onClick: (value) => {
                      console.log(value);
                    },
                    ellipsis: true,
                  },
                  {
                    title: 'New Content',
                    dataIndex: 'newContent',
                    render: (text) => <Text strong>{text}</Text>,
                    onClick: (value) => {
                      console.log(value);
                    },
                    ellipsis: true,
                  },
                  {
                    title: 'Change',
                    dataIndex: 'change',
                    onClick: (value) => {
                      console.log(value);
                    },
                  },
                ]}
                dataSource={[
                  {
                    key: '1',
                    categoryName: 'Category 1',
                    updatedTime: '8/9/20 13:00 PM',
                    pastContent: '19',
                    newContent: '25',
                    change: '+5 (31.58%)',
                  },
                  {
                    key: '2',
                    categoryName: 'Category 2',
                    updatedTime: '8/8/20 13:00 PM',
                    pastContent:
                      'Mauris ac dui id lectus dignissim convallis at a ex. Nullam commodo viverra dolor, quis placerat velit consequat et. In hac habitasse platea dictumst. Curabitur vitae porta sem. Aliquam non ligula erat. Aenean ac tincidunt justo, nec condimentum risus. Sed pulvinar tempor dolor dictum maximus. Aenean molestie, mi eu fermentum lacinia, augue massa tristique lorem, ut sollicitudin justo mi tristique libero.',
                    newContent:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed nisi eget nunc tristique gravida. Cras ullamcorper libero a dapibus ullamcorper. Quisque malesuada molestie lorem non dignissim. Cras luctus sodales libero viverra mollis. Praesent fermentum felis eget augue lacinia rutrum. Nunc sit amet lacus nisi. In in erat fringilla, varius diam sit amet, consectetur tellus. Morbi et purus odio.',
                    change: 'Click to see change',
                  },
                  {
                    key: '3',
                    categoryName: 'Category 3',
                    updatedTime: '8/4/20 13:00 PM',
                    pastContent: '19.28',
                    newContent: '15.62',
                    change: '-3.66 (18.98%)',
                  },
                  {
                    key: '4',
                    categoryName: 'Category 4',
                    updatedTime: '8/3/20 9:00 PM',
                    pastContent:
                      'Sed imperdiet dignissim massa ac efficitur. Suspendisse vitae sem lacinia, fringilla diam ut, tempor massa. Aliquam vitae elit erat. Proin non metus eleifend, iaculis mi volutpat, rutrum massa. Praesent consectetur eros mattis augue feugiat porttitor. Maecenas sem turpis, congue vitae faucibus id, consectetur vel lectus. Maecenas pretium neque quis vestibulum eleifend. Praesent et lacus dapibus, tempor diam in, mattis neque. Pellentesque at dapibus mi, quis scelerisque urna. In hac habitasse platea dictumst. Sed id tortor ut neque elementum finibus ornare non risus. Proin tempus imperdiet dignissim. Pellentesque rhoncus, metus quis ornare viverra, est urna ultrices ex, id tempus ipsum urna et dui. Etiam rhoncus tempor blandit. Proin posuere ultricies elit.',
                    newContent:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed nisi eget nunc tristique gravida. Cras ullamcorper libero a dapibus ullamcorper. Quisque malesuada molestie lorem non dignissim. Cras luctus sodales libero viverra mollis. Praesent fermentum felis eget augue lacinia rutrum. Nunc sit amet lacus nisi. In in erat fringilla, varius diam sit amet, consectetur tellus. Morbi et purus odio.',
                    change: 'Click to see change',
                  },
                ]}
                pagination={{ hideOnSinglePage: true }}
              />
            </div>
          </Section>
          <Button
            type="primary"
            style={{ marginTop: 34, backgroundColor: '#333' }}
          >
            Save
          </Button>
        </Layout.Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export const getServerSideProps = getAuth;

export default Tracker;
