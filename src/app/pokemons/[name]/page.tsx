"use client";

import { useEffect, useState } from "react";
import PokemonCard from "@/components/pokemon-card";
import { getPokemon } from "../../api/pokemon";

interface Pokemon {
  name: string;
  id: number;
}

export default function Page({ params }: { params: { name: string } }) {
  const [pokemon, setPokemon] = useState<Pokemon>({});

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
      <div className="flex items-center justify-center flex-wrap gap-x-8 p-4 sm:p-8">
        <h2 className="text-4xl md:text-xl">{pokemon.name}</h2>
        <h2 className="text-4xl md:text-xl">{pokemon.id}</h2>
        {/* Display other Pokemon details here */}
      </div>
    </section>
  );
}
