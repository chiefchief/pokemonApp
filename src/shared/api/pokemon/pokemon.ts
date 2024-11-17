import {baseAxios} from '../base';
import {getRandomPokemonId, mapResponseToPokemonItem} from './helpers';
import {PokemonItem, PokemonLimitResponse, RandomPokemonResponse} from './types';

export const pokemon = {
  getRandomPokemon: async function (): Promise<PokemonItem> {
    try {
      const {count} = await this.getPokemonLimit();
      if (count > 0) {
        const randomId = getRandomPokemonId(count);
        const {data} = await baseAxios.get<RandomPokemonResponse>(`pokemon/${randomId}`);
        return mapResponseToPokemonItem(data);
      }
      throw new Error('No pokemons in the list');
    } catch (error) {
      throw error;
    }
  },
  getPokemonLimit: async (): Promise<PokemonLimitResponse> => {
    try {
      const {data} = await baseAxios.get<PokemonLimitResponse>('pokemon');
      return data;
    } catch (error) {
      throw error;
    }
  },
};
