import EntryCard from './EntryCard'
import { RARITY } from '../utils/rarity'

const truncate = (text, max) => (text.length > max ? `${text.slice(0, max).trim()}…` : text)

export default function ItemCard({ item }) {

  const rarity = RARITY[item.rarity?.name] ?? RARITY.Common
  const stats = item.cost ? [['Valor', `${item.cost.quantity} ${item.cost.unit}`]] : []
  const description = item.desc?.[0]

  return (
    <EntryCard
      title={item.name}
      subtitle={item.equipment_category?.name}
      stats={stats}
      badge={{ label: rarity.label, color: rarity.color }}
    >
      {description && <p className="entry__text">{truncate(description, 140)}</p>}
    </EntryCard>
  )
}