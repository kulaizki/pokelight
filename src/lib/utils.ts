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
    ground: 'bg-yellow-800',
    electric: 'bg-yellow-500',
    fairy: 'bg-pink-400',
  };

  return typeColors[type] || 'bg-gray-500'; 
}
