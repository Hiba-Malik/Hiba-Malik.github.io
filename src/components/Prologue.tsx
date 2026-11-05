import { about } from "../content"
import { Portrait } from "./Portrait"

export function Prologue() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <header className="mb-10">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-blood">
          00
        </p>
        <h2 className="mt-3 font-display text-5xl text-foam">{about.heading}</h2>
      </header>

      <div className="grid items-start gap-10 md:grid-cols-[auto_minmax(0,1fr)]">
        <div className="mx-auto md:mx-0">
          <Portrait
            src="/portraits/bat-book.jpeg?v=2"
            alt="Hiba holding a baseball bat and a hardcover book"
            caption="Plate 00"
          />
        </div>
        <div className="flex flex-col">
          <div className="space-y-5 text-[17px] leading-relaxed text-mute">
            {about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <dl className="mt-10 grid gap-4 sm:grid-cols-2">
            {about.facts.map((fact) => (
              <div key={fact.label} className="border-t border-line pt-3">
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-blood">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-foam">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
