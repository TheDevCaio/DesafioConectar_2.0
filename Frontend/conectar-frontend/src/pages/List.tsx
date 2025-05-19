import React from 'react';
import { UserList } from '../components/UserList';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { Container } from '@/components/GlobalStyles';

export const List: React.FC = () => {
  return (
      <Container>
      <Navbar />
      <UserList />
      <Footer />
    </Container>
  );
};

export default List;