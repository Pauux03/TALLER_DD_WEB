import { getByUrl, getEquipmentList, getMagicItemList } from './dndApi'
import { shuffle, rollCoins, rollItemPlan } from '../utils/lootTable'

const BATCH = 8
const MAX_BATCHES = 6

async function findMagicItem(rarity, used) {
  const list = await getMagicItemList()
  const pool = shuffle(list.filter((i) => !used.has(i.index)))

  for (let b = 0; b < MAX_BATCHES; b++) {
    const batch = pool.slice(b * BATCH, (b + 1) * BATCH)
    if (batch.length === 0) break

    const details = await Promise.all(batch.map((i) => getByUrl(i.url)))
    const match = details.find((d) => d.rarity?.name === rarity)
    if (match) return match
  }
  return null
}

async function findMundane(used) {
  const list = await getEquipmentList()
  const candidates = list.filter((i) => !used.has(i.index))
  const chosen = candidates[Math.floor(Math.random() * candidates.length)]
  return chosen ? getByUrl(chosen.url) : null
}

export async function generateLoot(cr) {
  const coins = rollCoins(cr)
  const plan = rollItemPlan(cr)
  const used = new Set()
  const items = []

  for (const slot of plan) {
    const item = slot.mundane
      ? await findMundane(used)
      : await findMagicItem(slot.rarity, used)

    if (item) {
      used.add(item.index)
      items.push(item)
    }
  }

  return { coins, items }
}