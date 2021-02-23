import styled from 'styled-components';

export const CardStackContainer = styled.div`
  display: flex;
  box-sizing: content-box;
  width: 100%;
  padding: 10px;
  overflow: auto;
  /* width */
  ::-webkit-scrollbar {
    height: 8px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: #fff;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background: #888;
  }
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
