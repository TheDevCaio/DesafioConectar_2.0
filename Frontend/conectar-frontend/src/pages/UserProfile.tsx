import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Button } from '../components/Button';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await api.get<User>('/users/profile');
        setUser(response.data);
        setName(response.data.name);
      } catch {
        alert('Erro ao carregar perfil');
      }
    }
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      await api.put('/users/profile', { name, password: password || undefined });
      alert('Perfil atualizado');
      setPassword('');
    } catch {
      alert('Erro ao atualizar');
    }
  };

  if (!user) return <div>Carregando perfil...</div>;

  return (
    <div>
      <h2>Perfil de {user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Criado em: {new Date(user.createdAt).toLocaleDateString()}</p>

      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Nome"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Nova senha (deixe vazio para não alterar)"
      />
      <Button onClick={handleUpdate}>Atualizar</Button>
    </div>
  );
};

export default UserProfile;