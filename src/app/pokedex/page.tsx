"use client";

import { useEffect, useState } from "react";
import PokemonCard from "@/components/pokemon-card";
import { getPokemon } from "@/app/api/pokemon";

export default function Page() {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemon("bulbasaur");
      setPokemonData(data);
    };

    fetchData();
  }, []);

  return (
    <section className="md:px-24">
      <div className="flex flex-col gap-4 p-4 sm:p-8">
        <p className="text-sm sm:text-lg max-w-full "></p>
        {pokemonData && <PokemonCard pokemon={pokemonData} />}
      </div>
    </section>
  );
}
