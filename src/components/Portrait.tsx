type PortraitProps = {
  src: string
  alt: string
  caption?: string
  flip?: boolean
}

export function Portrait({ src, alt, caption, flip = false }: PortraitProps) {
  return (
    <figure className="w-fit">
      <div className="relative">
        <span
          aria-hidden
          className={`absolute inset-0 z-0 bg-blood/30 ${
            flip ? "-translate-x-3 translate-y-3" : "translate-x-3 translate-y-3"
          }`}
        />
        <img
          src={src}
          alt={alt}
          className="relative z-10 block h-80 w-auto border border-line bg-ink md:h-[28rem]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute left-1.5 top-1.5 z-20 size-2.5 border-l border-t border-foam/60"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-1.5 right-1.5 z-20 size-2.5 border-b border-r border-foam/60"
        />
      </div>
      {caption && (
        <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
