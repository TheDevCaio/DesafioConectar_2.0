import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Container, UserItem } from './styles';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await api.get<User[]>('/users');
        setUsers(response.data);
      } catch (error) {
        alert('Erro ao carregar usuários');
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) return <div>Carregando usuários...</div>;

  return (
    <Container>
      {users.map(user => (
        <UserItem key={user.id}>
          <strong>{user.name}</strong> ({user.email}) - {user.role}
        </UserItem>
      ))}
    </Container>
  );
};