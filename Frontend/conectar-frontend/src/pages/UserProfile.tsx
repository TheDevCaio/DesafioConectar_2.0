import React, { useEffect, useState } from 'react';
import api from '../services/api';
import styled from 'styled-components';
import { Button } from '../components/Button';
import { Container } from '@/components/GlobalStyles';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  lastLogin: string | null;
}

const ProfileWrapper = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgb(0 0 0 / 0.1);
  margin-top: 0vh;
  h2 {
    margin-bottom: 1.5rem;
    color: #222;
  }

  p {
    margin-bottom: 0.75rem;
    font-size: 1rem;
    color: #555;
  }
`;

const FormGroup = styled.div`
  margin: 1rem 0;

  label {
    display: block;
    margin-bottom: 0.3rem;
    font-weight: 600;
    color: #333;
  }

  input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline-offset: 2px;
    transition: border-color 0.2s;

    &:focus {
      border-color: #0070f3;
    }
  }
`;

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
      const token = localStorage.getItem('token');
      await api.put(
        '/users/profile',
        { name, password: password || undefined },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Perfil atualizado');
      setPassword('');
      setUser(prev => (prev ? { ...prev, name } : prev));
    } catch {
      alert('Erro ao atualizar');
    }
  };

  if (!user) return <div>Carregando perfil...</div>;

  return (
    <Container>
      <Navbar />
      <ProfileWrapper>
        <h2>Perfil de {user.name}</h2>

        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Função:</strong> {user.role}</p>
        <p><strong>Criado em:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>

        <FormGroup>
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Nome"
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="password">Nova senha (deixe vazio para não alterar)</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Nova senha"
          />
        </FormGroup>

        <Button onClick={handleUpdate}>Atualizar</Button>
      </ProfileWrapper>
      <Footer />
    </Container>
  );
};
//Não tive tempo de componentizar essa pagina, mas o ideal seria criar um componente de perfil e um de formulário para reutilizar em outras partes do app
// e facilitar a manutenção.
export default UserProfile;