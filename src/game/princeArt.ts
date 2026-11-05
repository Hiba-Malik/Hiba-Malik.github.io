const PAL: Record<string, string> = {
  K: "#1a1414",
  W: "#fffdfa",
  P: "#f3a6b4",
  b: "#6eb5d6",
  h: "#cdaf78",
}

/**
 * Prince, sitting: one continuous 1px outline, white fill, pink inner ears
 * and blush, one blue eye and one hazel. Symmetric apart from the tail.
 */
const IDLE = [
  "...K............K.......",
  "..KWK..........KWK......",
  "..KWWK........KWWK......",
  "..KWPWKKKKKKKKWPWK......",
  ".KWPPPWWWWWWWWPPPWK.....",
  ".KWPWWWWWWWWWWWWPWK.....",
  ".KWWWWWWWWWWWWWWWWK.....",
  "KWWWWWWWWWWWWWWWWWWK....",
  "KWWWWWWWWWWWWWWWWWWK....",
  "KWWWWWWWWWWWWWWWWWWK....",
  "KWWWKKWWWWWWWWKKWWWK....",
  "KWWKbbKWWWWWWKhhKWWK....",
  "KWWKbbKWWWWWWKhhKWWK....",
  "KWWWKKWWWWWWWWKKWWWK....",
  ".KPPWWWWWWWWWWWWPPK.....",
  ".KWWWWWWWPPWWWWWWWK.....",
  "..KWWWWWKWKWKWWWWK......",
  "...KWWWWWKWKWWWWK...KK..",
  "...KKKWWWWWWWWKKK..KWWK.",
  "...KWWKKKKKKKKWWK..KWWK.",
  "..KWWWWWWWWWWWWWWK.KWWWK",
  "..KWWWWWWWWWWWWWWK.KWWK.",
  ".KWWWWWWWWWWWWWWWWKKWWK.",
  ".KWWWWWWWWWWWWWWWWKKWWK.",
  ".KWWWWWWWWWWWWWWWWKWWK..",
  ".KWWWWWWWWWWWWWWWWKWK...",
  ".KWWWWKWWWWWWKWWWWKK....",
  "..KWWWKWWWWWWKWWWK......",
  "..KWWWKWWWWWWKWWWK......",
  "...KWWWWWWWWWWWWK.......",
  "....KKWWWWWWWWKK........",
] as const

const BLINK = [
  "...K............K.......",
  "..KWK..........KWK......",
  "..KWWK........KWWK......",
  "..KWPWKKKKKKKKWPWK......",
  ".KWPPPWWWWWWWWPPPWK.....",
  ".KWPWWWWWWWWWWWWPWK.....",
  ".KWWWWWWWWWWWWWWWWK.....",
  "KWWWWWWWWWWWWWWWWWWK....",
  "KWWWWWWWWWWWWWWWWWWK....",
  "KWWWWWWWWWWWWWWWWWWK....",
  "KWWWWWWWWWWWWWWWWWWK....",
  "KWWWKKWWWWWWWWKKWWWK....",
  "KWWKWWKWWWWWWKWWKWWK....",
  "KWWWWWWWWWWWWWWWWWWK....",
  ".KPPWWWWWWWWWWWWPPK.....",
  ".KWWWWWWWPPWWWWWWWK.....",
  "..KWWWWWKWKWKWWWWK......",
  "...KWWWWWKWKWWWWK...KK..",
  "...KKKWWWWWWWWKKK..KWWK.",
  "...KWWKKKKKKKKWWK..KWWK.",
  "..KWWWWWWWWWWWWWWK.KWWWK",
  "..KWWWWWWWWWWWWWWK.KWWK.",
  ".KWWWWWWWWWWWWWWWWKKWWK.",
  ".KWWWWWWWWWWWWWWWWKKWWK.",
  ".KWWWWWWWWWWWWWWWWKWWK..",
  ".KWWWWWWWWWWWWWWWWKWK...",
  ".KWWWWKWWWWWWKWWWWKK....",
  "..KWWWKWWWWWWKWWWK......",
  "..KWWWKWWWWWWKWWWK......",
  "...KWWWWWWWWWWWWK.......",
  "....KKWWWWWWWWKK........",
] as const

const STEP = [
  "...K............K.......",
  "..KWK..........KWK......",
  "..KWWK........KWWK......",
  "..KWPWKKKKKKKKWPWK......",
  ".KWPPPWWWWWWWWPPPWK.....",
  ".KWPWWWWWWWWWWWWPWK.....",
  ".KWWWWWWWWWWWWWWWWK.....",
  "KWWWWWWWWWWWWWWWWWWK....",
  "KWWWWWWWWWWWWWWWWWWK....",
  "KWWWWWWWWWWWWWWWWWWK....",
  "KWWWKKWWWWWWWWKKWWWK....",
  "KWWKbbKWWWWWWKhhKWWK....",
  "KWWKbbKWWWWWWKhhKWWK....",
  "KWWWKKWWWWWWWWKKWWWK....",
  ".KPPWWWWWWWWWWWWPPK.....",
  ".KWWWWWWWPPWWWWWWWK.....",
  "..KWWWWWKWKWKWWWWK......",
  "...KWWWWWKWKWWWWK...KK..",
  "...KKKWWWWWWWWKKK..KWWK.",
  "...KWWKKKKKKKKWWK..KWWK.",
  "..KWWWWWWWWWWWWWWK.KWWWK",
  "..KWWWWWWWWWWWWWWK.KWWK.",
  ".KWWWWWWWWWWWWWWWWKKWWK.",
  ".KWWWWWWWWWWWWWWWWKKWWK.",
  ".KWWWWWWWWWWWWWWWWKWWK..",
  ".KWWWWWWWWWWWWWWWWKWK...",
  ".KWWWWWWWWWWWKWWWWKK....",
  "..KWWWKWWWWWWKWWWK......",
  "..KWWWKWWWWWWKWWWK......",
  "...KWWWWWWWWWWWWK.......",
  "....KKWWWWWWWWKK........",
] as const

export const PRINCE_PX_W = IDLE[0].length
export const PRINCE_PX_H = IDLE.length
export const PRINCE_SCALE = 3
export const CAT_W = PRINCE_PX_W * PRINCE_SCALE
export const CAT_H = PRINCE_PX_H * PRINCE_SCALE

type DrawOpts = {
  frame: number
  onGround: boolean
  idle: boolean
  blink?: boolean
  facing?: number
  scale?: number
}

export function drawPrince(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  opts: DrawOpts,
) {
  const scale = opts.scale ?? PRINCE_SCALE
  const facing = opts.facing ?? 1
  const walking = !opts.idle && opts.onGround

  let art: readonly string[] = IDLE
  if (opts.blink) art = BLINK
  else if (walking && Math.floor(opts.frame / 7) % 2 === 1) art = STEP

  const bob = opts.idle && Math.sin(opts.frame * 0.06) > 0.3 ? 1 : 0

  ctx.save()
  ctx.imageSmoothingEnabled = false
  ctx.translate(Math.round(x), Math.round(y + bob * scale))

  for (let py = 0; py < PRINCE_PX_H; py += 1) {
    const row = art[py]
    for (let px = 0; px < PRINCE_PX_W; px += 1) {
      const sx = facing < 0 ? PRINCE_PX_W - 1 - px : px
      const fill = PAL[row[sx]]
      if (!fill) continue
      ctx.fillStyle = fill
      ctx.fillRect(px * scale, py * scale, scale, scale)
    }
  }

  ctx.restore()
}
