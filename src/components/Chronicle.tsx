import { chapters } from "../content"
import { Portrait } from "./Portrait"

export function Chronicle() {
  return (
    <section id="chronicle" className="relative mx-auto max-w-6xl px-5 py-8">
      <header className="mb-16 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-blood">
          Follow the thread
        </p>
        <h2 className="mt-3 font-display text-5xl text-foam md:text-6xl">
          The chronicle
        </h2>
        <p className="mt-4 text-mute">
          Not a résumé in disguise. A plot: from a silver medal and a health-record
          chain, through marketplaces and vaults, toward models that act.
        </p>
      </header>

      <div className="relative">
        <div className="chronicle-rail absolute left-[15px] top-4 hidden h-[calc(100%-2rem)] w-px md:left-1/2 md:block" />

        <ol className="space-y-24">
          {chapters.map((chapter, index) => {
            const reverse = index % 2 === 1
            return (
              <li
                key={chapter.id}
                id={chapter.id}
                className={`relative grid items-center gap-8 md:grid-cols-2 ${
                  reverse ? "md:text-right" : ""
                }`}
              >
                <div
                  className={`relative flex justify-center ${
                    reverse ? "md:order-2 md:justify-start" : "md:justify-end"
                  }`}
                >
                  <div
                    data-world="ledge"
                    className="pointer-events-none absolute -bottom-3 left-8 h-2 w-72"
                  />
                  <div
                    data-world="coffee"
                    className="pointer-events-none absolute right-10 top-6 size-6"
                  />
                  <Portrait
                    src={chapter.image}
                    alt={chapter.imageAlt}
                    caption={`Plate ${chapter.roman} · ${chapter.years}`}
                    flip={reverse}
                  />
                </div>

                <div className={reverse ? "md:order-1 md:pr-12" : "md:pl-12"}>
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-blood">
                    Chapter {chapter.roman} · {chapter.years}
                  </p>
                  <h3 className="mt-2 font-display text-4xl text-foam">
                    {chapter.title}
                  </h3>
                  <p className="mt-1 text-sm text-mute">{chapter.place}</p>
                  <p className="mt-5 leading-relaxed text-mute">
                    {chapter.summary}
                  </p>
                  <ul className="mt-5 space-y-2 text-sm text-foam/90">
                    {chapter.beats.map((beat) => (
                      <li key={beat} className="flex gap-3 md:justify-start">
                        {reverse ? (
                          <>
                            <span className="hidden flex-1 md:block" />
                            <span>{beat}</span>
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-blood" />
                          </>
                        ) : (
                          <>
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-blood" />
                            <span>{beat}</span>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
