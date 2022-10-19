import { getAllPokemons, getPokemon } from "./api.js";
import { renderBattle, renderPokemonsList } from "./script.js";

const tagColor = {
  normal: '#edf5f4',
  fighting: '#fc0032',
  flying: '#bbdbf0',
  poison: '#62ff00',
  ground: '#3d5924',
  rock: '#8c9187',
  bug: '#7d1b20',
  ghost: '#dba2a5',
  steel: '#e8dcdd',
  fire: '#f77902',
  water: '#1900ff',
  grass: '#51db51',
  electric: '#ddff00',
  psychic: '#ff0099',
  ice: '#7aa0ff',
  dragon: '#b82800',
  dark: '#30262e',
  fairy: '#9f00d9',
  unknown: '#a8027c',
  shadow: '#262125',
}

export function renderTags(tags) {
  let html = ``
  for (let i = 0; i < tags.length; i++) {
    html += `
    <div class="tag" style="background-color:${tagColor[tags[i].type.name]};color:${tags[i].type.name === 'dark' || tags[i].type.name === 'shadow' || tags[i].type.name === 'ground' || tags[i].type.name === 'bug' ? 'white' : 'black'}">${tags[i].type.name}</div>
    `
  }
  return `<div class="tags">${html}</div>`
}

export function randomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
}

export function percentOfStatbar(number) {
  let max = 255
  return number / (max / 100);
}

export async function renderChain(chain) {
  let chainObj = {}
  let html = ''
  if (chain.species !== undefined) {
    chainObj[chain.species.name] = chain.species.url
  }
  if (chain.evolves_to[0]?.species !== undefined) {
    chainObj[chain.evolves_to[0].species.name] = chain.evolves_to[0].species.url
  }
  if (chain.evolves_to[0]?.evolves_to[0]?.species !== undefined) {
    chainObj[chain.evolves_to[0].evolves_to[0].species.name] = chain.evolves_to[0].evolves_to[0].species.url
  }
  let arrInfo = []
  for (let key in chainObj) {
    arrInfo.push(await getPokemon(chainObj[key].split('/')[chainObj[key].split('/').length - 2]))
  }
  for (let i = 0; i < arrInfo.length; i++) {
    html += `
    ${i > 0 ? '<div><img src="./images/arrow-down.png" alt="" width=70></div>' : ''}
    <div class="chain-item chain-item-${i + 1}">
      <div><img class="chain-item-img" src='${arrInfo[i].sprites.front_default}' alt='${arrInfo[i].name}'></div>
      <p class="chain-item-name">${arrInfo[i].name}</p>
    </div>`
  }
  return html
}

export async function setFavorite(id) {
  let favBtn = document.querySelector('.fav-btn')
  if (localStorage.getItem(`pokemon${id}`) === null) {
    favBtn.classList.add('active')
    localStorage.setItem(`pokemon${id}`, `${id}`)
  } else {
    favBtn.classList.remove('active')
    localStorage.removeItem(`pokemon${id}`)
  }
  await renderPokemonsList()
}

export async function renderPokemonsFightersList(fighters) {
  document.querySelector('.fight-list').innerHTML = ''
  let favList = document.querySelector('.favorites-fight-list')
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
      pokemon.addEventListener('click', () => {
        fighters.f2 = id
        renderBattle(fighters)
      })
    } else if (i = localStorage.length - 1 && counter === 0) {
      favList.innerHTML = '<p>No favorite pokémon</p>'
    }
  }

  for (let i = 0; i < pokemonsList.length; i++) {
    let splitId = pokemonsList[i].url.split('/')
    let id = splitId[splitId.length - 2]
    let pokemon = document.createElement('div')
    pokemon.classList.add('.pokemons-list__item')
    pokemon.innerHTML = `<div>${pokemonsList[i].name}</div><img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png' alt ='' width='60'>`
    document.querySelector('.fight-list').appendChild(pokemon)
    pokemon.addEventListener('click', () => {
      fighters.f2 = id
      renderBattle(fighters)
    })
  }
}