import { useState } from "react"
import { Nav } from "./components/Nav"
import { Hero } from "./components/Hero"
import { Prologue } from "./components/Prologue"
import { Chronicle } from "./components/Chronicle"
import { Work } from "./components/Work"
import { Companion } from "./components/Companion"
import { Contact, Footer } from "./components/Contact"
import { PrinceGame } from "./game/PrinceGame"

export default function App() {
  const [quest, setQuest] = useState(false)

  return (
    <div className="min-h-svh bg-ink text-foam">
      <div className="grain" />
      <Nav questOn={quest} onToggleQuest={() => setQuest((v) => !v)} />
      <PrinceGame enabled={quest} />
      <main>
        <Hero />
        <Prologue />
        <Chronicle />
        <Work />
        <Companion />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
