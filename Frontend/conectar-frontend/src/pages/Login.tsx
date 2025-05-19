import React from 'react';
import { LoginForm } from '../components/LoginForm';
import { Footer } from '@/components/Footer';
import { Container } from '@/components/GlobalStyles';
import { Navbar } from '@/components/Navbar';

const Login: React.FC = () => {
  return (
    <Container> 
    <Navbar/>  
    <LoginForm/>
    <Footer/>
    </Container>
  )
};

export default Login;