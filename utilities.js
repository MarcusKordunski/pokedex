import { getPokemon } from "./api.js";
import { renderPokemonsList } from "./script.js";

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
    ${i > 0 ? '<div><img src="./arrow-down.png" alt="" width=70></div>' : ''}
    <div class="chain-item chain-item-${i + 1}">
      <div><img class="chain-item-img" src='${arrInfo[i].sprites.front_default}' alt='${arrInfo[i].name}'></div>
      <p class="chain-item-name">${arrInfo[i].name}</p>
    </div>`
  }
  return html
}

export async function setFavorite(id) {
  let favBtn = document.querySelector('.fav-btn')
  if (localStorage.getItem(`${id}`) === null) {
    favBtn.classList.add('active')
    localStorage.setItem(`${id}`, `${id}`)
  } else {
    favBtn.classList.remove('active')
    localStorage.removeItem(`${id}`)
  }
  await renderPokemonsList()
}