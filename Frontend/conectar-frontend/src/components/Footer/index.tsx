import React from 'react';
import { Container, P } from './style';

export const Footer: React.FC = () => {
  return (
    <Container>
      <P>&copy; {new Date().getFullYear()} Galeria do Pudim. Delicioso e responsivo.</P>
    </Container>
  );
};