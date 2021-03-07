import { useOuterApp } from '../utils';
import * as config from '../config';

import React, { FC } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from 'fiber-ui';
import {
  MdPlayArrow,
  MdPauseCircleOutline,
  MdLaunch,
  MdLock,
  MdLockOpen,
  MdAddCircle,
} from 'react-icons/md';
import styled from 'styled-components';

const TopNavWrapper = styled.div`
  display: flex;
  z-index: 10000000;
  top: 0;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  border-radius: 5px 5px 0 0;
  background: #fff;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  color: #fff;
  /* height: ${config.TOP_NAV_HEIGHT}; */
  text-align: center;
  transition: border-radius 0.2s ease;
`;

const SelectionButton = styled(Button)`
  width: 180px;
`;

type TopNavProps = {
  onSelectorClick?: () => void;
};

export const TopNav: FC<TopNavProps> = ({ onSelectorClick }) => {
  const { isSelectorOn, toggleSelector, isPinned, setIsPinned } = useOuterApp();
  const { pathname } = useLocation();

  let content;
  switch (pathname) {
    case config.ROUTES.index:
      content = (
        <>
          <Link to={config.ROUTES.tracker} style={{ textDecoration: 'none' }}>
            <Button startIcon={<MdAddCircle />}>Tracker</Button>
          </Link>
          <Button startIcon={<MdLaunch />}>Dashboard</Button>
        </>
      );
      break;
    case config.ROUTES.tracker:
      content = (
        <>
          <SelectionButton
            startIcon={
              isSelectorOn ? <MdPauseCircleOutline /> : <MdPlayArrow />
            }
            onClick={() => {
              toggleSelector();
              if (onSelectorClick) onSelectorClick();
            }}
          >
            {isSelectorOn ? 'End Selection' : 'Start Selection'}
          </SelectionButton>
          <Button icon={<MdLaunch />} shape="circle" />
        </>
      );
      break;
  }

  return (
    <TopNavWrapper>
      {content}
      <Button
        icon={isPinned ? <MdLock /> : <MdLockOpen />}
        shape="circle"
        onClick={() => setIsPinned(!isPinned)}
      />
    </TopNavWrapper>
  );
};
