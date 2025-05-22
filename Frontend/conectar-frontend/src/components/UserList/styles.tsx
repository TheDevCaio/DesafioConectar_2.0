import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  height: 100vh;
  overflow-y: auto;
  margin-top: 20vh;g
  
`;

export const UserItem = styled.div`
  margin-bottom: 12px;
  padding: 8px;
  border-bottom: 1px solid #ccc;
  font-size: 16px;

  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    flex-direction: row;
    gap: 16px;
    flex-wrap: wrap;
  }

  strong {
    margin-right: 4px;
  }
`;