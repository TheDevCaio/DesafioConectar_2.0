import styled from 'styled-components';

export const PudimSection = styled.section`
  display: flex;
  justify-content: center;
  padding: 2rem;
  background-color: #fff3e6;
`;

export const PudimCard = styled.div`
  background: #fff3e6;
  border: 2px solid #f5c396;
  border-radius: 16px;
  padding: 2rem;
  max-width: 600px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    max-width: 400px;
    border-radius: 12px;
    margin-bottom: 1.5rem;
  }

  h3 {
    color: #8c4a2f;
    margin-bottom: 0.75rem;
    font-size: 1.5rem;
  }

  p {
    color: #5c3d2e;
    font-size: 1rem;
  }
`;
