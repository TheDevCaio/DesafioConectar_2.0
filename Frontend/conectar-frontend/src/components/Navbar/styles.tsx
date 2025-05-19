import styled from 'styled-components';



export const NavbarContainer = styled.nav`
  width: 100%;
  background:rgb(228, 214, 154);
  color: #FFFFFF;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  position: sticky;
  margin-top: -1.2vh;
  left: 0;
  z-index: 1000;
  flex-wrap: wrap;
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Title = styled.span`
  font-family: 'Segoe UI', sans-serif;
  font-size: 1.5rem;
  margin-left:  1vw;
  font-weight: 700;
`;

export const Subtitle = styled.span`
  font-family: 'Segoe UI', sans-serif;
  font-size: 0.9rem;
    margin-left:  1vw;
  font-weight: 300;
  margin-top: -4px;
`;

export const NavArea = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const DesktopNav = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 746px) {
    display: none;
  }
`;

export const MobileNav = styled.div<{ isOpen: boolean }>`
 
  position: absolute;
  top: 55px;
  right: 0rem;
  background: #1A73E8;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  gap: 1rem;

  padding: 1rem;
  z-index: 999;

  @media (min-width: 746px) {
    display: none;
  }
`;

export const MenuIcon = styled.div`
  font-size: 2rem;
  cursor: pointer;
  display: block;

  @media (min-width: 746px) {
    display: none;
  }
`;

export const NavButton = styled.button`
  font-weight: bold;
  background: none;
  border: none;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  margin-left: -5%;
  &:hover {
    color: grey;
  }
`;