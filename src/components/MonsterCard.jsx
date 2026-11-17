import { useState } from 'react'
import EntryCard from './EntryCard'
import { ABILITIES, SIZES, TYPES, formatCR, getArmorClass } from '../utils/monsters'

export default function MonsterCard({ monster }) {
  const [open, setOpen] = useState(false)
  const speed = Object.entries(monster.speed ?? {})
    .map(([mode, value]) => `${mode} ${value}`)
    .join(', ')

  return (
    <EntryCard
      title={monster.name}
      subtitle={`${SIZES[monster.size] ?? monster.size} · ${TYPES[monster.type] ?? monster.type}`}
      stats={[
        ['Clase de armadura', getArmorClass(monster)],
        ['Puntos de golpe', monster.hit_points],
      ]}
      seal={{ label: 'CR', value: formatCR(monster.challenge_rating) }}
    >
      <button className="entry__toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {open ? 'Ocultar ficha' : 'Ver ficha'}
      </button>

      {open && (
        <div className="entry__detail">
          <div className="entry__abilities">
            {ABILITIES.map(([key, label]) => (
              <div key={key}>
                <span>{label}</span>
                <strong>{monster[key]}</strong>
              </div>
            ))}
          </div>
          {speed && <p>Velocidad: {speed}</p>}
          <p>Experiencia: {monster.xp} XP</p>
          {monster.actions?.length > 0 && (
            <p>Acciones: {monster.actions.map((a) => a.name).join(', ')}</p>
          )}
        </div>
      )}
    </EntryCard>
  )
}