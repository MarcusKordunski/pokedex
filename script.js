import { renderTags, randomColor, percentOfStatbar } from "./utilities.js"


const baseUrl = `https://pokeapi.co/api/v2/`
const pokemonsUrl = `${baseUrl}pokemon?limit=900&offset=0`
const pokemonSpeciesUrl = `${baseUrl}pokemon-species/`
const pokemonUrl = `${baseUrl}pokemon/`

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
      <img class="pokemon-img" src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png' alt=''>
      <p class="about">${aboutArr[0].flavor_text}</p>
    </div>
    <div class="stats">
    <h2>Base Stats</h2>
    <p>HP</p>
    <div class="stat-bar">
      <div class="stat hp" style="background-color:${randomColor()};width:${percentOfStatbar(data.stats[0].base_stat)}%;">${data.stats[0].base_stat}</div>
    </div>
    
    <p>Attack</p>
    <div class="stat-bar">
      <div class="stat atk" style="background-color:${randomColor()};width:${percentOfStatbar(data.stats[1].base_stat)}%;">${data.stats[1].base_stat}</div>
    </div>
    
    <p>Defense</p>
    <div class="stat-bar">
      <div class="stat def" style="background-color:${randomColor()};width:${percentOfStatbar(data.stats[2].base_stat)}%;">${data.stats[2].base_stat}</div>
    </div>
    
    <p>Special Attack</p>
    <div class="stat-bar">
      <div class="stat sa" style="background-color:${randomColor()};width:${percentOfStatbar(data.stats[3].base_stat)}%;">${data.stats[3].base_stat}</div>
    </div>

    <p>Special Defense</p>
    <div class="stat-bar">
      <div class="stat sd" style="background-color:${randomColor()};width:${percentOfStatbar(data.stats[4].base_stat)}%;">${data.stats[4].base_stat}</div>
    </div>

    <p>Speed</p>
    <div class="stat-bar">
      <div class="stat speed" style="background-color:${randomColor()};width:${percentOfStatbar(data.stats[5].base_stat)}%;">${data.stats[5].base_stat}</div>
    </div>
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
    pokemon.innerHTML = `<div>${pokemonsList[i].name}</div><img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png' alt ='' width='60'>`
    let splitId = pokemonsList[i].url.split('/')
    let id = splitId[splitId.length - 2]
    document.querySelector('.pokemons-list').appendChild(pokemon)
    pokemon.addEventListener('click', () => { renderPokemonInfo(id) })
  }
}
renderPokemonsList()