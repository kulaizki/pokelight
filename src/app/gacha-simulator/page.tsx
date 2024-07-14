"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PokemonCard from "@/components/pokemon-card";
import { getRandomPokemons } from "../api/pokemon";
import { Button } from "@/components/ui/button";
import { Pokemon } from "@/types/pokemonTypes"

export default function Page() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPokemons = () => {
    setLoading(true);
    getRandomPokemons(8).then((randomPokemons) => {
      setPokemons(randomPokemons);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <section className="md:px-24">
      <div className="flex items-center justify-center flex-wrap gap-8 p-4 sm:p-8">
        {loading ? (
          <div className="flex justify-center items-center">
            <Image
              src="/pokeball.png"
              alt="Loading..."
              width={400}
              height={400}
              className="animate-spin"
            />
          </div>
        ) : (
          <>
            {pokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
            <Button
              onClick={fetchPokemons}
              className={
                "mb-8 text-white transition duration-300 ease-in-out bg-gradient-to-r from-purple-700 via-pink-500 to-yellow-600 hover:opacity-80"
              }
            >
              Reroll
            </Button>
          </>
        )}
      </div>
    </section>
  );
}
