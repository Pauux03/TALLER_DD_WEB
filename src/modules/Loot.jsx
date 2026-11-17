import { useState } from 'react'
import ItemCard from '../components/ItemCard'
import { generateLoot } from '../services/lootGenerator'
import { getTier } from '../utils/lootTable'
import '../styles/loot.css'

const COINS = [
  ['cobre', 'Cobre', '#C27A4A'],
  ['plata', 'Plata', '#C9CED6'],
  ['oro', 'Oro', '#E0B445'],
  ['platino', 'Platino', '#9FD3E0'],
]

export default function Loot() {
  const [cr, setCr] = useState(5)
  const [loot, setLoot] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const tier = getTier(cr)

  const handleGenerate = async () => {
    setLoading(true)
    setError(null)
    try {
      setLoot(await generateLoot(cr))
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <h2 className="sheet__title">Botín</h2>

      <div className="loot">
        <div className="loot__controls">
          <p className="loot__label">Desafío del monstruo vencido</p>
          <p className="loot__cr">CR {cr}</p>
          <p className="loot__tier">Botín de nivel {tier.id}</p>

          <input
            className="loot__range"
            type="range"
            min="0"
            max="30"
            value={cr}
            onChange={(e) => setCr(Number(e.target.value))}
            aria-label="Nivel de desafío"
          />

          <button className="loot__button" onClick={handleGenerate} disabled={loading}>
            {loading ? 'Buscando en el tesoro…' : 'Sacar el botín'}
          </button>

          {loot && (
            <>
              <p className="loot__label">Monedas</p>
              <div className="loot__coins">
                {COINS.map(([key, label, color]) => (
                  <div className="entry__row" key={key}>
                    <span>
                      <span className="loot__dot" style={{ background: color }} />
                      {label}
                    </span>
                    <span className="entry__dots" />
                    <span className="entry__value">{loot.coins[key]}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="loot__results">
          {error && <p className="loot__msg">No se pudo generar el botín: {error}</p>}
          {!loot && !loading && !error && (
            <p className="loot__msg">Elige el desafío y saca el botín.</p>
          )}

          {loot && (
            <>
              <h3 className="loot__heading">Objetos hallados</h3>
              {loot.items.length === 0 ? (
                <p className="loot__msg">Esta vez no cayó ningún objeto.</p>
              ) : (
                <div className="loot__items">
                  {loot.items.map((item) => (
                    <ItemCard key={item.index} item={item} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}