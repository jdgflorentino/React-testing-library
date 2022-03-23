import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />.', () => {
  test('mensagem No favorite pokemon found, se não tiver pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const message = screen.getByText(/no favorite pokemon found/i);
    expect(message).toBeDefined();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    const checkFavorite = screen.getByRole('checkbox');
    userEvent.click(checkFavorite);
    history.push('/favorites');
    const pokemon = screen.getByText(/pikachu/i);
    expect(pokemon).toBeDefined();
  });
});
