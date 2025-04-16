"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {

  return (
    <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-8 md:gap-12 min-h-[calc(100vh-200px)]">
      <div className="flex-shrink-0">
        <Image
          src="/arceus-transparent.png"
          alt="Pokemon illustration"
          width={300}
          height={300}
          className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80"
          priority
        />
      </div>
      <div className="flex flex-col items-center md:items-start gap-4 md:gap-6 max-w-xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Explore the World of Pokémon
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed">
          Discover details, stats, and more. Gotta catch &apos;em all!
        </p>
        <Button size="lg" className="mt-4">
          <Link href="/pokedex" className="text-lg">
            Go to Pokédex
          </Link>
        </Button>
      </div>
    </div>
  );
}
