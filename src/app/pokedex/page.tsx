"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import PokemonCard from "@/components/pokemon-card";
import { getPokemonsWithDetails } from "../api/pokemon";
import { formatPokemonId } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SortFilter } from "@/components/sort-filter";
import { Pokemon } from "@/app/types/pokemonTypes";

export default function PokedexPage() {
  const [allPokemonData, setAllPokemonData] = useState<Pokemon[]>([]);
  const [filteredAndSortedPokemon, setFilteredAndSortedPokemon] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [sortOrder, setSortOrder] = useState<"id" | "name">("id");
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [initialLoadComplete, setInitialLoadComplete] = useState<boolean>(false);

  const fetchData = useCallback(async (currentOffset: number, currentLimit: number, isInitialLoad: boolean = false) => {
    if (loading || (!isInitialLoad && !hasMore)) return;

    setLoading(true);
    try {
      const data = await getPokemonsWithDetails(currentLimit, currentOffset);
      setAllPokemonData(prevData => currentOffset === 0 ? data : [...prevData, ...data]);
      setHasMore(data.length === currentLimit);
      if (isInitialLoad) {
        setInitialLoadComplete(true);
      }
    } catch (error) {
      console.error("Failed to fetch Pokemon data:", error);
      setHasMore(false);
      if (isInitialLoad) {
        setInitialLoadComplete(true);
      }
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    fetchData(0, limit, true);
  }, []);

  const loadMore = () => {
    if (!loading && hasMore) {
      const newOffset = offset + limit;
      setOffset(newOffset);
      fetchData(newOffset, limit);
    }
  };

  useEffect(() => {
    let processedData = [...allPokemonData];

    if (search) {
      processedData = processedData.filter((pokemon: Pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    processedData.sort((a, b) => {
      if (sortOrder === "name") {
        return a.name.localeCompare(b.name);
      } else {
        return (a.id ?? 0) - (b.id ?? 0);
      }
    });

    setFilteredAndSortedPokemon(processedData);
  }, [allPokemonData, search, sortOrder]);

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Pokédex</h1>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 px-4">
        <Input
          className="w-full md:w-80"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Pokémon by name..."
        />
        <SortFilter
          value={sortOrder}
          onChange={(value: string) => {
            if (value === "id" || value === "name") {
              setSortOrder(value);
            }
          }}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 min-h-[400px]">
        {!initialLoadComplete && loading ? (
            <div className="col-span-full flex items-center justify-center">
                 <Image
                   src="/pokeball.png"
                   alt="Loading..."
                   width={100}
                   height={100}
                   className="animate-spin"
                 />
            </div>
        ) : filteredAndSortedPokemon.length > 0 ? (
          filteredAndSortedPokemon.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} /> 
          ))
        ) : initialLoadComplete && !loading ? (
             <div className="col-span-full flex items-center justify-center">
                <p className="text-xl text-gray-500">No Pokémon match your criteria.</p>
             </div>
        ) : null}
        
        {initialLoadComplete && loading && (
             <div className="col-span-full flex items-center justify-center pt-6">
                <Image
                   src="/pokeball.png"
                   alt="Loading..."
                   width={60}
                   height={60}
                   className="animate-spin"
                 />
             </div>
        )}
      </div>
      
      {initialLoadComplete && hasMore && !search && (
        <div className="flex justify-center mt-12 mb-8">
          <Button
            onClick={loadMore}
            className="bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-800 hover:from-yellow-700 hover:via-yellow-600 hover:to-yellow-900 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 px-6 py-2 rounded-lg shadow"
            disabled={loading}
          >
            Load More 
          </Button>
        </div>
      )}
    </section>
  );
}
