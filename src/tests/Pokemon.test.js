import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const normal = screen.getByRole('button', { name: /normal/i });
    userEvent.click(normal);
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const img = screen.getByAltText(/snorlax sprite/i);
    const url = 'https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png';

    expect(name).toHaveTextContent('Snorlax');
    expect(type).toHaveTextContent('Normal');
    expect(weight).toHaveTextContent('Average weight: 460.0 kg');
    expect(img).toBeDefined();
    expect(img.src).toBe(url);
  });

  test('Se a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido', () => {
    const { history } = renderWithRouter(<App />);
    const normal = screen.getByRole('button', { name: /normal/i });
    userEvent.click(normal);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    expect(history.location.pathname).toBe('/pokemons/143');
    expect(linkDetails.href).toBe('http://localhost/pokemons/143');
  });

  test('Se redireciona para a página de detalhes de Pokémon', () => {
    renderWithRouter(<App />);
    const normal = screen.getByRole('button', { name: /normal/i });
    userEvent.click(normal);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    const headingPokemon = screen.getByRole('heading', { name: /snorlax details/i });
    expect(headingPokemon).toBeInTheDocument();
  });

  test('a URL exibida no navegador muda para /pokemon/<id>', () => {
    renderWithRouter(<App />);
    const normal = screen.getByRole('button', { name: /normal/i });
    userEvent.click(normal);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    expect(linkDetails.href).toBe('http://localhost/pokemons/143');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const normal = screen.getByRole('button', { name: /normal/i });
    userEvent.click(normal);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    const checkFavorite = screen.getByLabelText(/pokémon favoritado/i);
    userEvent.click(checkFavorite);

    const favorite = screen.getByAltText(/is marked as favorite/i);
    const src = 'http://localhost/star-icon.svg';
    expect(favorite.src).toBe(src);
  });
});
