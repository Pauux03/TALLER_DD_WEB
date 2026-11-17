import { useEffect, useMemo, useState } from 'react'
import MonsterCard from '../components/MonsterCard'
import { getMonster, getMonsterList } from '../services/dndApi'
import { CR_FILTERS } from '../utils/monsters'
import '../styles/bestiary.css'

const PAGE_SIZE = 12

export default function Bestiary() {
  const [filterId, setFilterId] = useState('all')
  const [query, setQuery] = useState('')
  const [list, setList] = useState([])
  const [details, setDetails] = useState({})
  const [visible, setVisible] = useState(PAGE_SIZE)
  const [loadingList, setLoadingList] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    const filter = CR_FILTERS.find((f) => f.id === filterId)

    setLoadingList(true)
    setError(null)
    setVisible(PAGE_SIZE)

    getMonsterList(filter.values)
      .then((results) => {
        if (!cancelled) setList(results)
      })
      .catch((e) => {
        if (!cancelled) setError(e.message)
      })
      .finally(() => {
        if (!cancelled) setLoadingList(false)
      })

    return () => {
      cancelled = true
    }
  }, [filterId])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? list.filter((m) => m.name.toLowerCase().includes(q)) : list
  }, [list, query])

  const shown = useMemo(() => filtered.slice(0, visible), [filtered, visible])

  // 3. Detalle solo de las criaturas visibles que aún no se han pedido
  useEffect(() => {
    const missing = shown.filter((m) => !details[m.index])
    if (missing.length === 0) return

    let cancelled = false

    Promise.all(missing.map((m) => getMonster(m.index)))
      .then((results) => {
        if (cancelled) return
        setDetails((prev) => {
          const next = { ...prev }
          results.forEach((d) => {
            next[d.index] = d
          })
          return next
        })
      })
      .catch((e) => {
        if (!cancelled) setError(e.message)
      })

    return () => {
      cancelled = true
    }
  }, [shown, details])

  const handleQuery = (e) => {
    setQuery(e.target.value)
    setVisible(PAGE_SIZE)
  }

  return (
    <section>
      <h2 className="sheet__title">Bestiario</h2>

      <div className="bestiary">
        <div className="bestiary__controls">
          <label className="bestiary__search">
            <span className="sr-only">Buscar criatura</span>
            <input
              type="search"
              placeholder="Buscar criatura…"
              value={query}
              onChange={handleQuery}
            />
          </label>

          <p className="bestiary__label">Nivel de desafío</p>
          <div className="bestiary__filters">
            {CR_FILTERS.map((f) => (
              <button
                key={f.id}
                className={`bestiary__filter ${f.id === filterId ? 'bestiary__filter--active' : ''}`}
                onClick={() => setFilterId(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bestiary__results">
          {error && <p className="bestiary__msg">No se pudo cargar: {error}</p>}
          {loadingList && <p className="bestiary__msg">Cargando criaturas…</p>}
          {!loadingList && !error && filtered.length === 0 && (
            <p className="bestiary__msg">Ninguna criatura coincide con la búsqueda.</p>
          )}

          <div className="bestiary__grid">
            {shown.map((m) =>
              details[m.index] ? (
                <MonsterCard key={m.index} monster={details[m.index]} />
              ) : (
                <div className="entry entry--loading" key={m.index}>
                  Cargando {m.name}…
                </div>
              )
            )}
          </div>

          {filtered.length > visible && (
            <button className="bestiary__more" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
              Cargar más criaturas
            </button>
          )}
        </div>
      </div>
    </section>
  )
}