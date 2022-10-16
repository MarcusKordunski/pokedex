import { renderTags, randomColor, percentOfStatbar } from "./utilities.js"
import { getAllPokemons, getPokemon, getPokemonEvolChain, getPokemonSpecies } from "./api.js"

async function renderPokemonInfo(id) {
  let pokedex = document.querySelector('.pokemon-page')
  pokedex.innerHTML = ''
  const loader = document.querySelector('.loader-pokemon')
  loader.classList.toggle('active')
  let data = await getPokemon(id);
  let species = await getPokemonSpecies(id)

  let aboutArr = species.flavor_text_entries.filter(item => item.language.name === 'en')

  let pokemonInfo = `
  <div class="menu">
    <div class="menu-btn menu-btn-1 active"><p>Info</p></div>
    <div class="menu-btn menu-btn-2"><p>Evolution</p></div>
    <div class="menu-btn menu-btn-3"><p>Abilities</p></div>
  </div>
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
    <div class="additional-info"><h2>Base Stats</h2><div><p>Height: ${data.height}</p><p>Weight: ${data.weight}</p></div></div>
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
  loader.classList.toggle('active')
  pokedex.innerHTML = pokemonInfo
  document.querySelector('.menu-btn-1').addEventListener('click', () => { renderPokemonInfo(id) })
  document.querySelector('.menu-btn-2').addEventListener('click', () => { renderPokemonEvolution(id) })
  document.querySelector('.menu-btn-3').addEventListener('click', () => { })
}

async function renderPokemonsList(search) {
  const loader = document.querySelector('.loader')
  loader.classList.toggle('active')
  document.querySelector('.pokemons-list__list').innerHTML = ''
  let data = await getAllPokemons();
  let pokemonsList = data.results;
  if (search) {
    pokemonsList = pokemonsList.filter(item => item.name.slice(0, search.length).toLowerCase().includes(search.toLowerCase()))
  }
  if (pokemonsList.length === 0) {
    let pokemon = document.createElement('div')
    pokemon.innerHTML = `<div>Sorry, no results matching this search</div>`
    document.querySelector('.pokemons-list__list').appendChild(pokemon)
  }
  for (let i = 0; i < pokemonsList.length; i++) {
    let splitId = pokemonsList[i].url.split('/')
    let id = splitId[splitId.length - 2]
    let pokemon = document.createElement('div')
    pokemon.classList.add('.pokemons-list__item')
    pokemon.innerHTML = `<div>${pokemonsList[i].name}</div><img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png' alt ='' width='60'>`
    document.querySelector('.pokemons-list__list').appendChild(pokemon)
    pokemon.addEventListener('click', () => { renderPokemonInfo(id) })
  }
  loader.classList.toggle('active')
}

function async renderPokemonEvolution(id) {
  let pokedex = document.querySelector('.pokemon__info')
  pokedex.innerHTML = ''
  const loader = document.querySelector('.loader-pokemon')
  loader.classList.toggle('active')
  let species = await getPokemonSpecies(id)
  let data = await getPokemonEvolChain(species.evolution_chain.url)
  let evolData = data.chain
  let pokemonEvol = `
  <div class='pokemon__evol'>
  Hi there!
  </div>
  `
  loader.classList.toggle('active')
  pokedex.innerHTML = pokemonEvol
  document.querySelector('.menu-btn-1').classList.remove('active')
  document.querySelector('.menu-btn-2').classList.add('active')
  document.querySelector('.menu-btn-3').classList.remove('active')
}

const search = document.querySelector('.search')
search.addEventListener('input', () => { renderPokemonsList(search.value) })
renderPokemonsList()