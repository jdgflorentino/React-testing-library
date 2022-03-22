import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <App.js />', () => {
  test('Se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', {
      name: /home/i,
    });
    const linkAbout = screen.getByRole('link', {
      name: /about/i,
    });
    const linkFavorite = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(linkHome).toBeDefined();
    expect(linkAbout).toBeDefined();
    expect(linkFavorite).toBeDefined();
  });

  test('Se vai para página inicial, na URL / ao clicar em Home', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });

  test('Se vai para a pág About, na URL /about, ao clicar em About', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });

  test('Pokémons Favoritados, na URL /favorites, ao clicar em Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(linkFavorite);
    expect(history.location.pathname).toBe('/favorites');
  });
  test('Para a pág Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/wrongpath');
    const headingNotFound = screen.getByRole('heading',
      { name: /page requested not found/i });
    expect(headingNotFound).toBeDefined();
  });
});
