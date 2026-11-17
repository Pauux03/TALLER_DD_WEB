import { useState } from 'react'
import Tabs from './components/Tabs'
import DiceTray from './modules/DiceTray'
import Bestiary from './modules/Bestiary'
import Loot from './modules/Loot'

export default function App() {
  const [section, setSection] = useState('bestiario')

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Cuaderno del Dungeon Master</h1>
        <span className="app__edition">D&amp;D 5E</span>
      </header>

      <Tabs active={section} onChange={setSection} />

      <main className="sheet">
        {section === 'botin' && <Loot />}
        {section === 'bestiario' && <Bestiary />}
        {section === 'dados' && <DiceTray />}
      </main>
    </div>
  )
}