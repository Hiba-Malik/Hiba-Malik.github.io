import { useEffect, useState } from "react"
import { site, nav, gameCopy } from "../content"

type NavProps = {
  questOn: boolean
  onToggleQuest: () => void
}

export function Nav({ questOn, onToggleQuest }: NavProps) {
  const [help, setHelp] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(nav[0].href)

  useEffect(() => {
    const ids = nav.map((item) => item.href.slice(1))
    const observed = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (observed.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (hit?.target.id) setActive(`#${hit.target.id}`)
      },
      { rootMargin: "-18% 0px -70% 0px", threshold: [0, 0.2, 0.45] },
    )

    observed.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!questOn) setHelp(false)
  }, [questOn])

  return (
    <header
      data-fixed
      className="fixed top-0 z-50 w-full border-b border-line/70 bg-ink/85 backdrop-blur-md"
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-blood" />

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <a href="#prologue" className="flex items-center gap-3 no-underline">
          <span className="flex gap-1" aria-hidden>
            <span className="size-2.5 rounded-full bg-eye-blue" />
            <span className="size-2.5 rounded-full bg-eye-hazel" />
          </span>
          <span className="font-display text-xl tracking-wide text-foam">
            {site.name}
          </span>
        </a>

        <nav className="hidden items-center gap-1 text-sm md:flex">
          {nav.map((item) => {
            const current = active === item.href
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative px-3 py-1.5 transition-colors ${
                  current ? "text-foam" : "text-mute hover:text-foam"
                }`}
              >
                {item.label}
                {current && (
                  <span
                    aria-hidden
                    className="absolute inset-x-3 -bottom-px h-px bg-blood"
                  />
                )}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.cv}
            download="Hiba_Malik_SE_CV.pdf"
            className="rounded-full border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-mute no-underline transition hover:border-blood hover:text-foam"
          >
            CV
          </a>
          {questOn && (
            <div
              className="relative"
              onMouseEnter={() => setHelp(true)}
              onMouseLeave={() => setHelp(false)}
            >
              <button
                type="button"
                onClick={() => setHelp(true)}
                onFocus={() => setHelp(true)}
                onBlur={() => setHelp(false)}
                aria-label={gameCopy.how}
                aria-expanded={help}
                className="size-7 rounded-full border border-line font-mono text-[11px] text-mute transition hover:border-blood hover:text-foam"
              >
                i
              </button>
              {help && (
                <div className="absolute right-0 top-9 w-56 rounded-sm border border-line bg-ink/95 p-3 font-mono text-[11px] text-mute backdrop-blur">
                  <p className="mb-2 uppercase tracking-[0.16em] text-foam">
                    {gameCopy.how}
                  </p>
                  <p>
                    <span className="text-foam">← →</span> {gameCopy.move}
                  </p>
                  <p>
                    <span className="text-foam">space</span> {gameCopy.jump}
                  </p>
                  <p>
                    <span className="text-foam">↓</span> {gameCopy.drop}
                  </p>
                  <p className="mt-2 text-eye-hazel">{gameCopy.goal}</p>
                </div>
              )}
            </div>
          )}
          <button
            type="button"
            onClick={onToggleQuest}
            className={`rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition ${
              questOn
                ? "border-blood bg-blood text-foam"
                : "border-line text-mute hover:border-blood hover:text-foam"
            }`}
          >
            <span
              className={`mr-2 inline-block size-1.5 rounded-full ${
                questOn ? "bg-foam" : "bg-blood"
              }`}
            />
            Quest mode
          </button>
          <button
            type="button"
            className="flex size-7 flex-col items-center justify-center gap-1 border border-line md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`block h-px w-3.5 bg-foam transition ${open ? "translate-y-[5px] rotate-45" : ""}`} />
            <span className={`block h-px w-3.5 bg-foam transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-px w-3.5 bg-foam transition ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-ink/95 px-5 py-4 md:hidden">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block py-2 font-mono text-xs uppercase tracking-[0.18em] ${
                active === item.href ? "text-foam" : "text-mute"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href={site.cv}
            download="Hiba_Malik_SE_CV.pdf"
            onClick={() => setOpen(false)}
            className="mt-2 block border-t border-line py-3 font-mono text-xs uppercase tracking-[0.18em] text-foam"
          >
            Download CV
          </a>
        </nav>
      )}
    </header>
  )
}
