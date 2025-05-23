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
  padding: 2rem;
  background: #fff3e6;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(80, 49, 30, 0.1);

  @media (max-width: 768px) {
    margin: 2rem 1rem;
    padding: 1.5rem;
  }

  input {
    padding: 0.75rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
    background-color: #fff;
    color: var(--text-dark);
    transition: border 0.2s ease, box-shadow 0.2s ease;
    font-family: inherit;
  }

  input:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 5px var(--accent);
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownHeader = styled.div`
  padding: 0.75rem;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.5rem;
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  width: 100%;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 0.5rem;
  list-style: none;
  padding: 0;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
`;

const DropdownItem = styled.li`
  padding: 0.75rem;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: #eee;
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.5rem;
  }
`;

function CustomSelect({
  value,
  onChange,
}: {
  value: 'user' | 'admin';
  onChange: (v: 'user' | 'admin') => void;
}) {
  const [open, setOpen] = useState(false);
  const options = [
    { label: 'Usuário', value: 'user' },
    { label: 'Administrador', value: 'admin' },
  ];

  return (
    <DropdownContainer>
      <DropdownHeader onClick={() => setOpen(!open)}>
        {options.find(o => o.value === value)?.label || 'Selecione'}
      </DropdownHeader>
      {open && (
        <DropdownList>
          {options.map(option => (
            <DropdownItem
              key={option.value}
              onClick={() => {
                onChange(option.value as 'user' | 'admin');
                setOpen(false);
              }}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
}

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put('/users/profile', { name, password: password || undefined });
      alert('Cadastro realizado com sucesso!');
      router.push('/Login');
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
        <CustomSelect value={role} onChange={setRole} />
        <Button type="submit">Cadastrar</Button>
      </FormContainer>
      <Footer />
    </Container>
  );
}