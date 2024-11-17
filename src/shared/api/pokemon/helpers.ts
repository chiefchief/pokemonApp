import {PokemonItem, RandomPokemonResponse} from './types';

export const mapResponseToPokemonItem = (response: RandomPokemonResponse): PokemonItem => {
  return {
    id: `${response.id}`,
    image: response.sprites.front_default,
    name: response.name,
  };
};

export const getRandomPokemonId = (maxId: number) => {
  const minId = 1;
  return Math.floor(Math.random() * (maxId - minId + 1)) + minId;
};
