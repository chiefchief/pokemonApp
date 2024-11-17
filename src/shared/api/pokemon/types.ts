export type PokemonLimitResponse = {
  count: number;
  next: string;
  previous: unknown;
  results: unknown[];
};

export type RandomPokemonResponse = {
  id: number;
  name: string;
  sprites: {
    back_default: string;
    back_female: unknown | null;
    back_shiny: string;
    back_shiny_female: unknown | null;
    front_default: string;
    front_female: unknown | null;
    front_shiny: string;
    front_shiny_female: unknown | null;
  };
};

export type PokemonItem = {
  id: string;
  name: string;
  image: string;
};
