import Image from "next/image";
import { Pokemon, PokemonTypeSlot } from "@/app/types/pokemonTypes";
import {
  capitalize,
  getTypeColor,
  getWeaknesses,
  formatPokemonId,
} from "@/lib/utils";

interface PokemonDetailsProps {
  pokemon: Pokemon;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ pokemon }) => {
  const formattedId = formatPokemonId(pokemon.id);
  const imageUrl = pokemon.sprite ?? `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formattedId}.png`;

  const typeNames = pokemon.types.map((typeSlot: PokemonTypeSlot) => typeSlot.type.name);
  const weaknesses = getWeaknesses(typeNames);

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-4 md:gap-10 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-xl p-4 md:p-8 border border-gray-600 shadow-xl text-white w-full max-w-4xl mx-auto">
      <div className="flex flex-col justify-center items-center gap-3 flex-shrink-0 w-full md:w-auto">
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gray-600 rounded-lg p-2 border border-gray-500 shadow-inner">
          <Image 
            src={imageUrl} 
            alt={pokemon.name} 
            fill 
            style={{ objectFit: 'contain' }} 
            sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, 256px"
            priority
           />
        </div>
        <div className="flex flex-wrap justify-center gap-x-3 items-baseline">
          <span className="text-lg sm:text-xl font-bold text-gray-400">#{formattedId}</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400">{capitalize(pokemon.name)}</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
          {pokemon.types.map((typeSlot: PokemonTypeSlot, index: number) => (
            <span
              key={index}
              className={`${getTypeColor(
                typeSlot.type.name
              )} py-1 px-2.5 md:px-3 rounded-full text-white text-xs sm:text-sm font-semibold shadow`}
            >
              {capitalize(typeSlot.type.name)}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full md:max-w-md">
        <h3 className="text-xl sm:text-2xl font-semibold mb-2 border-b border-gray-600 pb-1 text-cyan-300">Base Stats</h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-base sm:text-lg">
            <StatItem label="HP" value={pokemon.hp} color="text-green-400" />
            <StatItem label="Attack" value={pokemon.attack} color="text-red-400" />
            <StatItem label="Defense" value={pokemon.defense} color="text-blue-400" />
            <StatItem label="Sp. Atk" value={pokemon.specialAttack} color="text-purple-400" />
            <StatItem label="Sp. Def" value={pokemon.specialDefense} color="text-yellow-400" />
            <StatItem label="Speed" value={pokemon.speed} color="text-pink-400" />
        </div>

        <h3 className="text-xl sm:text-2xl font-semibold mt-3 sm:mt-4 mb-2 border-b border-gray-600 pb-1 text-cyan-300">Details</h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-base sm:text-lg">
            <DetailItem label="Height" value={`${pokemon.height / 10} m`} /> 
            <DetailItem label="Weight" value={`${pokemon.weight / 10} kg`} /> 
        </div>

        <h3 className="text-xl sm:text-2xl font-semibold mt-3 sm:mt-4 mb-2 border-b border-gray-600 pb-1 text-cyan-300">Weaknesses</h3>
        {weaknesses.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {weaknesses.map((weakness, index) => (
              <span
                key={index}
                className={`text-white text-xs sm:text-sm py-1 px-2.5 md:px-3 rounded-full shadow ${getTypeColor(weakness)}`}
              >
                {capitalize(weakness)}
              </span>
            ))}
          </div>
        ) : (
            <p className="text-gray-400 italic text-sm sm:text-base">None</p>
        )}
      </div>
    </div>
  );
};

const StatItem = ({ label, value, color }: { label: string, value: number, color: string }) => (
    <div className="flex justify-between text-sm sm:text-base md:text-lg">
        <span className={`font-medium ${color}`}>{label}</span>
        <span className="font-bold">{value}</span>
    </div>
);

const DetailItem = ({ label, value }: { label: string, value: string | number }) => (
    <div className="flex justify-between text-sm sm:text-base md:text-lg">
        <span className="font-medium text-gray-300">{label}</span>
        <span className="font-bold">{value}</span>
    </div>
);

export default PokemonDetails;
