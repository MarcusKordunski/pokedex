export default function renderTags(tags) {
  let html = ``
  for (let i = 0; i < tags.length; i++) {
    html += `
    <div class="tag">${tags[i].type.name}</div>
    `
  }
  return `<div class="tags">${html}</div>`
}