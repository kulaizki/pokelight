import axios from 'axios';

interface Pokemon {
  url: string;
  name: string;
}

interface PokemonData {
  types: any[]; // Replace `any` with the actual type of `types`
}

export const getPokemon = async (name: string): Promise<PokemonData> => {
  const res = await axios.get<PokemonData>(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return res.data;
};

export const getPokemonById = async (id: number): Promise<string> => {
  const res = await axios.get<PokemonData>(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return res.data.name;
};

export const getTenPokemons = async (limit: number = 10, offset: number = 0): Promise<PokemonData[]> => {
  const res = await axios.get<{ results: Pokemon[] }>(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  
  const pokemons = res.data.results.map(async (pokemon, index) => {
    const pokemonRes = await axios.get<PokemonData>(pokemon.url);
  
    return {
      id: index + 1,
      name: pokemon.name,
      types: pokemonRes.data.types,
    };
  });

  return Promise.all(pokemons);
};

export const getRandomPokemons = async (count: number = 8): Promise<PokemonData[]> => {
  const randomIds = Array.from({ length: count }, () => Math.floor(Math.random() * 1010) + 1);
  const pokemonNames = await Promise.all(randomIds.map(id => getPokemonById(id)));
  const pokemons = pokemonNames.map(name => getPokemon(name));
  return Promise.all(pokemons);
};