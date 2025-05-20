import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --primary: #d88c51; 
    --secondary: #fff1e5;
    --accent: #a35a2a;
    --text-dark: #3e2f1c;
    --text-light: #ffffff;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
      margin: 0;
  padding: 0;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: var(--secondary);
    color: var(--text-dark);
  }

  main {
    flex: 1;
    padding: 1rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`;



export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
background: #f5e5d0;
min-height: 100vh;


margin-left: -1.6vw;
`;

export type User = {
  id: string;
  name: string;
  email: string;
  role?: 'admin' | 'user';
};