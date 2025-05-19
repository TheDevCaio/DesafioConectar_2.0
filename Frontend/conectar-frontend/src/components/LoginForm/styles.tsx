import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 6rem auto;
  margin-right: 90vh;
  padding: 2rem;
  background: #fff3e6;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(80, 49, 30, 0.1);
`;

export const Title = styled.h2`
  text-align: center;
  color: #5c3d2e;
`;

export const Input = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #d8c3b3;
  border-radius: 6px;

  &:focus {
    border-color: #c19268;
    outline: none;
  }
`;

export const SubmitButton = styled.button`
  padding: 0.9rem;
  font-size: 1rem;
  font-weight: bold;
  background-color: #c19268;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #a8764f;
  }
`;

export const Error = styled.p`
  color: red;
  font-size: 0.9rem;
`;