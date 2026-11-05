import { useEffect, useRef, useState } from "react"
import { gameCopy } from "../content"
import { WALKER_BOX, WALKER_W, drawPrinceWalker } from "./princeWalker"

type Rect = { x: number; y: number; w: number; h: number }
type Ledge = Rect & { made: boolean }
type Zone = { top: number; bot: number; left: number; right: number }
type Coffee = { id: number; x: number; y: number; got: boolean }
type Status = "playing" | "won" | "dead"

type PrinceGameProps = {
  enabled: boolean
}

const GRAVITY = 0.38
const JUMP = -9.2
const MAX_SPEED = 5.6
const ACCEL = 0.9
const FRICTION = 0.84
const MAX_FALL = 14
const COYOTE = 6

/** frames of no input before Prince gives up on the camera and follows the reader */
const IDLE_BEFORE_RECALL = 45

/** vertical step stays under the jump arc (JUMP^2 / 2G ~= 111px) */
const STEP_Y = 96
const STEP_X = 118
const LEDGE_W = 84
const BLOCK_H = 8
const COFFEE_COUNT = 5

/** clearance kept above a block so it never crowds a line of copy */
const HEADROOM = 30

/** Prince walks on the real copy; every box here is also somewhere blocks avoid */
const WORLD_SELECTORS = [
  "h1",
  "h2",
  "h3",
  "p",
  "li",
  "blockquote",
  "img",
  "figure",
  "canvas",
  "a",
  "button",
  "[data-world='ledge']",
].join(",")

export function PrinceGame({ enabled }: PrinceGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hud, setHud] = useState({ got: 0, total: COFFEE_COUNT, status: "playing" as Status })
  const resetRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (!enabled) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const keys = new Set<string>()
    const prince = {
      x: 80,
      y: 200,
      vx: 0,
      vy: 0,
      onGround: false,
      facing: 1,
      frame: 0,
      coyote: 0,
    }

    let made: Ledge[] = []
    let text: Ledge[] = []
    let zones: Zone[] = []
    let coffees: Coffee[] = []
    let status: Status = "playing"
    let raf = 0
    let hudKey = ""
    let jumpLatch = false

    const docHeight = () =>
      Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)

    /**
     * One pass over the page yields two things: the small elements Prince can
     * stand on, and a box for every element so built blocks can keep out of
     * the way. Big headings make terrible platforms but must still be avoided.
     */
    const readWorld = () => {
      const platforms: Ledge[] = []
      const zones: Zone[] = []
      const scrollY = window.scrollY
      document.querySelectorAll<HTMLElement>(WORLD_SELECTORS).forEach((el) => {
        /** fixed chrome has no place in page space: its rect never scrolls */
        if (el.closest("[data-game-ui], [data-fixed]")) return
        const r = el.getBoundingClientRect()
        if (r.width < 40 || r.height < 4) return
        const top = r.top + scrollY
        zones.push({
          top: top - 8,
          bot: top + r.height + 8,
          left: r.left - 10,
          right: r.right + 10,
        })
        if (r.width >= 70 && r.height <= 90) {
          platforms.push({ x: r.left, y: top, w: r.width, h: BLOCK_H, made: false })
        }
      })
      return { platforms, zones }
    }

    /** a serpentine of blocks down the page, only ever in real whitespace */
    const buildLedges = () => {
      const bottom = docHeight() - 140
      const vw = window.innerWidth

      /** the block plus standing headroom must miss every element box */
      const blocked = (x: number, y: number) =>
        zones.find(
          (z) =>
            y - HEADROOM < z.bot &&
            y + BLOCK_H + 4 > z.top &&
            x < z.right &&
            x + LEDGE_W > z.left,
        )

      const settle = (x: number, y: number) => {
        let out = y
        for (let pass = 0; pass < 8; pass += 1) {
          const hit = blocked(x, out)
          if (!hit) return out
          out = hit.bot + HEADROOM
        }
        return null
      }

      const minX = 20
      const maxX = Math.max(minX + STEP_X, vw - LEDGE_W - 20)
      const out: Ledge[] = []
      let x = minX
      let dir = 1

      for (let y = 260; y < bottom; y += STEP_Y) {
        const at = settle(x, y)
        if (at !== null && at < bottom) {
          out.push({ x, y: at, w: LEDGE_W, h: BLOCK_H, made: true })
        }
        x += dir * STEP_X
        if (x > maxX) {
          x = maxX
          dir = -1
        } else if (x < minX) {
          x = minX
          dir = 1
        }
      }
      return out
    }

    /** every coffee sits just above one of those ledges, so it is always gettable */
    const placeCoffees = () => {
      if (made.length === 0) return []
      const out: Coffee[] = []
      for (let i = 0; i < COFFEE_COUNT; i += 1) {
        const at = Math.round(((i + 0.6) / COFFEE_COUNT) * (made.length - 1))
        const ledge = made[Math.min(at, made.length - 1)]
        out.push({
          id: i,
          x: ledge.x + ledge.w / 2 - 11,
          y: ledge.y - 34,
          got: false,
        })
      }
      return out
    }

    const spawn = () => {
      const from = window.scrollY + window.innerHeight * 0.3
      const ledge = made.find((l) => l.y > from) ?? made[0]
      if (!ledge) return
      prince.x = ledge.x + ledge.w / 2 - WALKER_W / 2
      prince.y = ledge.y - WALKER_BOX.y - WALKER_BOX.h
      prince.vx = 0
      prince.vy = 0
      prince.onGround = true
      prince.facing = 1
    }

    const measure = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.imageSmoothingEnabled = false

      const world = readWorld()
      text = world.platforms
      zones = world.zones
      made = buildLedges()
      const kept = coffees
      coffees = placeCoffees()
      if (kept.length === coffees.length) {
        coffees.forEach((c, i) => {
          c.got = kept[i].got
        })
      }
    }

    const publishHud = () => {
      const got = coffees.filter((c) => c.got).length
      const next = `${got}|${coffees.length}|${status}`
      if (next === hudKey) return
      hudKey = next
      setHud({ got, total: coffees.length || COFFEE_COUNT, status })
    }

    const reset = () => {
      measure()
      coffees.forEach((c) => {
        c.got = false
      })
      status = "playing"
      hudKey = ""
      spawn()
      publishHud()
    }
    resetRef.current = reset

    const onKey = (e: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " "].includes(e.key)) {
        e.preventDefault()
      }
      if (e.type === "keydown") keys.add(e.key.toLowerCase())
      else keys.delete(e.key.toLowerCase())
      if (e.type === "keydown" && e.key === " " && status !== "playing") reset()
    }

    const box = () => ({
      x: prince.x + WALKER_BOX.x,
      y: prince.y + WALKER_BOX.y,
      w: WALKER_BOX.w,
      h: WALKER_BOX.h,
    })

    /** while you are driving him, the page keeps him in frame */
    const follow = () => {
      const b = box()
      const screenY = b.y - window.scrollY
      const top = window.innerHeight * 0.26
      const bottom = window.innerHeight * 0.66
      let target: number | null = null
      if (screenY < top) target = b.y - top
      else if (screenY + b.h > bottom) target = b.y + b.h - bottom
      if (target === null) return
      const max = docHeight() - window.innerHeight
      window.scrollTo({ top: Math.max(0, Math.min(target, max)), behavior: "instant" })
    }

    const offScreen = () => {
      const b = box()
      const screenY = b.y - window.scrollY
      return screenY + b.h < 40 || screenY > window.innerHeight - 40
    }

    /** and when you scroll off on your own, he comes to you instead */
    const recall = () => {
      const mid = window.scrollY + window.innerHeight * 0.5
      let best: Ledge | null = null
      let bestDist = Infinity
      for (const ledge of made) {
        const screenY = ledge.y - window.scrollY
        if (screenY < 80 || screenY > window.innerHeight - 60) continue
        const d = Math.abs(ledge.y - mid)
        if (d < bestDist) {
          bestDist = d
          best = ledge
        }
      }
      if (!best) return
      prince.x = best.x + best.w / 2 - WALKER_W / 2
      prince.y = best.y - WALKER_BOX.y - WALKER_BOX.h - 40
      prince.vx = 0
      prince.vy = 0
      prince.onGround = false
    }

    let refresh = 0
    let idleFor = 0
    let last = 0

    const tick = (now: number) => {
      /** everything below is tuned per 60fps frame, so scale it by real elapsed time */
      const dt = last ? Math.min(3, Math.max(0.4, (now - last) / 16.667)) : 1
      last = now

      if (status === "playing") {
        refresh += 1
        if (refresh % 8 === 0) text = readWorld().platforms

        const left = keys.has("arrowleft") || keys.has("a")
        const right = keys.has("arrowright") || keys.has("d")
        const jump = keys.has(" ") || keys.has("arrowup") || keys.has("w")
        const drop = keys.has("arrowdown") || keys.has("s")

        if (left) prince.vx = Math.max(prince.vx - ACCEL * dt, -MAX_SPEED)
        else if (right) prince.vx = Math.min(prince.vx + ACCEL * dt, MAX_SPEED)
        else prince.vx *= Math.pow(FRICTION, dt)
        if (left) prince.facing = -1
        if (right) prince.facing = 1

        if (jump && !jumpLatch && (prince.onGround || prince.coyote > 0)) {
          prince.vy = JUMP
          prince.onGround = false
          prince.coyote = 0
          jumpLatch = true
        }
        if (!jump) jumpLatch = false

        prince.vy = Math.min(prince.vy + GRAVITY * dt, MAX_FALL)
        prince.x += prince.vx * dt
        prince.y += prince.vy * dt
        prince.frame += dt

        const limit = document.documentElement.scrollWidth - WALKER_W - 8
        if (prince.x < 8) {
          prince.x = 8
          prince.vx = 0
        } else if (prince.x > limit) {
          prince.x = limit
          prince.vx = 0
        }

        const wasOnGround = prince.onGround
        prince.onGround = false
        const b = box()
        const prevBottom = b.y + b.h - prince.vy * dt

        for (const ledge of drop ? [] : [...made, ...text]) {
          if (prince.vy < 0) break
          if (b.x + b.w < ledge.x + 3 || b.x > ledge.x + ledge.w - 3) continue
          if (prevBottom > ledge.y + 6 || b.y + b.h < ledge.y - 1) continue
          prince.y = ledge.y - WALKER_BOX.y - WALKER_BOX.h
          prince.vy = 0
          prince.onGround = true
          break
        }

        if (prince.onGround) prince.coyote = COYOTE
        else if (wasOnGround) prince.coyote = COYOTE
        else if (prince.coyote > 0) prince.coyote -= dt

        const hit = box()
        /** widen the reach by how far he travelled this frame so a fast pass never skips a cup */
        const sweepX = Math.abs(prince.vx * dt) / 2
        const sweepY = Math.abs(prince.vy * dt) / 2
        for (const coffee of coffees) {
          if (coffee.got) continue
          const cx = coffee.x + 11
          const cy = coffee.y + 13
          if (
            Math.abs(hit.x + hit.w / 2 - cx) < hit.w / 2 + 16 + sweepX &&
            Math.abs(hit.y + hit.h / 2 - cy) < hit.h / 2 + 18 + sweepY
          ) {
            coffee.got = true
          }
        }

        if (coffees.length > 0 && coffees.every((c) => c.got)) status = "won"

        const lowest = made.reduce((max, l) => Math.max(max, l.y), 0)
        if (made.length > 0 && hit.y > lowest + 320) status = "dead"

        if (left || right || jump || drop) idleFor = 0
        else idleFor += dt

        if (idleFor < IDLE_BEFORE_RECALL) follow()
        else if (offScreen()) recall()

        publishHud()
      }

      const camY = window.scrollY
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      ctx.save()
      ctx.translate(0, -camY)

      /** solid little blocks, so nothing reads as a line struck through the copy */
      for (const ledge of made) {
        const sy = ledge.y - camY
        if (sy < -20 || sy > window.innerHeight + 20) continue
        ctx.fillStyle = "rgba(0, 0, 0, 0.35)"
        ctx.fillRect(ledge.x + 2, ledge.y + BLOCK_H, ledge.w - 4, 3)
        ctx.fillStyle = "#241a1d"
        ctx.fillRect(ledge.x, ledge.y, ledge.w, BLOCK_H)
        ctx.fillStyle = "rgba(193, 18, 31, 0.8)"
        ctx.fillRect(ledge.x, ledge.y, ledge.w, 2)
        ctx.fillStyle = "rgba(244, 232, 220, 0.09)"
        for (let px = ledge.x + 6; px < ledge.x + ledge.w - 3; px += 10) {
          ctx.fillRect(px, ledge.y + 4, 2, 2)
        }
      }

      for (const coffee of coffees) {
        if (!coffee.got) drawCoffee(ctx, coffee.x, coffee.y, prince.frame)
      }

      drawPrinceWalker(ctx, prince.x, prince.y, {
        frame: prince.frame,
        onGround: prince.onGround,
        moving: Math.abs(prince.vx) > 0.35,
        facing: prince.facing,
      })
      ctx.restore()

      drawGuide(ctx, coffees, box(), camY)

      raf = requestAnimationFrame(tick)
    }

    measure()
    spawn()
    publishHud()
    window.addEventListener("keydown", onKey)
    window.addEventListener("keyup", onKey)
    window.addEventListener("resize", measure)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("keyup", onKey)
      window.removeEventListener("resize", measure)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <canvas
        ref={canvasRef}
        data-game-ui
        className="pointer-events-none fixed inset-0 z-40"
        aria-hidden
      />

      <div
        data-game-ui
        className="fixed right-5 top-20 z-50 flex items-center gap-3 rounded-full border border-line bg-ink/80 px-3 py-1.5 font-mono text-xs text-foam backdrop-blur"
      >
        <span className="size-2 rounded-full bg-blood" />
        {hud.got} / {hud.total} {gameCopy.hud}
      </div>

      {hud.status !== "playing" && (
        <div
          data-game-ui
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-6"
        >
          <div className="max-w-sm border border-line bg-panel p-8 text-center">
            <p className="font-display text-4xl text-foam">
              {hud.status === "won" ? gameCopy.winTitle : gameCopy.deadTitle}
            </p>
            <p className="mt-3 text-mute">
              {hud.status === "won" ? gameCopy.winBody : gameCopy.deadBody}
            </p>
            <button
              type="button"
              onClick={() => resetRef.current?.()}
              className="mt-6 rounded-sm bg-blood px-5 py-2 text-sm text-foam"
            >
              {gameCopy.retry}
            </button>
            <p className="mt-3 font-mono text-[11px] text-mute">{gameCopy.hint}</p>
          </div>
        </div>
      )}
    </>
  )
}

/** points at the closest coffee while it is off screen */
function drawGuide(
  ctx: CanvasRenderingContext2D,
  coffees: Coffee[],
  hit: Rect,
  camY: number,
) {
  const cy = hit.y + hit.h / 2
  let best: Coffee | null = null
  let bestDist = Infinity
  for (const coffee of coffees) {
    if (coffee.got) continue
    const d = Math.abs(coffee.y - cy)
    if (d < bestDist) {
      bestDist = d
      best = coffee
    }
  }
  if (!best) return

  const screenY = best.y - camY
  if (screenY > 40 && screenY < window.innerHeight - 40) return

  const down = screenY >= window.innerHeight - 40
  const y = down ? window.innerHeight - 26 : 26
  const x = Math.max(30, Math.min(best.x + 11, window.innerWidth - 30))

  ctx.save()
  ctx.fillStyle = "rgba(193, 18, 31, 0.9)"
  ctx.beginPath()
  ctx.moveTo(x, down ? y + 9 : y - 9)
  ctx.lineTo(x - 7, down ? y - 4 : y + 4)
  ctx.lineTo(x + 7, down ? y - 4 : y + 4)
  ctx.closePath()
  ctx.fill()
  ctx.fillStyle = "rgba(244, 232, 220, 0.85)"
  ctx.font = "10px ui-monospace, monospace"
  ctx.textAlign = "center"
  ctx.fillText(`${Math.round(bestDist)}px`, x, down ? y - 10 : y + 16)
  ctx.restore()
}

function drawCoffee(ctx: CanvasRenderingContext2D, x: number, y: number, frame: number) {
  const bob = Math.round(Math.sin(frame * 0.06) * 2)
  const top = y + bob
  ctx.fillStyle = "rgba(244, 232, 220, 0.45)"
  ctx.fillRect(x + 8, top + 1, 2, 5)
  ctx.fillRect(x + 12, top, 2, 5)
  ctx.fillStyle = "#f4e8dc"
  ctx.fillRect(x + 4, top + 8, 14, 14)
  ctx.fillStyle = "#6f4e37"
  ctx.fillRect(x + 6, top + 10, 10, 4)
  ctx.fillStyle = "#c1121f"
  ctx.fillRect(x + 4, top + 20, 14, 3)
  ctx.strokeStyle = "#f4e8dc"
  ctx.strokeRect(x + 18, top + 12, 4, 6)
}
