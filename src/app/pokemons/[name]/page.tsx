"use client";

import { useEffect, useState } from "react";
import { getPokemon } from "../../api/pokemon";
import PokemonDetails from "@/components/pokemon-details";
import { formatPokemonId } from "@/lib/utils";

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

export default function Page({ params }: { params: { name: string } }) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      console.log("Fetching Pokemon with name:", params.name);
      const data = await getPokemon(params.name);
      console.log("Fetched Pokemon data:", data);
      setPokemon(data);
    };

    fetchPokemon();
  }, [params.name]);

  useEffect(() => {
    console.log("Pokemon state:", pokemon);
  }, [pokemon]);

  return (
    <section className="md:px-24">
      {pokemon && (
        <div className="flex items-center justify-center flex-wrap gap-x-8 p-4 sm:p-8">
          <PokemonDetails
            pokemon={{
              id: formatPokemonId(pokemon.id),
              name: pokemon.name,
              types: pokemon.types,
            }}
          />
        </div>
      )}
    </section>
  );
}