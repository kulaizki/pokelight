import Image from "next/image";
import Link from "next/link";
import { Type, PokemonType, Pokemon } from "@/app/types/pokemonTypes";
import {
  capitalize,
  getTypeColor,
  formatPokemonId,
  getWeaknesses,
} from "@/lib/utils";

const PokemonDetails: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const id = String(pokemon.id).padStart(3, "0");
  const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;

  return (
    <div className="flex items-start justify-center gap-4 bg-gradient-to-r from-slate-800 to-slate-950 rounded-lg p-8 border-2 shadow-lg">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="flex justify-center items-center mx-auto bg-gradient-to-r from-white via-blue-500 to-purple-700 text-white rounded-lg p-4 gap-4 border-2 border-white">
          <Image src={imageUrl} alt={pokemon.name} width={280} height={280} />
        </div>
        <div className="flex gap-2 items-center">
          <h2 className="text-4xl md:text-xl text-yellow-500">#{id}</h2>
          <h2 className="text-4xl md:text-2xl">{capitalize(pokemon.name)}</h2>
        </div>
        <div className="flex gap-2">
          {pokemon.types &&
            pokemon.types.map((typeObj, index) => (
              <p
                key={index}
                className={`${getTypeColor(
                  typeObj.type.name
                )} py-1 px-2 rounded-lg text-white text-sm`}
              >
                {typeObj.type.name}
              </p>
            ))}
        </div>
      </div>
      <div className="flex flex-col justify-center gap-2">
        <h2 className="text-4xl md:text-2xl">
          <span className="text-blue-500 font-semibold">HP</span>{" "}
          <span className="text-white">{pokemon.hp}</span>
        </h2>
        <h2 className="text-4xl md:text-2xl">
          <span className="text-red-500 font-semibold">Attack</span>{" "}
          <span className="text-white">{pokemon.attack}</span>
        </h2>
        <h2 className="text-4xl md:text-2xl">
          <span className="text-yellow-500 font-semibold">Defense</span>{" "}
          <span className="text-white">{pokemon.defense}</span>
        </h2>
        <h2 className="text-4xl md:text-2xl">
          <span className="text-orange-500 font-semibold">Special-Attack</span>{" "}
          <span className="text-white">{pokemon.specialAttack}</span>
        </h2>
        <h2 className="text-4xl md:text-2xl">
          <span className="text-green-500 font-semibold">Special-Defense</span>{" "}
          <span className="text-white">{pokemon.specialDefense}</span>
        </h2>
        <h2 className="text-4xl md:text-2xl">
          <span className="text-pink-500 font-semibold">Speed</span>{" "}
          <span className="text-white">{pokemon.speed}</span>
        </h2>
        <h2 className="text-4xl md:text-2xl">
          <span className="text-purple-500 font-semibold">Weight</span>{" "}
          <span className="text-white text-1">{pokemon.weight / 10} kg</span>
        </h2>
        <div className="flex gap-2">
          <h2 className="text-4xl md:text-2xl text-rose-500 font-semibold">
            Weakness{" "}
          </h2>
          {pokemon.types && (
            <div className="flex flex-wrap gap-2">
              {getWeaknesses(
                pokemon.types.map((typeObj) => typeObj.type.name)
              ).map((weakness, index) => (
                <span
                  key={index}
                  className={`text-white text-sm py-1 px-2 rounded-lg ${getTypeColor(
                    weakness
                  )}`}
                >
                  {weakness}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
