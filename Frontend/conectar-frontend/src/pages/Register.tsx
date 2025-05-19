import React, { useState } from 'react';
import api from '../services/api';
import { useRouter } from 'next/router';
import { Button } from '../components/Button';
import { Container } from '@/components/GlobalStyles';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import styled from 'styled-components';
import { Title } from '@/components/LoginForm/styles';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 6rem auto;
  margin-right: 90vh;
  padding: 2rem;
  background: #fff3e6;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(80, 49, 30, 0.1);
  
  @media (max-width: 768px) {
margin-right: 7.3vh;
}
  input {
    padding: 0.75rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
    background-color: #fff;
    color: var(--text-dark);
    transition: border 0.2s;

    &:focus {
      outline: none;
      border-color: var(--accent);
    }


  }
`;


export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { name, email, password });
      alert('Cadastro realizado com sucesso!');
      router.push('/login');
    } catch {
      alert('Erro ao cadastrar');
    }
  };

  return (
    <Container>
      <Navbar />
      <FormContainer onSubmit={handleSubmit}>
        <Title>Cadastro</Title>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Cadastrar</Button>
      </FormContainer>
      <Footer />
    </Container>
  );
}