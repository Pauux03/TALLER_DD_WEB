export const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const TIERS = [
  {
    id: 1,
    from: 0,
    to: 4,
    coins: { cobre: [10, 100], plata: [0, 50], oro: [0, 20], platino: [0, 0] },
    items: [0, 2],
    mundane: 0.5, 
    rarity: { Common: 70, Uncommon: 28, Rare: 2 },
  },
  {
    id: 2,
    from: 5,
    to: 10,
    coins: { cobre: [20, 200], plata: [20, 150], oro: [20, 250], platino: [0, 5] },
    items: [1, 3],
    mundane: 0.25,
    rarity: { Common: 35, Uncommon: 45, Rare: 18, 'Very Rare': 2 },
  },
  {
    id: 3,
    from: 11,
    to: 16,
    coins: { cobre: [0, 100], plata: [50, 300], oro: [200, 1000], platino: [5, 40] },
    items: [2, 3],
    mundane: 0.15,
    rarity: { Uncommon: 25, Rare: 45, 'Very Rare': 25, Legendary: 5 },
  },
  {
    id: 4,
    from: 17,
    to: 30,
    coins: { cobre: [0, 0], plata: [100, 500], oro: [500, 3000], platino: [30, 200] },
    items: [2, 4],
    mundane: 0.10,
    rarity: { Uncommon: 5, Rare: 25, 'Very Rare': 45, Legendary: 25 },
  },
]

export const getTier = (cr) => TIERS.find((t) => cr >= t.from && cr <= t.to)

function weighted(weights) {
  const total = Object.values(weights).reduce((sum, w) => sum + w, 0)
  let r = Math.random() * total
  for (const [key, weight] of Object.entries(weights)) {
    r -= weight
    if (r < 0) return key
  }
  return Object.keys(weights)[0]
}

export function rollCoins(cr) {
  const tier = getTier(cr)
  const t = (cr - tier.from) / (tier.to - tier.from)
  const factor = 0.6 + 0.4 * t

  return Object.fromEntries(
    Object.entries(tier.coins).map(([coin, [min, max]]) => [
      coin,
      Math.round(randInt(min, max) * factor),
    ])
  )
}

export function rollItemPlan(cr) {
  const tier = getTier(cr)
  const count = randInt(...tier.items)

  return Array.from({ length: count }, () => ({
    mundane: Math.random() < tier.mundane,
    rarity: weighted(tier.rarity),
  }))
}