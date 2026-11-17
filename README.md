# Cuaderno del Dungeon Master

Herramienta interactiva para asistir a un Dungeon Master durante partidas de
Dungeons & Dragons 5e. Funciona en navegador (diseño responsive)
y como aplicación Android.

**Aplicación web:** (https://cuaderno-dungeon-master.vercel.app/)

**APK (Android):** disponible en la sección [Releases] (https://github.com/Pauux03/TALLER_DD_WEB/releases)

## Módulos

- **Bestiario:** consulta criaturas de la API de D&D 5e, con búsqueda por
  nombre, filtro por nivel de desafío (CR) y ficha con atributos.
- **Botín:** genera monedas y objetos aleatorios según el CR del monstruo
  derrotado. Los objetos salen de la API (`/api/magic-items` y `/api/equipment`).
- **Dados:** d4, d6, d8, d10, d12, d20 y d100 con animación, registro de
  tiradas y sellos de 20 natural y pifia.

## Tecnologías

React, Vite, JavaScript, CSS, CapacitorJS, Vercel.
Datos: [D&D 5e API](https://www.dnd5eapi.co/api/).

## Ejecutar en local

```bash
git clone <URL DEL REPOSITORIO>
cd grimorio-dm
npm install
npm run dev
```

## Estructura

```
src/
  components/   EntryCard (tarjeta genérica), MonsterCard, ItemCard, Tabs
  modules/      Bestiary, Loot, DiceTray
  services/     dndApi, lootGenerator
  utils/        dice, lootTable, monsters, rarity
  styles/       tokens y estilos por módulo
```

## Flujo de trabajo

Una rama por módulo (`feature/dados`, `feature/bestiario`, `feature/loot`),
integradas a `main` mediante Pull Requests.
