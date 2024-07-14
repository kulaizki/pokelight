import axios from 'axios';

export const getPokemon = async (name: string) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return response.data;
};

export const getAllPokemons = async (limit = 52, offset = 0) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  
  const pokemons = response.data.results.map(async (pokemon, index) => {
    const pokemonResponse = await axios.get(pokemon.url);
    const pokemonData = pokemonResponse.data;

    return {
      id: index + 1,
      name: pokemon.name,
      types: pokemonData.types,
    };
  });

  return Promise.all(pokemons);
};