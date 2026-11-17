const range = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => from + i)

export const CR_FILTERS = [
  { id: 'all', label: 'Todos', values: [] },
  { id: '0-1', label: 'CR 0–1', values: [0, 0.125, 0.25, 0.5, 1] },
  { id: '2-5', label: 'CR 2–5', values: range(2, 5) },
  { id: '6-10', label: 'CR 6–10', values: range(6, 10) },
  { id: '11+', label: 'CR 11+', values: range(11, 30) },
]

const FRACTIONS = { 0.125: '⅛', 0.25: '¼', 0.5: '½' }
export const formatCR = (cr) => FRACTIONS[cr] ?? String(cr)

export const getArmorClass = (monster) =>
  Array.isArray(monster.armor_class)
    ? monster.armor_class[0]?.value ?? '–'
    : monster.armor_class ?? '–'

export const SIZES = {
  Tiny: 'Diminuto',
  Small: 'Pequeño',
  Medium: 'Mediano',
  Large: 'Grande',
  Huge: 'Enorme',
  Gargantuan: 'Gigantesco',
}

export const TYPES = {
  aberration: 'Aberración',
  beast: 'Bestia',
  celestial: 'Celestial',
  construct: 'Constructo',
  dragon: 'Dragón',
  elemental: 'Elemental',
  fey: 'Feérico',
  fiend: 'Infernal',
  giant: 'Gigante',
  humanoid: 'Humanoide',
  monstrosity: 'Monstruosidad',
  ooze: 'Cieno',
  plant: 'Planta',
  undead: 'Muerto viviente',
}

export const ABILITIES = [
  ['strength', 'FUE'],
  ['dexterity', 'DES'],
  ['constitution', 'CON'],
  ['intelligence', 'INT'],
  ['wisdom', 'SAB'],
  ['charisma', 'CAR'],
]