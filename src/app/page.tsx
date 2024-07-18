"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {

  return (
    <div className="flex justify-center p-4 md:p-8">
      <div className="flex flex-col items-center gap-8 md:flex-row md:gap-8 md:p-8">
        <div className="flex flex-col gap-8 md:items-center">
          <h1 className="text-4xl font-bold md:text-6xl">
            Explore the beauty of each Pokemon
          </h1>
          <p className="max-w-full text-base font-light leading-7 md:max-w-xl md:text-2xl">
            Gotta catch &apos;em all!
          </p>
          <Button size={"lg"}>
            <Link href="/pokedex" className="text-base">
              Go to Pokedex
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
