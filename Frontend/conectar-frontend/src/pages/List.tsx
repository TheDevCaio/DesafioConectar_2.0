import React, { useState } from 'react';

import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { Container, User } from '@/components/GlobalStyles';
import { UserList } from '@/components/UserList';




export const List: React.FC = () => {
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [refresh, setRefresh] = useState(false);

  return (
    <Container>
      <Navbar />
      <UserList
        key={refresh ? 'refresh1' : 'refresh2'}
        onEdit={(user) => setEditingUser(user)}
      />
      <Footer />
    </Container>
  );
};

export default List;