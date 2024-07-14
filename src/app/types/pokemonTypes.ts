export interface Type {
  name: string;
}

export interface PokemonType {
  type: Type;
}

export interface Pokemon {
  name: string;
  id: number;
  types: PokemonType[];
  height: number;
  weight: number;
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface PokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: any[]; 
  stats: Stat[];
}
