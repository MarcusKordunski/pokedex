let baseUrl = `https://pokeapi.co/api/v2/`
let pokemonUrl = `${baseUrl}pokemon?limit=20&offset=0`
let pokemonSpeciesUrl = `${baseUrl}pokemon-species/`


async function getAllPokemons() {
  const response = await fetch(`${pokemonUrl}`, {
    method: 'GET',
  })
  return response.json()
}

async function getPokemon(url) {
  const response = await fetch(`${url}`, {
    method: 'GET',
  })
  return response.json()
}

async function renderPokemonInfo(url) {
  let data = await getPokemon(url);
  let pokedex = document.querySelector('.pokemon')
  pokedex.innerHTML = ''

  let pokemonInfo = `
    <h2>${data.name}</h2>
    <img src='${data.sprites.front_default}' alt='' width='100'>
  `
  pokedex.innerHTML = pokemonInfo
}

async function renderPokemonsList() {
  let data = await getAllPokemons();
  let pokemonsList = data.results;
  for (let i = 0; i < pokemonsList.length; i++) {
    let pokemon = document.createElement('div')
    pokemon.classList.add('.pokemons-list__item')
    pokemon.innerHTML = `${pokemonsList[i].name}`
    document.querySelector('.pokemons-list').appendChild(pokemon)
    pokemon.addEventListener('click', () => { renderPokemonInfo(pokemonsList[i].url) })
  }
}

renderPokemonsList()


