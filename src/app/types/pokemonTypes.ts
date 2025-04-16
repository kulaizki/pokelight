export interface ApiResource {
  name: string;
  url: string;
}

export interface PokemonTypeSlot {
  slot: number;
  type: ApiResource; 
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: ApiResource; 
}

export interface PokemonSprites {
    front_default: string | null;
    
}

export interface PokemonApiResponse {
  id: number;
  name: string;
  height: number; 
  weight: number; 
  types: PokemonTypeSlot[];
  stats: PokemonStat[];
  sprites: PokemonSprites;
}


export interface PokemonListItem {
    name: string;
    url: string;
}

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
}



export interface Pokemon {
  id: number;
  name: string;
  types: PokemonTypeSlot[]; 
  height: number; 
  weight: number; 
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  sprite: string | null; 
}