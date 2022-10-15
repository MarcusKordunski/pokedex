import renderTags from "./utilities.js"


let baseUrl = `https://pokeapi.co/api/v2/`
let pokemonsUrl = `${baseUrl}pokemon?limit=20&offset=0`
let pokemonSpeciesUrl = `${baseUrl}pokemon-species/`
let pokemonUrl = `${baseUrl}pokemon/`


async function getAllPokemons() {
  const response = await fetch(`${pokemonsUrl}`, {
    method: 'GET',
  })
  return response.json()
}

async function getPokemon(id) {
  const response = await fetch(`${pokemonUrl}${id}`, {
    method: 'GET',
  })
  return response.json()
}

async function getPokemonSpecies(id) {
  const response = await fetch(`${pokemonSpeciesUrl}${id}`, {
    method: 'GET',
  })
  return response.json()
}

async function renderPokemonInfo(id) {
  let data = await getPokemon(id);
  let species = await getPokemonSpecies(id)
  let pokedex = document.querySelector('.pokemon')
  pokedex.innerHTML = ''

  let aboutArr = species.flavor_text_entries.filter(item => item.language.name === 'en')

  let pokemonInfo = `
  <div class='pokemon__info'>
    <div class='header'>
      <h2 class="name">${data.name}</h2>
      ${renderTags(data.types)}
    </div>
    <div class="about-img">
      <img class="pokemon-img" src='${data.sprites.front_default}' alt=''>
      <p class="about">${aboutArr[0].flavor_text}</p>
    </div>
    <div class="hexagon">
      <div class="hp"></div>
      <div class="attack"></div>
      <div class="defense"></div>
      <div class="special-attack"></div>
      <div class="special-defense"></div>
      <div class="speed"></div> 
    </div>
  </div>
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
    let splitId = pokemonsList[i].url.split('/')
    let id = splitId[splitId.length - 2]
    document.querySelector('.pokemons-list').appendChild(pokemon)
    pokemon.addEventListener('click', () => { renderPokemonInfo(id) })
  }
}

renderPokemonsList()


