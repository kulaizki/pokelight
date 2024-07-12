"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PokemonCard from "@/components/pokemon-card";
import { getPokemon } from "@/app/api/pokemon";
import { Button } from "@/components/ui/button";
import { link } from "fs";

export default function Home() {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemon("bulbasaur");
      setPokemonData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center p-4 md:p-8">
      <div className="flex flex-col items-center gap-8 md:flex-row md:gap-8 md:p-8">
        <div className="flex flex-col gap-8 md:items-center">
          <h1 className="text-4xl font-bold md:text-6xl">Explore the beauty of each Pokemon</h1>
          <p className="max-w-full text-base font-light leading-7 md:max-w-xl md:text-2xl">
            Gotta catch 'em all!
          </p>
          <Button size={'lg'}>
            <Link href="/pokedex" className="text-base">Go to Pokedex</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
