import { CardStackContainer } from './styles';

import React, { FC, useState, useRef, useEffect } from 'react';
import { Card, Text, Tooltip, Dropdown, Menu, Input } from 'fiber-ui';
import { FaLongArrowAltDown } from 'react-icons/fa';
import { MdInfo, MdExpandMore } from 'react-icons/md';
import { FiExternalLink } from 'react-icons/fi';
import { AiFillPushpin, AiOutlinePushpin } from 'react-icons/ai';

type CardStackProps = {
  type: 'hot' | 'categories' | 'hot-tracker';
  data: { [key: string]: string | number | boolean | undefined }[];
};

const formatMoney = (
  amount,
  decimalCount = 0,
  decimal = '.',
  thousands = ','
) => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? '-' : '';

    const i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    const j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - parseInt(i))
            .toFixed(decimalCount)
            .slice(2)
        : '')
    );
  } catch (e) {
    console.log(e);
  }
};

const CardStack: FC<CardStackProps> = ({ type, data }) => {
  const [focus, setFocus] = useState<number | undefined>(undefined);
  const [scroll, setScroll] = useState<number>(0);

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.addEventListener('scroll', () => {
        setScroll(sliderRef.current.scrollLeft);
      });
    }
  }, [sliderRef]);

  const getDefaultProps = (idx: number) => {
    let boxShadow: string;
    if (idx === 0) {
      boxShadow = '0px 1px 4px rgba(0, 0, 0, 0.2)';
    } else {
      boxShadow = ' -4px 0px 10px rgba(0, 0, 0, 0.25)';
    }

    if (idx === focus) boxShadow = '0px 0px 10px 4px rgba(0, 0, 0, 0.3)';

    return {
      bordered: false,
      width: 350,
      style: {
        color: 'black',
        boxShadow: boxShadow,
        marginLeft: idx !== 0 ? -40 : 0,
        zIndex: idx === focus ? 10000 : idx,
        flex: '0 0 auto',
        marginRight: idx === data.length - 1 ? 10 : 0,
      },
      onMouseEnter: () => {
        setFocus(idx);
      },
      onMouseLeave: () => {
        setFocus(undefined);
      },
    };
  };

  let cardsNode: React.ReactNode;

  switch (type) {
    case 'hot':
      cardsNode = data.map(
        ({ trackerName, categoryName, prevValue, newValue }, idx) => (
          <Card {...getDefaultProps(idx)}>
            <div>
              <Text strong style={{ fontSize: 20 }}>
                {trackerName}
              </Text>
            </div>
            <div style={{ marginBottom: 12 }}>
              <Text strong style={{ color: '#929292', fontSize: 20 }}>
                {categoryName}
              </Text>
            </div>
            <div
              style={{
                background: '#eee',
                textAlign: 'center',
                padding: '10px 0px',
                borderRadius: 4,
              }}
            >
              <Text>{prevValue}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <FaLongArrowAltDown />
            </div>
            <div
              style={{
                background: '#eee',
                textAlign: 'center',
                padding: '10px 0px',
                borderRadius: 4,
              }}
            >
              <Text strong>{newValue}</Text>
            </div>
          </Card>
        )
      );
      break;
    case 'hot-tracker':
      cardsNode = data.map(({ categoryName, prevValue, newValue }, idx) => (
        <Card {...getDefaultProps(idx)}>
          <div
            style={{ marginBottom: 12, display: 'flex', alignItems: 'center' }}
          >
            <Text strong style={{ fontSize: 20 }}>
              {categoryName}
            </Text>
            <div style={{ alignSelf: 'flex-start' }}>
              <Tooltip
                placement="topLeft"
                color="#333"
                title={`is equal to ${formatMoney(newValue)}`}
              >
                <MdInfo
                  style={{
                    color: 'black',
                    width: 16,
                    height: 16,
                    verticalAlign: 'top',
                    cursor: 'pointer',
                  }}
                />
              </Tooltip>
            </div>
            <FiExternalLink style={{ marginLeft: 'auto' }} size={16} />
          </div>
          <div
            style={{
              background: '#eee',
              textAlign: 'center',
              padding: '10px 0px',
            }}
          >
            <Text>{prevValue}</Text>
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
            <Text strong>{newValue}</Text>
          </div>
        </Card>
      ));
      break;
    case 'categories':
      cardsNode = data.map(
        ({ categoryName, pinned, value, type, notify, payload }, idx) => {
          const menuArray =
            type === 'number'
              ? ['changes', 'is equal to', 'is greater than', 'is less than']
              : ['changes', 'contains'];

          const menu = (
            <Menu>
              {menuArray.map((menuItem, idx) => (
                <Menu.Item key={idx}>{menuItem}</Menu.Item>
              ))}
            </Menu>
          );

          return (
            <Card {...getDefaultProps(idx)}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Text strong style={{ fontSize: 20 }}>
                  {categoryName}
                </Text>
                {pinned ? (
                  <AiFillPushpin style={{ marginLeft: 'auto' }} />
                ) : (
                  <AiOutlinePushpin style={{ marginLeft: 'auto' }} />
                )}
              </div>
              <div style={{ marginBottom: 12 }}>
                <Text style={{ color: '#6b6b6b', fontSize: 14 }}>
                  Notify me when selected value
                </Text>
              </div>
              <div
                style={{
                  background: '#eee',
                  textAlign: 'center',
                  padding: '10px 20px',
                  marginBottom: 12,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  borderRadius: 4,
                }}
              >
                <Text>{value}</Text>
              </div>
              <div style={{ marginBottom: 12 }}>
                <Dropdown.Button
                  overlay={menu}
                  button={{
                    style: { width: '100%', justifyContent: 'flex-start' },
                    endIcon: <MdExpandMore />,
                  }}
                  style={{ width: '100%', position: 'static' }}
                  dropdownStyle={{ top: 'auto', marginLeft: -scroll }}
                >
                  {notify}
                </Dropdown.Button>
              </div>
              {payload !== undefined ? (
                <Input value={payload} style={{ width: '100%' }} />
              ) : (
                <div
                  style={{
                    borderRadius: 4,
                    border: '1px solid #e0e0e0',
                    padding: '7px 16px',
                    background: !payload ? '#e0e0e0' : null,
                    minHeight: 22,
                  }}
                />
              )}
            </Card>
          );
        }
      );
      break;
  }

  return (
    <CardStackContainer
      style={{ overflow: type === 'hot-tracker' ? 'visible' : null }}
      ref={sliderRef}
    >
      {cardsNode}
    </CardStackContainer>
  );
};

export { CardStack };
