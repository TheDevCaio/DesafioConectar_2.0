import React from 'react';
import { Container } from './style';

export const Footer: React.FC = () => {
  return (
    <Container>
      <p>&copy; {new Date().getFullYear()} Galeria do Pudim. Delicioso e responsivo.</p>
    </Container>
  );
};