const BASE = 'https://www.dnd5eapi.co'
const cache = new Map()

async function getJSON(path) {
  if (cache.has(path)) return cache.get(path)

  const res = await fetch(`${BASE}${path}`)
  if (!res.ok) throw new Error(`Error ${res.status} al consultar la API`)

  const data = await res.json()
  cache.set(path, data)
  return data
}

export async function getMonsterList(crValues = []) {
  const query = crValues.length ? `?challenge_rating=${crValues.join(',')}` : ''
  const data = await getJSON(`/api/monsters${query}`)
  return data.results
}

export const getMonster = (index) => getJSON(`/api/monsters/${index}`)

export const getByUrl = (url) => getJSON(url)

export const getMagicItemList = async () => (await getJSON('/api/magic-items')).results
export const getEquipmentList = async () => (await getJSON('/api/equipment')).results