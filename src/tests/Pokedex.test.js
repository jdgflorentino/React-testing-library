import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <Pokedex.js />', () => {
  test('Se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const headingPokedex = screen.getByRole('heading', { level: 2,
      name: /encountered pokémons/i,
    });
    expect(headingPokedex).toBeDefined();
  });

  test('Se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);
    const listPokemon = 8;
    const btnNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    for (let i = 0; i < listPokemon; i += 1) {
      userEvent.click(btnNext);
    }
    const last = screen.getByText(/dragonair/i);
    expect(last).toBeDefined();
    userEvent.click(btnNext);
    const first = screen.getByText(/pikachu/i);
    expect(first).toBeDefined();
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getAllByRole('link', { name: /more details/i });
    expect(linkDetails).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const SEVEN = 7;
    const btnFilter = screen.getAllByTestId(/pokemon-type-button/i);
    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnFilter).toBeDefined();
    expect(btnFilter).toHaveLength(SEVEN);
    const type = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    for (let i = 0; i < SEVEN; i += 1) {
      expect(btnFilter[i]).toHaveTextContent(type[i]);
      userEvent.click(btnFilter[i]);
      const pokemon = screen.getByTestId('pokemon-type');
      expect(pokemon).toHaveTextContent(type[i]);
      expect(btnAll).toBeEnabled();
    }
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: /all/i });
    const btnNext = screen.getByRole('button', { name: /próximo pokémon/i });
    const EIGHT = 8;
    userEvent.click(btnAll);
    screen.logTestingPlaygroundURL();

    for (let i = 0; i < EIGHT; i += 1) {
      expect(btnNext).toBeEnabled();
    }
  });
});
