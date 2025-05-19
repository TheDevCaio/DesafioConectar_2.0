import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { NavbarContainer, LogoContainer, Title, Subtitle, NavArea, DesktopNav, NavButton, MenuIcon, MobileNav } from './styles';


export  const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsOpen(prev => !prev);
  };

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        iconRef.current &&
        !iconRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <NavbarContainer>
      <LogoContainer>
        <Title>Pudim</Title>
        <Subtitle>Pudim</Subtitle>
      </LogoContainer>

      <NavArea>
        <DesktopNav>
          <NavButton onClick={() => handleNavigate('/Login')}>Home</NavButton>
          <NavButton onClick={() => handleNavigate('/Register')}>Registrar</NavButton>
          <NavButton onClick={() => handleNavigate('/UserProfile')}>Perfil</NavButton>
                    <NavButton onClick={() => handleNavigate('/List')}>Listar</NavButton>
        </DesktopNav>

        <MenuIcon onClick={toggleMobileMenu} ref={iconRef}>☰</MenuIcon>

        <MobileNav isOpen={isOpen} ref={menuRef}>
          <NavButton onClick={() => handleNavigate('/Login')}>Home</NavButton>
          <NavButton onClick={() => handleNavigate('/Register')}>Listar Veículos</NavButton>
          <NavButton onClick={() => handleNavigate('/UserProfile')}>Salvar Veículos</NavButton>
                    <NavButton onClick={() => handleNavigate('/List')}>Listar Veículos</NavButton>
        </MobileNav>
      </NavArea>
    </NavbarContainer>
  );
};
