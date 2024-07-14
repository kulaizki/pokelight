"use client";

import { useEffect, useState } from "react";
import PokemonCard from "@/components/pokemon-card";
import { getTenPokemons } from "../api/pokemon";
import { formatPokemonId } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SortFilter } from "@/components/sort-filter";

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
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [sortOrder, setSortOrder] = useState<"name" | "id">("id");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTenPokemons(limit);
      setPokemonData(data);
    };

    fetchData();
  }, [limit]);

  const filteredPokemon = pokemonData
    .filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, limit);

  const sortedPokemon = [...filteredPokemon].sort((a, b) => {
    if (sortOrder === "name") {
      return a.name.localeCompare(b.name);
    } else {
      return a.id - b.id;
    }
  });

  return (
    <section className="md:px-24">
      <div className="flex justify-center items-center gap-2">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Pokemon"
        />
        <SortFilter value={sortOrder} onChange={setSortOrder} />
      </div>
      <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-16 p-4 sm:p-8">
        {sortedPokemon.length > 0 ? (
          sortedPokemon.map((pokemon, index) => (
            <PokemonCard
              key={index}
              pokemon={{
                id: formatPokemonId(pokemon.id),
                name: pokemon.name,
                types: pokemon.types,
              }}
            />
          ))
        ) : (
          <div className="w-full h-64 flex items-center justify-center">
            <h1 className="text-4xl md:text-6xl">No Pokemon found!</h1>
          </div>
        )}
      </div>
      {sortedPokemon.length > 0 && search === "" && (
        <div className="flex justify-center mt-4">
          <Button
            onClick={() => setLimit(limit + 10)}
            className={"mb-8 bg-blue-600 text-white hover:bg-blue-800"}
          >
            Load More
          </Button>
        </div>
      )}
    </section>
  );
}
