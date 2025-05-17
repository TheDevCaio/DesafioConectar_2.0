import React from 'react';
import { Container, Nav, NavLink } from './styles';

export const Navbar: React.FC = () => {
  return (
    <Container>
      <h1>Pudim Lovers</h1>
      <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/pudim">Galeria</NavLink>
        <NavLink href="/profile">Perfil</NavLink>
        <NavLink href="/login">Login</NavLink>
      </Nav>
    </Container>
  );
};