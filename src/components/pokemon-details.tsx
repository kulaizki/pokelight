import Image from "next/image";
import Link from "next/link";
import { capitalize, getTypeColor, formatPokemonId } from "@/lib/utils";

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

const PokemonDetails: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const id = String(pokemon.id).padStart(3, "0");
  const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;
  console.log("Pokemon:", pokemon);

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="flex justify-center items-center mx-auto bg-gradient-to-r from-white via-blue-500 to-purple-700 text-white rounded-lg p-4 gap-4 border-2 border-white">
        {" "}
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
  );
};

export default PokemonDetails;
