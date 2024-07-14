import Image from "next/image";
import Link from "next/link";
import { capitalize } from "@/lib/utils";

interface Pokemon {
  name: string;
  id: number;
}

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const id = String(pokemon.id).padStart(3, "0");
  const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;

  return (
    <Link href={`/pokemon/${pokemon.name}`}>
      <div className="flex flex-col justify-center items-center gap-4 mb-16">
        <div className="flex justify-center items-center mx-auto bg-gradient-to-r from-white via-blue-500 to-purple-700 text-white rounded-lg p-4 gap-4 border-2 border-white transition-all duration-300 ease-in-out hover:border-yellow-500 hover:yellow-lg">
          {" "}
          <Image src={imageUrl} alt={pokemon.name} width={200} height={200} />
        </div>
        <div className="flex gap-2 items-center">
          <h2 className="text-4xl md:text-xl text-purple-400">#{id}</h2>
          <h2 className="text-4xl md:text-2xl">{capitalize(pokemon.name)}</h2>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
