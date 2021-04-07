import React, { FC } from 'react';
import { Space, Button, Text } from 'fiber-ui';
import { HiDesktopComputer } from 'react-icons/hi';
import { MdPerson } from 'react-icons/md';
import { AiFillPlusCircle } from 'react-icons/ai';
import styled from 'styled-components';

const Container = styled.div`
  width: 150px;
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  padding: 50px 25px;
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled(Button)`
  justify-content: flex-start;
  width: 100%;
  margin-top: 20px;
`;

const BottomContainer = styled(Space)`
  margin-top: auto;
  margin-bottom: 20px;
`;

type SiderProps = {
  name: string;
};

const Sider: FC<SiderProps> = ({ name }) => {
  return (
    <Container>
      <Space>
        <img src={'icon.png'} style={{ height: 35, width: 35 }} alt="Logo" />
        <Text strong style={{ fontSize: 20 }}>
          Bottable
        </Text>
      </Space>

      <Button
        style={{
          marginTop: 50,
          backgroundColor: '#333',
        }}
        endIcon={<AiFillPlusCircle />}
        type="primary"
        block
      >
        Add Tracker
      </Button>
      <StyledButton type="text" startIcon={<HiDesktopComputer />}>
        Dashboard
      </StyledButton>
      <StyledButton type="text" startIcon={<MdPerson />}>
        Personal
      </StyledButton>
      <BottomContainer style={{ transform: 'translate(0, -50%)' }}>
        <img src={'icon.png'} style={{ height: 35, width: 35 }} alt="Logo" />
        <div>
          <div>
            <Text strong style={{ fontSize: 20 }}>
              {name}
            </Text>
          </div>
          <div>
            <Text style={{ color: '#a6a6a6' }}>Personal Plan</Text>
          </div>
        </div>
      </BottomContainer>
    </Container>
  );
};

export { Sider };
