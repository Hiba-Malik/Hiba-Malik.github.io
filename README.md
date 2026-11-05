# Hiba Malik — portfolio sample

A dark, bookish personal site. The page is a **chronicle** (blockchain → AI), not a cloned navy/mint developer template.

## Run

```sh
npm install
npm run dev
```

## Why this stack (on purpose)

| Choice | Why |
|---|---|
| **Vite + React + TypeScript** | You already ship React/Next/TS. Easy for you to modify. The quest needs a real interactive island. |
| **Tailwind v4** | Fast visual iteration. You used Tailwind on the vesting dashboard. |
| **No Bootstrap, no MUI, no Three.js** | Those were Gazi's defaults. They would make this look like hers. |
| **No Next.js (yet)** | This is a static chronicle. Vite is enough; you can move to Next later if you want routes or MDX chapters. |
| **Content in `src/content.ts`** | Change copy, dates, projects, and game text without hunting through JSX. |

## Design decisions

- **Blood red + warm black**, not navy/mint.
- **Prince's eyes** (blue + hazel) as the mark in the nav and favicon.
- **Serif display (Cormorant Garamond)** because you read fantasy; **Outfit** for body; **JetBrains Mono** because you like traditional coding.
- **The résumé is a plot**: Forge → Ledger → Crossing → New page.
- **Quest mode**: play as Prince and collect coffees placed in the page (`data-world` markers). Cute, yours, not a robot collecting brain cells.

## Where to edit

- Copy / chapters / projects: `src/content.ts`
- Colors / fonts: `src/index.css` (`@theme`)
- Photos: `public/portraits/`
- Layout sections: `src/components/`
- Cat physics & sprites: `src/game/PrinceGame.tsx`

Drop a real photo of Prince at `public/portraits/prince.jpeg` later and wire it into `Companion.tsx`. Until then the pixel cat is canonical.

## Quest mode

Toggle **Quest mode** in the nav. Arrow keys / A-D to move, space to jump. Ledges and coffees are invisible markers in the JSX:

```html
<div data-world="ledge" class="..." />
<div data-world="coffee" class="..." />
```

Add more of those and the game picks them up on the next toggle.
