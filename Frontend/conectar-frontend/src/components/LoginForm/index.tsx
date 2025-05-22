import React, { useState } from 'react';
import api from '../../services/api';
import { useRouter } from 'next/router'; 
import { Input, Title, SubmitButton, Form } from './styles';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.access_token);
      const userRole = response.data.user.role;

      if (userRole === 'admin') {
        router.push('/UserList');  
      } else {
        router.push('/UserList');
      }
    } catch {
      alert('Falha no login');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Login</Title>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <SubmitButton type="submit">Entrar</SubmitButton>
    </Form>
  );
};