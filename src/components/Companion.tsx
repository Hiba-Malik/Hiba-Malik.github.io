import { useEffect, useRef } from "react"
import { companion } from "../content"
import { PRINCE_PX_H, PRINCE_PX_W, drawPrince } from "../game/princeArt"

export function Companion() {
  return (
    <section id="companion" className="relative mx-auto max-w-6xl px-5 pb-8 pt-10">
      <div
        data-world="ledge"
        className="pointer-events-none absolute left-[20%] top-16 h-2 w-52"
      />
      <div
        data-world="coffee"
        className="pointer-events-none absolute right-[22%] top-28 size-6"
      />

      <div className="grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
            Canonical likeness · he sat still
          </p>
          <figure className="relative w-full max-w-xs">
            <span
              aria-hidden
              className="absolute inset-0 translate-x-3 translate-y-3 bg-blood/30"
            />
            <div className="relative z-10 overflow-hidden border border-line bg-ink">
              <PrinceClip />
            </div>
          </figure>
          <div className="mt-6 flex items-center gap-3">
            <span className="size-3 rounded-full bg-eye-blue" />
            <span className="font-mono text-xs text-mute">heterochromia</span>
            <span className="size-3 rounded-full bg-eye-hazel" />
          </div>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-blood">
            {companion.heading}
          </p>
          <h2 className="mt-3 font-display text-5xl text-foam">
            {companion.name}
          </h2>
          <p className="mt-2 text-sm text-mute">
            {companion.species}
            <br />
            {companion.eyes}
          </p>
          <p className="mt-6 leading-relaxed text-mute">{companion.body}</p>
          <div className="mt-10 w-fit rounded-xl bg-[#f3c4cc] p-2">
            <PixelPrince />
          </div>
        </div>
      </div>
    </section>
  )
}

function PrinceClip() {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      video.pause()
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play()
        else video.pause()
      },
      { threshold: 0.35 },
    )
    io.observe(video)
    return () => io.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="metadata"
      poster="/prince/poster.jpg?v=4"
      className="block aspect-[9/16] w-full object-cover"
      aria-label="Prince, a white cat with one blue eye and one hazel eye"
    >
      <source src="/prince/prince.mp4?v=4" type="video/mp4" />
    </video>
  )
}

function PixelPrince() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const scale = 5
    const pad = 3
    const w = (PRINCE_PX_W + pad * 2) * scale
    const h = (PRINCE_PX_H + pad * 2) * scale
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.imageSmoothingEnabled = false

    let frame = 0
    let raf = 0
    let blinkUntil = 0
    let nextBlink = 90

    const tick = () => {
      frame += 1
      if (frame >= nextBlink) {
        blinkUntil = frame + 14
        nextBlink = frame + 160 + Math.floor(Math.random() * 80)
      }
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = "#e29aa6"
      for (const [sx, sy] of [
        [1, 4],
        [PRINCE_PX_W + pad * 2 - 3, 6],
        [2, PRINCE_PX_H + 1],
        [PRINCE_PX_W + pad * 2 - 4, PRINCE_PX_H],
        [PRINCE_PX_W, 2],
        [4, PRINCE_PX_H + pad * 2 - 3],
      ] as const) {
        ctx.fillRect(sx * scale, sy * scale, scale, scale)
      }
      drawPrince(ctx, pad * scale, pad * scale, {
        frame,
        onGround: true,
        idle: true,
        blink: frame < blinkUntil,
        scale,
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="mx-auto block"
      aria-label="Prince, a white pixel cat sitting, with one blue eye and one hazel eye"
    />
  )
}
