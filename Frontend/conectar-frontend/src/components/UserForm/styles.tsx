import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: #fff3e6;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(92, 61, 46, 0.1);
`;

export const Label = styled.label`
  font-weight: 600;
  color: #5c3d2e;
`;

export const Input = styled.input`
  padding: 0.8rem;
  border-radius: 6px;
  border: 1px solid #d8c3b3;
  font-size: 1rem;
  background-color: #fff;
  color: #5c3d2e;

  &:focus {
    border-color: #c19268;
    outline: none;
  }
`;

export const Button = styled.button`
  background-color: #d98858;
  color: #fff3e6;
  padding: 0.8rem;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #b56b44;
  }
`;

export const ErrorMessage = styled.div`
  color: #c0392b;
  font-size: 0.9rem;
`;