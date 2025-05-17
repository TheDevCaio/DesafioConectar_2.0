import { useState } from 'react';
import { Container, Input, Label, Button, ErrorMessage } from './styles';
import axios from 'axios';

interface Props {
  token: string;
  isEditing?: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
  };
  onSuccess: () => void;
}

export default function UserForm({ token, isEditing = false, user, onSuccess }: Props) {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'user'>(user?.role || 'user');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (isEditing && user) {
        await axios.patch(`http://localhost:3000/users/${user.id}`, {
          name,
          email,
          role,
          ...(password && { password }),
        }, config);
      } else {
        await axios.post('http://localhost:3000/auth/register', {
          name,
          email,
          password,
          role,
        }, config);
      }

      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao salvar usuário');
    }
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Label>Nome:</Label>
      <Input value={name} onChange={(e) => setName(e.target.value)} required />

      <Label>Email:</Label>
      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <Label>Senha:</Label>
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={isEditing ? 'Deixe em branco para manter' : ''}
        required={!isEditing}
      />

      <Label>Papel:</Label>
      <select value={role} onChange={(e) => setRole(e.target.value as 'admin' | 'user')}>
        <option value="user">Usuário</option>
        <option value="admin">Administrador</option>
      </select>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Button type="submit">{isEditing ? 'Atualizar' : 'Cadastrar'}</Button>
    </Container>
  );
}