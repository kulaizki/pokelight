import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPokemonId(id: number): string {
  return String(id).padStart(3, "0");
}

export const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export function getTypeColor(type: string): string {
  const typeColors: { [key: string]: string } = {
    grass: 'bg-green-500',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    poison: 'bg-purple-500',
    flying: 'bg-indigo-500',
    bug: 'bg-lime-500',
    normal: 'bg-gray-400',
    ground: 'bg-yellow-700',
    electric: 'bg-yellow-500',
    fairy: 'bg-pink-400',
    fighting: 'bg-orange-500',
    psychic: 'bg-pink-500',
    rock: 'bg-yellow-900',
    ice: 'bg-blue-300',
    ghost: 'bg-purple-900',
    dragon: 'bg-indigo-700',
  };

  return typeColors[type] || 'bg-gray-500'; 
}

export function getWeaknesses(types: string[]): string[] {
  const weaknesses: { [key: string]: string[] } = {
    grass: ["fire", "ice", "poison", "flying", "bug"],
    fire: ["water", "rock", "ground"],
    water: ["electric", "grass"],
    poison: ["ground", "psychic"],
    flying: ["electric", "ice", "rock"],
    bug: ["fire", "flying", "rock"],
    normal: ["fighting"],
    ground: ["water", "grass", "ice"],
    electric: ["ground"],
    fairy: ["poison", "steel"],
    fighting: ["flying", "psychic", "fairy"],
    psychic: ["bug", "ghost", "dark"],
    rock: ["water", "grass", "fighting", "ground", "steel"],
    ice: ["fire", "fighting", "rock", "steel"],
    ghost: ["ghost", "dark"],
    dragon: ["ice", "dragon", "fairy"],
  };

  const allWeaknesses = types.map(type => weaknesses[type] || []);
  const uniqueWeaknesses = Array.from(new Set(allWeaknesses.flat()));
  return uniqueWeaknesses.filter(weakness => !types.includes(weakness));
}
