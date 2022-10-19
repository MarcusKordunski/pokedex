import { renderTags, randomColor, percentOfStatbar, renderChain, setFavorite, renderPokemonsFightersList } from "./utilities.js"
import { getAllPokemons, getPokemon, getPokemonAbility, getPokemonEvolChain, getPokemonSpecies } from "./api.js"

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
    <div class="menu-btn menu-btn-4"><p>Fight</p></div>
  </div>
  <div class='pokemon__info'>
    <div class='header'>
      <h2 class="name">${data.name}</h2>
      ${renderTags(data.types)}
    </div>
    <div class="about-img">
      <img class="pokemon-img" src='${data.sprites.front_default}' alt=''>
      <p class="about">${aboutArr[0].flavor_text}</p>
    </div>
    <div class="stats">
    <div class="additional-info"><h2>Base Stats</h2> <div class="favorite"><img class="fav-btn" src="./images/pixel-star.jpg" alt="" width=30><p>Set as favorite</p></div> <div><p>Height: ${data.height}</p><p>Weight: ${data.weight}</p></div></div>
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
  let favBtn = document.querySelector('.fav-btn')
  if (localStorage.getItem(`pokemon${data.id}`) !== null) {
    favBtn.classList.add('active')
  }

  favBtn.addEventListener('click', () => {
    setFavorite(data.id)
  })

  document.querySelector('.menu-btn-1').addEventListener('click', () => { renderPokemonInfo(id) })
  document.querySelector('.menu-btn-2').addEventListener('click', () => { renderPokemonEvolution(id) })
  document.querySelector('.menu-btn-3').addEventListener('click', () => { renderPokemonAbilities(id) })
  document.querySelector('.menu-btn-4').addEventListener('click', () => { renderPokemonFight(id) })
}

export async function renderPokemonsList(search) {
  const loader = document.querySelector('.loader')
  loader.classList.toggle('active')
  document.querySelector('.pokemons-list__list').innerHTML = ''
  let favList = document.querySelector('.favorites-list')
  favList.innerHTML = ''

  let data = await getAllPokemons();
  let pokemonsList = data.results;

  if (localStorage.length === 0) {
    favList.innerHTML = '<p>No favorite pokémon</p>'
  }

  for (let i = 0; i < localStorage.length; i++) {
    let counter = 0
    let key = localStorage.key(i)
    let id = Number(localStorage.getItem(key))
    if (id !== null && key.includes('pokemon')) {
      counter += 1
      let pokemon = document.createElement('div')
      pokemon.classList.add('pokemons-list__item')
      pokemon.classList.add('fav-list-item')
      pokemon.innerHTML = `<div>${pokemonsList[id - 1].name}</div> <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png' alt ='' width='60'> <div><img src='./images/pixel-star.jpg' alt ='' width='20'>`
      favList.appendChild(pokemon)
      pokemon.addEventListener('click', () => { renderPokemonInfo(id) })
    } else if (i = localStorage.length - 1 && counter === 0) {
      favList.innerHTML = '<p>No favorite pokémon</p>'
    }
  }

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

async function renderPokemonEvolution(id) {
  let pokedex = document.querySelector('.pokemon__info')
  pokedex.innerHTML = ''
  const loader = document.querySelector('.loader-pokemon')
  loader.classList.toggle('active')
  let species = await getPokemonSpecies(id)
  let data = await getPokemonEvolChain(species.evolution_chain.url)
  let chain = data.chain
  let pokemonEvol = `
  <div class='pokemon__evol'>
    ${await renderChain(chain)}
  </div>
  `
  loader.classList.toggle('active')
  pokedex.innerHTML = pokemonEvol
  let chainItems = document.querySelectorAll('.chain-item')
  chainItems.forEach(item => {
    item.addEventListener('click', (event) => { renderPokemonInfo(event.target.alt) })
  })

  document.querySelector('.menu-btn-1').classList.remove('active')
  document.querySelector('.menu-btn-2').classList.add('active')
  document.querySelector('.menu-btn-3').classList.remove('active')
}

async function renderPokemonAbilities(id) {
  let pokedex = document.querySelector('.pokemon__info')
  pokedex.innerHTML = ''
  const loader = document.querySelector('.loader-pokemon')
  loader.classList.toggle('active')
  let data = await getPokemon(id)
  let abilsArr = []
  for (let i = 0; i < data.abilities.length; i++) {
    abilsArr.push(await getPokemonAbility(data.abilities[i].ability.url))
  }
  let html = ''
  for (let i = 0; i < abilsArr.length; i++) {
    let effectInfo = abilsArr[i].effect_entries.filter(item => item.language.name === 'en')
    html += `
    <tr>
      <th>${abilsArr[i].name}</th>
      <th>${effectInfo[0].effect}</th>
    </tr>`
  }
  let table = `
  <div class="abilities">
  <table class="ability-table">
    <tr>
      <th>Ability</th>
      <th>Description</th>
    </tr>
    ${html}
  </table>
  </div>
  `
  loader.classList.toggle('active')
  pokedex.innerHTML = table

  document.querySelector('.menu-btn-1').classList.remove('active')
  document.querySelector('.menu-btn-2').classList.remove('active')
  document.querySelector('.menu-btn-3').classList.add('active')
}

async function renderPokemonFight(id) {
  let pokedex = document.querySelector('.pokemon__info')
  pokedex.innerHTML = ''
  const loader = document.querySelector('.loader-pokemon')
  loader.classList.toggle('active')
  let data = await getPokemon(id)
  let fighters = {}
  fighters.f1 = data

  let html = `
  <div class="fight-menu">
    <div><img src="${data.sprites.front_default}" alt=""></div>
    <p>${data.name}</p>
    <p>Choose an opponent:</p>
    <h2 class="fav-title">Favorite pokémon:</h2>
    <div class="favorites-fight-list"></div>
    <div class="fight-list">
    </div>
  </div>
  `

  pokedex.innerHTML = html
  await renderPokemonsFightersList(fighters)
  loader.classList.toggle('active')

  document.querySelector('.menu-btn-1').classList.remove('active')
  document.querySelector('.menu-btn-2').classList.remove('active')
  document.querySelector('.menu-btn-3').classList.remove('active')
  document.querySelector('.menu-btn-4').classList.add('active')
}

export async function renderBattle(fighters) {
  let pokedex = document.querySelector('.pokemon__info')
  pokedex.innerHTML = ''
  const loader = document.querySelector('.loader-pokemon')
  loader.classList.toggle('active')
  let data = await getPokemon(fighters.f2)
  fighters.f2 = data

  let html = `
  <div class="battle">
    <div class="battleground-container">
    <div class="fighter1-container"><img class="fighter1-img" src="${fighters.f1.sprites.back_default}" alt=""></div>
    <div class="fighter2-container"><img class="fighter2-img" src="${fighters.f2.sprites.front_default}" alt=""></div>
    </div>
    <p>Battle results:</p>
    <p>${fighters.f1.weight + fighters.f1.height + fighters.f1.base_experience > fighters.f2.weight + fighters.f1.height + fighters.f1.base_experience ?
      fighters.f1.name : fighters.f2.name} wins!</p>
    <div class="fight-res">
      <div>
        <p>${fighters.f1.name}</p>
        <p>Exp: ${fighters.f1.base_experience}</p>
        <p>Height: ${fighters.f1.height}</p>
        <p>Weight: ${fighters.f1.weight}</p>
        <p>Summary power: ${fighters.f1.weight + fighters.f1.height + fighters.f1.base_experience}</p>
      </div>
      <div>
        <p>${fighters.f2.name}</p>
        <p>Exp: ${fighters.f2.base_experience}</p>
        <p>Height: ${fighters.f2.height}</p>
        <p>Weight: ${fighters.f2.weight}</p>
        <p>Summary power: ${fighters.f2.weight + fighters.f1.height + fighters.f1.base_experience}</p>
      </div>
    </div>
  </div>
  `

  pokedex.innerHTML = html
  loader.classList.toggle('active')
}

renderPokemonsList()
const search = document.querySelector('.search')
search.addEventListener('input', () => { renderPokemonsList(search.value) })