import styled from 'styled-components';
import { Text } from 'fiber-ui';

export const CategoryTitle = styled(Text)`
  display: inline;
  background: #e0e0e0;
  border-radius: 3px;
  padding: 1px 5px;
  max-width: 160px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
`;
