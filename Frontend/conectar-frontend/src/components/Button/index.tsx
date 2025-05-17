import React from 'react';
import { StyledButton } from './styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};