"use client";

import { useEffect, useState } from "react";
import { getPokemon } from "../../api/pokemon";
import PokemonDetails from "@/components/pokemon-details";
import { formatPokemonId } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pokemon } from "@/app/types/pokemonTypes";
import Image from "next/image";

export default function Page({ params }: Readonly<{ params: { name: string } }>) {
  const [pokemon, setPokemon] = useState<Pokemon| null>(null);
  const router = useRouter();

  const handleNext = () => {
    if (pokemon) {
      router.push(`/pokemons/${pokemon.id + 1}`);
    }
  };

  const handlePrevious = () => {
    if (pokemon && pokemon.id > 1) {
      router.push(`/pokemons/${pokemon.id - 1}`);
    }
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      const data = await getPokemon(params.name);
      setPokemon(data);
    };

    fetchPokemon();
  }, [params.name]);

  return (
    <section className="container mx-auto px-4 py-8">
      {pokemon ? (
        <div className="flex flex-col items-center justify-center flex-wrap gap-8">
          <PokemonDetails pokemon={pokemon} />
          <div className="flex gap-4 mt-4">
            <Button onClick={handlePrevious} disabled={!pokemon || pokemon.id <= 1}>Previous</Button>
            <Button onClick={handleNext} disabled={!pokemon}>Next</Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[400px]">
          <Image
            src="/pokeball.png"
            alt="Loading..."
            width={100}
            height={100}
            className="animate-spin"
          />
        </div>
      )}
    </section>
  );
}
