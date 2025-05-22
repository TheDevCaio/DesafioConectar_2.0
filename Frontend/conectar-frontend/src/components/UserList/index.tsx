import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, UserItem } from './styles';
import { User } from '../GlobalStyles';

interface Props {
  onEdit: (user: User) => void;
}

export const UserList: React.FC<Props> = ({ onEdit }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token não encontrado. Faça login novamente.');
        setLoading(false);
        return;
      }

 try {
  const response = await axios.get('http://localhost:3001/users', {
    headers: { Authorization: `Bearer ${token}` },
  });
  setUsers(response.data);
} catch (error: any) {
  if (error.response?.status === 403) {
    setError('Acesso negado. Apenas administradores podem ver essa lista.');
  } else {
    setError('Erro ao carregar usuários');
  }
} finally {
  setLoading(false);
}
    }

    fetchUsers();
  }, []);

  if (loading) return <div>Carregando usuários...</div>;
  if (error) return <div>{error}</div>;

  return (
  <Container>
    {users.map(user => (
      <UserItem key={user.id} onClick={() => onEdit(user)}>
        <div><strong>Nome:</strong> {user.name}</div>
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Função:</strong> {user.role}</div>
      </UserItem>
    ))}
  </Container>
);
}