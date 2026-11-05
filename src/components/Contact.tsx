import { useState } from "react"
import { contact, site } from "../content"

export function Contact() {
  return (
    <section id="summon" className="relative mx-auto max-w-6xl overflow-hidden px-5 pb-24 pt-8">
      <p
        aria-hidden
        className="pointer-events-none absolute -bottom-10 right-0 select-none font-display text-[28vw] leading-none text-blood/[0.08] md:text-[12rem]"
      >
        Onward
      </p>

      <div className="relative grid items-end gap-12 md:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-blood">
            Endpapers
          </p>
          <h2 className="mt-3 font-display text-6xl text-foam md:text-7xl">
            {contact.heading}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mute">
            {contact.body}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <WriteToMe />
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm border border-line px-5 py-3 text-sm text-mute no-underline hover:border-blood hover:text-foam"
            >
              LinkedIn
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm border border-line px-5 py-3 text-sm text-mute no-underline hover:border-blood hover:text-foam"
            >
              GitHub
            </a>
          </div>
        </div>

        <aside className="relative border border-line bg-panel/50">
          <span aria-hidden className="absolute inset-y-0 left-0 w-0.5 bg-blood" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-8 top-20 bottom-8 opacity-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, transparent 0, transparent 27px, rgba(193,18,31,0.22) 28px)",
            }}
          />
          <div className="relative px-8 py-8">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-eye-blue" />
              <span className="size-2 rounded-full bg-eye-hazel" />
            </div>
            <p className="mt-5 font-display text-4xl leading-none text-foam">
              {site.name}
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-blood">
              {site.role}
            </p>
            <dl className="mt-8 space-y-4 font-mono text-[12px] text-mute">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.18em] text-blood/80">
                  From
                </dt>
                <dd className="mt-1 text-foam/90">{site.location}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.18em] text-blood/80">
                  Call / Whatsapp
                </dt>
                <dd className="mt-1">
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-foam">
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.18em] text-blood/80">
                  Post
                </dt>
                <dd className="mt-1">
                  <a href={`mailto:${site.email}`} className="hover:text-foam">
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>

      <p className="relative mt-20 text-center font-display text-xl italic text-mute/70">
        {contact.finis}
      </p>
    </section>
  )
}

function WriteToMe() {
  const [copied, setCopied] = useState(false)

  return (
    <a
      href={`mailto:${site.email}`}
      className="rounded-sm bg-blood px-5 py-3 text-sm text-foam no-underline hover:bg-blood-dim"
      onClick={() => {
        void navigator.clipboard.writeText(site.email).then(() => {
          setCopied(true)
          window.setTimeout(() => setCopied(false), 2200)
        })
      }}
    >
      {copied ? "Email copied" : contact.cta}
    </a>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-line px-5 py-8 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-mute">
      {site.name} · {new Date().getFullYear()}
    </footer>
  )
}
