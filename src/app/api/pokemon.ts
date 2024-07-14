import axios from 'axios';

export const getPokemon = async (name: string) => {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return res.data;
};

export const getPokemonById = async (id: number) => {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return res.data.name;
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

export const getRandomPokemons = async (count = 8) => {
  const randomIds = Array.from({ length: count }, () => Math.floor(Math.random() * 1010) + 1);
  const pokemonNames = await Promise.all(randomIds.map(id => getPokemonById(id)));
  const pokemons = pokemonNames.map(name => getPokemon(name));
  return Promise.all(pokemons);
};