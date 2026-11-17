const TABS = [
  { id: 'bestiario', label: 'I · Bestiario' },
  { id: 'botin', label: 'II · Botín' },
  { id: 'dados', label: 'III · Dados' },
]

export default function Tabs({ active, onChange }) {
  return (
    <nav className="tabs">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`tabs__tab ${active === tab.id ? 'tabs__tab--active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}