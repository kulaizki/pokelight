"use client";

import { useEffect, useState } from "react";
import PokemonCard from "@/components/pokemon-card";
import { getAllPokemons } from "../api/pokemon";

interface Pokemon {
  name: string;
  id: number;
}

export default function Page() {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllPokemons();
      setPokemonData(data);
    };

    fetchData();
  }, []);

  return (
    <section className="md:px-24">
      <div className="flex items-center justify-center flex-wrap gap-x-8 p-4 sm:p-8">
        {pokemonData.map((pokemon, index) => (
          <PokemonCard key={index} pokemon={{ name: pokemon.name, id: index + 1 }} />
        ))}
      </div>
    </section>
  );
}