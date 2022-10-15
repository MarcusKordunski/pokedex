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