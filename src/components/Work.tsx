import { artifacts, skills } from "../content"

export function Work() {
  return (
    <section id="artifacts" className="mx-auto max-w-6xl px-5 pb-10 pt-24">
      <header className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-blood">
            Artifacts from the road
          </p>
          <h2 className="mt-3 font-display text-5xl text-foam">Selected work</h2>
        </div>
        <p className="max-w-md text-sm text-mute">
          Things that shipped. Each one is a chapter object you can pick up later.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {artifacts.map((item) => {
          const className =
            "border border-line bg-panel/40 p-6 transition hover:border-blood/60"
          const inner = (
            <>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-blood">
                {item.era} · {item.tag}
              </p>
              <h3 className="mt-3 font-display text-3xl text-foam">
                {item.title}
                {"href" in item && item.href && (
                  <span className="ml-2 inline-block translate-y-[-2px] font-mono text-2xl leading-none text-foam">↗</span>
                )}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mute">{item.body}</p>
              <p className="mt-5 font-mono text-[11px] text-eye-hazel">
                {item.stack.join(" · ")}
              </p>
            </>
          )

          return "href" in item && item.href ? (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className={`block no-underline ${className}`}
            >
              {inner}
            </a>
          ) : (
            <article key={item.title} className={className}>
              {inner}
            </article>
          )
        })}
      </div>

      <div id="toolkit" className="mt-20 scroll-mt-[5.5rem] border-t border-line pt-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-blood">
              Appendix
            </p>
            <h3 className="mt-3 font-display text-3xl text-foam">The toolkit</h3>
          </div>
          <p className="max-w-xs text-sm text-mute">
            What I reach for, and what I am reaching toward.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-5">
          {(
            [
              ["languages", skills.keep, false],
              ["systems", skills.systems, false],
              ["infra", skills.infra, false],
              ["chain", skills.chain, false],
              ["learning", skills.next, true],
            ] as const
          ).map(([label, values, live], index) => (
            <div
              key={label}
              className="group relative bg-blood/20 p-5 transition-colors hover:bg-blood/30"
            >
              <span className="absolute right-4 top-4 font-mono text-[10px] text-foam/35">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-foam">
                {live && (
                  <span className="size-1.5 animate-pulse rounded-full bg-eye-hazel" />
                )}
                {label}
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {values.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-sm border border-eye-hazel/30 px-2 py-1 font-mono text-[11px] text-foam/90 transition-colors hover:border-eye-hazel"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
