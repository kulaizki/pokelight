"use client";

import { useEffect, useState } from "react";
import { getPokemon } from "../../api/pokemon";
import PokemonDetails from "@/components/pokemon-details";
import { formatPokemonId } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pokemon } from "@/app/types/pokemonTypes";

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
        <div className="flex flex-col items-center justify-center flex-wrap gap-8 p-4 sm:p-8">
          <PokemonDetails
            pokemon={{
              id: formatPokemonId(pokemon.id),
              name: pokemon.name,
              types: pokemon.types,
              height: pokemon.height,
              weight: pokemon.weight,
              hp: pokemon.stats[0].base_stat,
              attack: pokemon.stats[1].base_stat,
              defense: pokemon.stats[2].base_stat,
              specialAttack: pokemon.stats[3].base_stat,
              specialDefense: pokemon.stats[4].base_stat,
              speed: pokemon.stats[5].base_stat,
            }}
          />
          <div className="flex gap-4">
            <Button onClick={handlePrevious}>Previous</Button>
            <Button onClick={handleNext}>Next</Button>
          </div>
        </div>
      )}
    </section>
  );
}
