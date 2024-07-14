import axios from 'axios';

export const getPokemon = async (name: string) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return response.data;
};

export const getAllPokemons = async (limit = 50, offset = 0) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  return response.data.results;
};