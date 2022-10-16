
const baseUrl = `https://pokeapi.co/api/v2/`
const pokemonsUrl = `${baseUrl}pokemon?limit=900&offset=0`
const pokemonSpeciesUrl = `${baseUrl}pokemon-species/`
const pokemonUrl = `${baseUrl}pokemon/`

export async function getAllPokemons() {
  const response = await fetch(`${pokemonsUrl}`, {
    method: 'GET',
  })
  return response.json()
}

export async function getPokemon(id) {
  const response = await fetch(`${pokemonUrl}${id}`, {
    method: 'GET',
  })
  return response.json()
}

export async function getPokemonSpecies(id) {
  const response = await fetch(`${pokemonSpeciesUrl}${id}`, {
    method: 'GET',
  })
  return response.json()
}

export async function getPokemonEvolChain(url) {
  const response = await fetch(`${url}`, {
    method: 'GET',
  })
  return response.json()
}

export async function getPokemonAbility(url) {
  const response = await fetch(`${url}`, {
    method: 'GET',
  })
  return response.json()
}