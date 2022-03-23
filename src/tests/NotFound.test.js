import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <NotFound.js />.', () => {
  test('Se página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const headingNotFound = screen.getByRole('heading',
      { level: 2, name: /page requested not found/i });
    expect(headingNotFound).toBeDefined();
  });

  test('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByAltText(/pikachu/i);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(img.src).toBe(url);
  });
});
