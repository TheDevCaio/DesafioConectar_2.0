import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PudimPage from './pages/Pudim';
import Pudim from './components/Pudim';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { UserProfile } from './pages/UserProfile';
import { List } from './pages/List';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/users" element={<List />} />
        <Route path="/pudim" element={<Pudim />} />
      </Routes>
    </BrowserRouter>
  );
}
