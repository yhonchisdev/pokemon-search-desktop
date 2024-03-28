import { Pokemon, Type } from "@/types/pokeapi.type";

type Props = {
  pokemon: Pokemon;
};
function PokemonCard({ pokemon }: Props): JSX.Element {
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-center justify-center w-full h-44 rounded-md bg-gray-100">
        <img
          className="w-full h-full object-contain"
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <div className="flex flex-row items-center justify-between space-x-3">
          <span className="text-xs text-black">#{pokemon.id}</span>
          <span className="text-xs text-black">
            EXP: {pokemon.base_experience}
          </span>
        </div>
        <div className="flex flex-col items-start space-y-0.5">
          <h4 className="text-base text-black capitalize">
            {pokemon.name} {pokemon.weight}
          </h4>
          <div className="flex flex-row flex-wrap gap-1">
            {pokemon.types.map((item: Type): JSX.Element => {
              return (
                <div
                  key={item.slot}
                  className="bg-gray-200 px-3 py-1 rounded-full"
                >
                  <span className="block text-xs text-black leading-3 capitalize">
                    {item.type.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
