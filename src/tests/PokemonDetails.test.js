import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Se as informações detalhadas do Pokémon são mostradas na tela', () => {
    renderWithRouter(<App />);
    const normal = screen.getByRole('button', { name: /normal/i });
    userEvent.click(normal);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    const headingPokemon = screen.getByRole('heading', { name: /snorlax details/i });
    expect(headingPokemon).toBeInTheDocument();
    expect(linkDetails).not.toBeInTheDocument();
    const sumary = screen.getByRole('heading', { level: 2, name: /summary/i });
    expect(sumary).toBeInTheDocument();
    const infos = screen.getByText(/What sounds like its cry/i);
    expect(infos).toBeDefined();
  });

  test('Se existe os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const normal = screen.getByRole('button', { name: /normal/i });
    userEvent.click(normal);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);

    const headingLocation = screen.getByRole('heading',
      { level: 2, name: /Game Locations of Snorlax/i });
    expect(headingLocation).toBeInTheDocument();

    const img = screen.getAllByAltText(/snorlax location/i);
    expect(img).toHaveLength(1);
    const url = 'https://cdn2.bulbagarden.net/upload/5/54/Kanto_Vermilion_City_Map.png';

    expect(img[0].src).toBe(url);

    const location = screen.getAllByText(/kanto/i);
    expect(location).toHaveLength(1);
  });

  test('Se pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const normal = screen.getByRole('button', { name: /normal/i });
    userEvent.click(normal);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);

    const checkFavorite = screen.getByLabelText(/pokémon favoritado/i);
    expect(checkFavorite).toBeInTheDocument();

    userEvent.click(checkFavorite);
    const favorite = screen.getByAltText(/is marked as favorite/i);
    expect(favorite).toBeInTheDocument();

    userEvent.click(checkFavorite);
    expect(favorite).not.toBeInTheDocument();
  });
});
