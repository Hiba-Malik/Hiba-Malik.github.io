import { useEffect, useRef } from "react"

type Cell = {
  nx: number
  ny: number
  dx: number
  dy: number
  vx: number
  vy: number
  ch: string
  fill: string
}

const RAMP = " .:-=+*#%@"
const SRC = "/portraits/red-night.jpeg"

export function InferencePortrait() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const pointer = { x: -9999, y: -9999, active: false }
    let cells: Cell[] = []
    let source: HTMLImageElement | null = null
    let raf = 0
    let running = true
    let sampledKey = ""
    let scan = reduced ? 1 : 0
    let phase: "scan" | "hold" | "rewind" = reduced ? "hold" : "scan"
    let holdUntil = 0
    let last = 0

    const coverDraw = (
      target: CanvasRenderingContext2D,
      img: HTMLImageElement,
      w: number,
      h: number,
    ) => {
      const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight)
      const dw = img.naturalWidth * scale
      const dh = img.naturalHeight * scale
      target.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh)
    }

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.max(1, Math.round(wrap.clientWidth))
      const h = Math.max(1, Math.round(wrap.clientHeight))
      const bw = Math.round(w * dpr)
      const bh = Math.round(h * dpr)
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw
        canvas.height = bh
        canvas.style.width = `${w}px`
        canvas.style.height = `${h}px`
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      return { w, h }
    }

    const layoutReady = (w: number, h: number) => w >= 160 && h >= w * 1.15

    const sample = (img: HTMLImageElement, w: number, h: number) => {
      const key = `${w}x${h}`
      if (key === sampledKey && cells.length > 0) return

      const off = document.createElement("canvas")
      off.width = w
      off.height = h
      const octx = off.getContext("2d", { willReadFrequently: true })
      if (!octx) return
      octx.fillStyle = "#0b0707"
      octx.fillRect(0, 0, w, h)
      coverDraw(octx, img, w, h)
      const { data } = octx.getImageData(0, 0, w, h)

      const colGap = 6
      const rowGap = 9
      const next: Cell[] = []

      for (let y = 5; y < h - 2; y += rowGap) {
        for (let x = 4; x < w - 2; x += colGap) {
          const i = (Math.floor(y) * w + Math.floor(x)) * 4
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          const lum = (r * 0.299 + g * 0.587 + b * 0.114) / 255
          if (lum < 0.055) continue

          const boosted = Math.min(1, Math.pow(lum * 1.35, 0.7))
          const ramp = Math.min(
            RAMP.length - 1,
            Math.max(1, Math.round(boosted * (RAMP.length - 1))),
          )
          const chroma = r - Math.max(g, b)
          const isBlood = chroma > 28 && r > 90
          const alpha = 0.45 + boosted * 0.55
          const fill = isBlood
            ? `rgba(193, 18, 31, ${Math.max(0.7, alpha)})`
            : `rgba(244, 232, 220, ${alpha})`

          next.push({
            nx: x / w,
            ny: y / h,
            dx: 0,
            dy: 0,
            vx: 0,
            vy: 0,
            ch: RAMP[ramp],
            fill,
          })
        }
      }

      cells = next
      sampledKey = key
    }

    const step = (now: number) => {
      if (!running) return
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016
      last = now
      const { w, h } = sizeCanvas()
      if (source && layoutReady(w, h)) sample(source, w, h)

      if (!reduced) {
        if (phase === "scan") {
          scan = Math.min(1, scan + dt / 2.4)
          if (scan >= 1) {
            phase = "hold"
            holdUntil = now + 2800
          }
        } else if (phase === "hold") {
          if (now > holdUntil) phase = "rewind"
        } else {
          scan = Math.max(0, scan - dt / 1.4)
          if (scan <= 0) phase = "scan"
        }
      }

      const scanY = h * scan

      ctx.fillStyle = "#0b0707"
      ctx.fillRect(0, 0, w, h)

      if (source && scan < 0.999) {
        ctx.save()
        ctx.beginPath()
        ctx.rect(0, scanY, w, h - scanY)
        ctx.clip()
        coverDraw(ctx, source, w, h)
        ctx.restore()
      }

      const radius = pointer.active ? 108 : 78
      const radius2 = radius * radius
      ctx.font = '8px "JetBrains Mono", ui-monospace, monospace'
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      for (const cell of cells) {
        const ox = cell.nx * w
        const oy = cell.ny * h
        if (oy > scanY + 6) continue

        if (!reduced) {
          const x = ox + cell.dx
          const y = oy + cell.dy
          const pdx = x - pointer.x
          const pdy = y - pointer.y
          const d2 = pdx * pdx + pdy * pdy
          if (pointer.active && d2 < radius2 && d2 > 0.4) {
            const d = Math.sqrt(d2)
            const force = ((radius - d) / radius) * 3.6
            cell.vx += (pdx / d) * force
            cell.vy += (pdy / d) * force
          }
          cell.vx += -cell.dx * 0.08
          cell.vy += -cell.dy * 0.08
          cell.vx *= 0.8
          cell.vy *= 0.8
          cell.dx += cell.vx
          cell.dy += cell.vy
        }

        ctx.fillStyle = cell.fill
        ctx.fillText(cell.ch, ox + cell.dx, oy + cell.dy)
      }

      if (scan > 0.01 && scan < 0.99) {
        const glow = ctx.createLinearGradient(0, scanY - 18, 0, scanY + 18)
        glow.addColorStop(0, "rgba(193, 18, 31, 0)")
        glow.addColorStop(0.45, "rgba(193, 18, 31, 0.28)")
        glow.addColorStop(0.5, "rgba(244, 232, 220, 0.85)")
        glow.addColorStop(0.55, "rgba(193, 18, 31, 0.35)")
        glow.addColorStop(1, "rgba(193, 18, 31, 0)")
        ctx.fillStyle = glow
        ctx.fillRect(0, scanY - 18, w, 36)
        ctx.fillStyle = "#c1121f"
        ctx.fillRect(0, scanY - 1, w, 2)
      }

      raf = requestAnimationFrame(step)
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active = true
    }
    const onLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
      pointer.active = false
    }
    const onClick = () => {
      if (reduced) return
      scan = 0
      phase = "scan"
    }

    const waitForLayout = () =>
      new Promise<void>((resolve) => {
        const check = () => {
          if (!running) return
          const w = wrap.clientWidth
          const h = wrap.clientHeight
          if (layoutReady(w, h)) {
            resolve()
            return
          }
          requestAnimationFrame(check)
        }
        check()
      })

    const ro = new ResizeObserver(() => {
      sampledKey = ""
    })
    ro.observe(wrap)

    let cancelled = false
    void (async () => {
      const img = await loadImage(SRC)
      await img.decode().catch(() => undefined)
      await waitForLayout()
      if (cancelled) return
      source = img
      const { w, h } = sizeCanvas()
      sample(img, w, h)
      raf = requestAnimationFrame(step)
    })()

    canvas.addEventListener("pointermove", onMove)
    canvas.addEventListener("pointerleave", onLeave)
    canvas.addEventListener("click", onClick)

    return () => {
      cancelled = true
      running = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener("pointermove", onMove)
      canvas.removeEventListener("pointerleave", onLeave)
      canvas.removeEventListener("click", onClick)
    }
  }, [])

  return (
    <div ref={wrapRef} className="relative aspect-[4/5] w-full bg-ink">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 size-full cursor-crosshair touch-none"
        aria-label="Portrait of Hiba Malik. A scan line converts the photo into ASCII glyphs. Move the cursor to scatter them."
      />
    </div>
  )
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}
