import { GetServerSideProps } from 'next';
import { getPokemon } from '../api/pokemon';

interface Pokemon {
  name: string;
  id: number;
  // Add other properties as needed
}

interface PokemonPageProps {
  pokemon: Pokemon;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params || typeof params.name !== 'string') {
    return { notFound: true };
  }

  const pokemon = await getPokemon(params.name);
  return { props: { pokemon } };
};

const PokemonPage: React.FC<PokemonPageProps> = ({ pokemon }) => {
  return (
    <div>
      <h1>{pokemon.name}</h1>
      <p>ID: {pokemon.id}</p>
    </div>
  );
};

export default PokemonPage;