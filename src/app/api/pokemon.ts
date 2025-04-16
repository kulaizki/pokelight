import axios from 'axios';
import {
  Pokemon,
  PokemonApiResponse,
  PokemonListResponse,
  PokemonListItem,
  PokemonStat,
  PokemonTypeSlot,
} from '../types/pokemonTypes';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

// Helper function to extract ID from URL
const extractIdFromUrl = (url: string): number => {
    const parts = url.split('/').filter(part => part !== '');
    return parseInt(parts[parts.length - 1], 10);
};


// Helper function to map API response to our internal Pokemon type
const mapApiResponseToPokemon = (apiData: PokemonApiResponse): Pokemon => {
  const statsMap = apiData.stats.reduce((acc: Record<string, number>, item: PokemonStat) => {
    acc[item.stat.name] = item.base_stat;
    return acc;
  }, {});

  return {
    id: apiData.id,
    name: apiData.name,
    types: apiData.types,
    height: apiData.height,
    weight: apiData.weight,
    hp: statsMap['hp'] ?? 0,
    attack: statsMap['attack'] ?? 0,
    defense: statsMap['defense'] ?? 0,
    specialAttack: statsMap['special-attack'] ?? 0,
    specialDefense: statsMap['special-defense'] ?? 0,
    speed: statsMap['speed'] ?? 0,
    sprite: apiData.sprites.front_default,
  };
};


export const getPokemon = async (nameOrId: string | number): Promise<Pokemon> => {
  const res = await api.get<PokemonApiResponse>(`/pokemon/${nameOrId}`);
  return mapApiResponseToPokemon(res.data); // Map to internal type
};

// Renamed from getPokemonById and now returns the full Pokemon object
export const getPokemonById = async (id: number): Promise<Pokemon> => {
    return getPokemon(id); // Reuse getPokemon
};


export const getPokemonList = async (limit: number = 20, offset: number = 0): Promise<PokemonListResponse> => {
    const res = await api.get<PokemonListResponse>(`/pokemon?limit=${limit}&offset=${offset}`);
    return res.data;
};


// Fetches details for a list of pokemon items
export const getPokemonDetailsList = async (pokemonList: PokemonListItem[]): Promise<Pokemon[]> => {
    const detailPromises = pokemonList.map(p => getPokemon(p.name));
    return Promise.all(detailPromises);
};


// Example combining list and details - fetches list then details
export const getPokemonsWithDetails = async (limit: number = 10, offset: number = 0): Promise<Pokemon[]> => {
  const listResponse = await getPokemonList(limit, offset);
  const pokemons = await getPokemonDetailsList(listResponse.results);
  return pokemons;
};


export const getRandomPokemons = async (count: number = 8): Promise<Pokemon[]> => {
  // Fetching random IDs between 1 and 1025 (current approximate max Pokemon ID)
  const maxPokemonId = 1025;
  const randomIds = Array.from({ length: count }, () => Math.floor(Math.random() * maxPokemonId) + 1);
  // Fetch details directly using the random IDs
  const pokemonPromises = randomIds.map(id => getPokemon(id));
  const results = await Promise.allSettled(pokemonPromises);
  const successfulPokemons = results
      .filter((result): result is PromiseFulfilledResult<Pokemon> => result.status === 'fulfilled')
      .map(result => result.value);
  return successfulPokemons;
};
