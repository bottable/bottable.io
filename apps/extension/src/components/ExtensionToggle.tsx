import { WorkSansFont } from '../shared';

import { MdExpandLess } from 'react-icons/md';
import React, { FC } from 'react';
import styled from 'styled-components';

const ExtensionToggleWrapper = styled.div`
  ${WorkSansFont}

  position: fixed;
  top: 30%;
  left: 0;
  transition: left 0.2s ease;
  z-index: 10000 !important;
`;

const ExtensionToggleContent = styled.div`
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 2px 12px 2px 8px !important;
  background-color: rgb(242, 245, 247) !important;
  box-shadow: rgba(118, 118, 118, 0.11) 2px 0px 5px 0px !important;
  line-height: 1 !important;
  cursor: pointer !important;
  border-radius: 4px 4px 0px 0px !important;
  border-width: 1px 1px 1px !important;
  border-style: solid solid solid none !important;
  border-color: rgb(224, 228, 231) rgb(224, 228, 231) rgb(224, 228, 231) !important;
  transform-origin: 0 100% !important;
  transform: rotate(90deg) !important;
  font-family: 'Work Sans', sans-serif !important;
  vertical-align: middle !important;
  text-align: center !important;
  font-weight: 400 !important;
  font-size: 16px !important;
  color: #24292e !important;
`;

type ExtensionToggleProps = {
  isOpen: boolean;
  setIsOpen: (isExpanded: boolean) => void;
};

export const ExtensionToggle: FC<ExtensionToggleProps> = ({
  isOpen,
  setIsOpen,
}) => {
  return (
    <ExtensionToggleWrapper style={{ left: isOpen ? '-500%' : 0 }}>
      <ExtensionToggleContent onMouseEnter={() => setIsOpen(true)}>
        <MdExpandLess style={{ padding: 0 }} />
        Bottable
      </ExtensionToggleContent>
    </ExtensionToggleWrapper>
  );
};
