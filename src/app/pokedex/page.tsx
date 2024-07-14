"use client";

import { useEffect, useState } from "react";
import PokemonCard from "@/components/pokemon-card";
import { getAllPokemons } from "../api/pokemon";
import { formatPokemonId } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface Type {
  name: string;
}

interface PokemonType {
  type: Type;
}

interface Pokemon {
  name: string;
  id: number;
  types: PokemonType[];
}

export default function Page() {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllPokemons();
      setPokemonData(data);
    };

    fetchData();
  }, []);

  const filteredPokemon = pokemonData.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="md:px-24">
      <div className="flex justify-center ">
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search Pokemon"
        />
      </div>
      <div className="flex items-center justify-center flex-wrap gap-x-8 p-4 sm:p-8">
        {filteredPokemon.map((pokemon, index) => (
          <PokemonCard
            key={index}
            pokemon={{
              id: formatPokemonId(pokemon.id),
              name: pokemon.name,
              types: pokemon.types,
            }}
          />
        ))}
      </div>
    </section>
  );
}
