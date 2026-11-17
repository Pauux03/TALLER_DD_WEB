import { useEffect, useRef, useState } from 'react'
import { DICE, roll } from '../utils/dice'
import '../styles/dice.css'

const HISTORY_LIMIT = 8
const ROLL_TICKS = 8

export default function DiceTray() {
  const [sides, setSides] = useState(20)
  const [shown, setShown] = useState(null)
  const [result, setResult] = useState(null)
  const [rolling, setRolling] = useState(false)
  const [history, setHistory] = useState([])
  const timer = useRef(null)

  useEffect(() => () => clearInterval(timer.current), [])

  const selectDie = (value) => {
    if (rolling) return
    setSides(value)
    setShown(null)
    setResult(null)
  }

  const handleRoll = () => {
    if (rolling) return
    setRolling(true)
    setResult(null)

    const final = roll(sides)
    let ticks = 0

    timer.current = setInterval(() => {
      ticks += 1
      if (ticks < ROLL_TICKS) {
        setShown(roll(sides))
        return
      }
      clearInterval(timer.current)
      setShown(final)
      setResult({ sides, value: final })
      setHistory((prev) =>
        [{ id: Date.now(), sides, value: final }, ...prev].slice(0, HISTORY_LIMIT)
      )
      setRolling(false)
    }, 70)
  }

  const isNatural = result && result.sides === 20 && result.value === 20
  const isFumble = result && result.sides === 20 && result.value === 1

  return (
    <section>
      <h2 className="sheet__title">Dados</h2>

      <div className="dice">
        <div className="dice__picker" role="group" aria-label="Tipo de dado">
          {DICE.map((d) => (
            <button
              key={d}
              className={`dice__option ${d === sides ? 'dice__option--active' : ''}`}
              onClick={() => selectDie(d)}
            >
              d{d}
            </button>
          ))}
        </div>

        <div className="dice__stage">
          <div className={`dice__die ${rolling ? 'dice__die--rolling' : ''}`}>
            <svg className="dice__shape" viewBox="0 0 210 200" aria-hidden="true">
              <path
                d="M105 8l84 48v88l-84 48-84-48V56z"
                fill="none"
                stroke="#6E1428"
                strokeWidth="2"
              />
              <path
                d="M105 8v184M21 56l168 88M189 56L21 144"
                stroke="#9A8668"
                strokeWidth="1"
              />
              <circle cx="105" cy="100" r="52" fill="#F1E6CF" />
            </svg>
            <span className="dice__value" aria-live="polite">
              {shown ?? '–'}
            </span>
            {isNatural && <span className="dice__stamp">NATURAL</span>}
            {isFumble && <span className="dice__stamp dice__stamp--fumble">PIFIA</span>}
          </div>

          <button className="dice__roll" onClick={handleRoll} disabled={rolling}>
            Lanzar d{sides}
          </button>
        </div>

        <aside className="log">
          <h3 className="log__title">Registro de tiradas</h3>
          {history.length === 0 ? (
            <p className="log__empty">Aún no hay tiradas.</p>
          ) : (
            <ul className="log__list">
              {history.map((h) => {
                const natural = h.sides === 20 && h.value === 20
                const fumble = h.sides === 20 && h.value === 1
                return (
                  <li
                    key={h.id}
                    className={`log__row ${natural ? 'log__row--natural' : ''} ${fumble ? 'log__row--fumble' : ''}`}
                  >
                    <span>d{h.sides}</span>
                    <span className="log__dots" />
                    <span>
                      {h.value}
                      {fumble ? ' pifia' : ''}
                    </span>
                  </li>
                )
              })}
            </ul>
          )}
        </aside>
      </div>
    </section>
  )
}