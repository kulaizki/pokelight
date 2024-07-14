"use client";

import { useEffect, useState } from "react";
import PokemonCard from "@/components/pokemon-card";
import { getAllPokemons } from "../api/pokemon";

interface Pokemon {
  name: string;
  id: number;
}

export default function Page() {

  return (
    <section className="md:px-24">
      <div className="flex items-center justify-center flex-wrap gap-x-8 p-4 sm:p-8">

      </div>
    </section>
  );
}