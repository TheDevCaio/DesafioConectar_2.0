import React from 'react';
import { UserList } from '../components/UserList';

export const List: React.FC = () => {
  return (
    <div>
      <h2>Lista de Usuários</h2>
      <UserList />
    </div>
  );
};