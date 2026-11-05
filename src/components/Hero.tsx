import { hero, site } from "../content"
import { InferencePortrait } from "./InferencePortrait"

export function Hero() {
  return (
    <section
      id="prologue"
      className="relative mx-auto grid min-h-svh max-w-6xl items-center gap-12 px-5 pb-16 pt-28 md:grid-cols-[1.1fr_0.9fr] md:pt-24"
    >
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-blood">
          {hero.kicker}
        </p>
        <h1 className="mt-4 font-display text-6xl leading-[0.9] text-foam md:text-8xl">
          {hero.title}
        </h1>
        <div className="mt-8 max-w-xl space-y-1 font-display text-2xl italic text-mute md:text-3xl">
          {hero.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <p className="mt-8 max-w-lg text-base leading-relaxed text-mute">
          {hero.lede}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#chronicle"
            className="rounded-sm bg-blood px-5 py-3 text-sm font-medium text-foam no-underline transition hover:bg-blood-dim"
          >
            Follow the chronicle
          </a>
          <a
            href="#companion"
            className="rounded-sm border border-line px-5 py-3 text-sm text-mute no-underline transition hover:border-blood hover:text-foam"
          >
            Meet Prince
          </a>
          <a
            href={site.cv}
            download="Hiba_Malik_SE_CV.pdf"
            className="rounded-sm border border-line px-5 py-3 text-sm text-mute no-underline transition hover:border-blood hover:text-foam"
          >
            Download CV
          </a>
        </div>
      </div>

      <div className="relative">
        <div
          data-world="ledge"
          className="pointer-events-none absolute -bottom-2 left-0 hidden h-2 w-72 md:block"
        />
        <div
          data-world="coffee"
          className="pointer-events-none absolute right-8 top-8 hidden size-6 md:block"
        />
        <figure className="relative overflow-hidden rounded-sm border border-line">
          <InferencePortrait />
        </figure>
      </div>
    </section>
  )
}
