import axios from 'axios';

export const getPokemon = async (name: string) => {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return res.data;
};

export const getTenPokemons = async (limit = 10, offset = 0) => {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  
  const pokemons = res.data.results.map(async (pokemon, index) => {
    const pokemonRes = await axios.get(pokemon.url);
    const pokemonData = pokemonRes.data;

    return {
      id: index + 1,
      name: pokemon.name,
      types: pokemonData.types,
    };
  });

  return Promise.all(pokemons);
};