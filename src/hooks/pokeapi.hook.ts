import { useEffect, useState } from "react";
import { ResponsePokemons, PokemonResult, Pokemon } from "@/types/pokeapi.type";
import {
  getAllPokemons,
  getPokemoById,
  getPokemon,
  getPokemonByName,
} from "@/services/pokeapi.service";

type ReturnPokemons = {
  data: ResponsePokemons<Pokemon[]>;
  loading: boolean;
  error: Error | null;
  changePage: (i: string) => void;
  searchById: (i: number) => void;
  searchByName: (i: string) => void;
  filterByWeight: (i: number) => void;
  filterByHeight: (i: number) => void;
};
export const usePokemons = (): ReturnPokemons => {
  const [data, setData] = useState<ResponsePokemons<Pokemon[]>>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [results, setResults] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadPokemons();
  }, []);

  const loadPokemons = async (): Promise<void> => {
    try {
      setLoading(true);
      const response: ResponsePokemons<PokemonResult[]> =
        await getAllPokemons();
      const results: Pokemon[] = [];
      for await (let item of response.results) {
        const pokemon: Pokemon = await getPokemon(item.url);
        results.push(pokemon);
      }
      setData({ ...response, results });
      setResults(results);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const changePage = async (page: string): Promise<void> => {
    try {
      setLoading(true);
      const response: ResponsePokemons<PokemonResult[]> = await getAllPokemons(
        page
      );
      const results: Pokemon[] = [];
      for await (let item of response.results) {
        const pokemon: Pokemon = await getPokemon(item.url);
        results.push(pokemon);
      }
      setData({ ...response, results });
      setResults(results);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const searchById = async (id: number): Promise<void> => {
    try {
      if (id === 0) {
        return loadPokemons();
      }
      setLoading(true);
      const response: Pokemon = await getPokemoById(id);
      setData({ ...data, results: [response] });
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const searchByName = async (name: string): Promise<void> => {
    try {
      if (name.length === 0) {
        return loadPokemons();
      }
      setLoading(true);
      const response: Pokemon | null = await getPokemonByName(name);
      if (!response) {
        return setData({ ...data, results: [] });
      }
      setData({ ...data, results: [response] });
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const filterByWeight = async (weight: number): Promise<void> => {
    if (weight === 0) {
      return loadPokemons();
    }
    const filterData: Pokemon[] = results.filter(
      (pokemon) => pokemon.weight <= weight && pokemon.weight >= 0
    );
    setData({ ...data, results: filterData });
  };

  const filterByHeight = async (height: number): Promise<void> => {
    if (height === 0) {
      return loadPokemons();
    }
    const filterData: Pokemon[] = results.filter(
      (pokemon) => pokemon.height <= height && pokemon.height >= 0
    );
    setData({ ...data, results: filterData });
  };

  return {
    data,
    loading,
    error,
    changePage,
    searchById,
    searchByName,
    filterByWeight,
    filterByHeight,
  };
};
