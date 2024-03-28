import { ResponsePokemons, PokemonResult, Pokemon } from "@/types/pokeapi.type";

export const getAllPokemons = async (
  page?: string
): Promise<ResponsePokemons<PokemonResult[]>> => {
  try {
    const request: Response = await fetch(
      page || "https://pokeapi.co/api/v2/pokemon"
    );
    const response: ResponsePokemons<PokemonResult[]> = await request.json();
    return response;
  } catch (error) {
    throw error;
  }
};

export const getPokemon = async (urlPokemon: string): Promise<Pokemon> => {
  try {
    const request: Response = await fetch(urlPokemon);
    const response: Pokemon = await request.json();
    return response;
  } catch (error) {
    throw error;
  }
};

export const getPokemoById = async (id: number): Promise<Pokemon> => {
  try {
    const request: Response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${id}/`
    );
    const response: Pokemon = await request.json();
    return response;
  } catch (error) {
    throw error;
  }
};

export const getPokemonByName = async (
  name: string
): Promise<Pokemon | null> => {
  try {
    const request: Response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    );
    if (!request.ok) {
      return null;
    }
    const response: Pokemon = await request.json();
    return response;
  } catch (error) {
    throw error;
  }
};
