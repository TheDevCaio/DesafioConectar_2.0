import styled from 'styled-components';

export const Container = styled.header`
  background-color: var(--primary);
  color: var(--text-light);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  h1 {
    font-size: 1.6rem;
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

export const NavLink = styled.a`
  color: var(--text-light);
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;