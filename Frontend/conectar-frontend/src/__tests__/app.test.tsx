import React from 'react';
import { render } from '@testing-library/react';

function SimpleComponent() {
  return <h1>Testando componente simples</h1>;
}

describe('SimpleComponent', () => {
  it('deve renderizar sem erros', () => {
    const { container } = render(<SimpleComponent />);
    expect(container).toBeTruthy();  
  });
});