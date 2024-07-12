import Image from "next/image";
import Link from "next/link";

interface Pokemon {
  name: string;
  url: string;
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
      <div>
        <h2>{pokemon.name}</h2>
        <Image src={imageUrl} alt={pokemon.name} width={200} height={200} />
      </div>
    </Link>
  );
};

export default PokemonCard;
