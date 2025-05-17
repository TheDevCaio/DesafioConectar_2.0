import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
`;

export const Label = styled.label`
  font-weight: 600;
`;

export const Input = styled.input`
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

export const Button = styled.button`
  background-color: #2d9cdb;
  color: white;
  padding: 0.7rem;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #238ac9;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 0.9rem;
`;