import { useState } from 'react'
import Tabs from './components/Tabs'
import DiceTray from './modules/DiceTray'

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
        {section === 'bestiario' && <h2 className="sheet__title">Bestiario</h2>}
        {section === 'botin' && <h2 className="sheet__title">Botín</h2>}
        {section === 'dados' && <DiceTray />}
      </main>
    </div>
  )
}