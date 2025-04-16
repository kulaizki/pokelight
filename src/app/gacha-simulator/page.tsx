"use client";

import { useState, useEffect } from "react";
import { getRandomPokemons } from "@/app/api/pokemon";
import PokemonCard from "@/components/pokemon-card";
import { Button } from "@/components/ui/button";
import { Pokemon } from "@/app/types/pokemonTypes";
import Image from "next/image"; 

export default function GachaSimulator() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRandomPokemons = () => {
    setLoading(true);
    getRandomPokemons(8)
      .then((randomPokemonsData) => {
        setPokemons(randomPokemonsData);
      })
      .catch((error) => {
        console.error("Failed to fetch random Pokémon:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRandomPokemons();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Pokémon Gacha Simulator
      </h1>
      <div className="text-center mb-8">
        <Button onClick={fetchRandomPokemons} disabled={loading}>
          {"Reroll Pokémons"}
        </Button>
      </div>

      {loading ? (
        <div className="col-span-full flex items-center justify-center">
          <Image
            src="/pokeball.png"
            alt="Loading..."
            width={100}
            height={100}
            className="animate-spin"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
}
