import axios from 'axios';

// /pokemon/ditto
const instance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  timeout: 10000,
});

export const baseAxios = instance;
