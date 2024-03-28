import logo from "@/assets/logo.png";
import { usePokemons } from "@/hooks/pokeapi.hook";
import { Pokemon } from "@/types/pokeapi.type";
import PokemonCard from "@/components/pokemon";
import SelectRange from "@/components/select-range";
import Select from "@/components/select";
import SearchInput from "./components/search-input";

function App(): JSX.Element {
  const {
    data,
    error,
    loading,
    changePage,
    searchById,
    searchByName,
    filterByWeight,
    filterByHeight,
  } = usePokemons();

  return (
    <div className="container mx-auto px-6">
      <img
        className="w-40 h-40 object-contain mx-auto"
        src={logo}
        alt="PokeApi"
      />
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col items-center justify-center space-y-3 bg-black px-5 py-4">
          <SearchInput onChange={searchByName} />
          <span className="text-sm text-white">
            Use this input to search for any pokemon. In an instant
          </span>
        </div>
        <div className="flex flex-row items-center justify-between flex-wrap gap-4">
          <SelectRange
            label="Filter by weight:"
            flag="weight"
            onChange={filterByWeight}
          />
          <SelectRange
            label="Filter by height:"
            flag="height"
            onChange={filterByHeight}
          />
          <Select count={data.count} onChange={searchById} />
        </div>
        {error && (
          <div className="w-8 h-8 rounded-full mx-auto border-4 border-gray-300 border-l-black border-t-black animate-spin" />
        )}
        {loading && (
          <div className="w-10 h-10 rounded-full border-2 border-white border-l-black border-t-black animate-spin" />
        )}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {data.results.length === 0 && (
            <span className="text-base text-black">Any results</span>
          )}
          {data.results.map((pokemon: Pokemon): JSX.Element => {
            return <PokemonCard key={pokemon.id} pokemon={pokemon} />;
          })}
        </div>
        <div className="flex flex-row items-center space-x-3 py-5">
          <span className="text-base text-black">{data.count} results</span>
          {data.previous && (
            <button
              onClick={() => changePage(data.previous!)}
              className="bg-black px-6 py-2 rounded-full duration-150 active:bg-black/70"
            >
              <span className="block text-base text-white leading-3">Prev</span>
            </button>
          )}
          {data.next && (
            <button
              onClick={() => changePage(data.next!)}
              className="bg-black px-6 py-2 rounded-full duration-150 active:bg-black/70"
            >
              <span className="block text-base text-white leading-3">Next</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
