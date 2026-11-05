const PAL: Record<string, string> = {
  K: "#1a1414",
  W: "#fffdfa",
  P: "#f3a6b4",
  b: "#6eb5d6",
  h: "#cdaf78",
}

/**
 * Prince in profile: body sideways so the legs can walk, face turned to the
 * camera so both eyes still read. Four frames make one stride.
 */
const WALK = [
  [
    "..................K......K...",
    ".................KWK....KWK..",
    ".................KWWKKKKWWK..",
    "................KWPPWWWWPPWK.",
    "....KK..........KWWWWWWWWWWK.",
    "..KKWWK.........KWWWWWWWWWWWK",
    ".KWWWWK........KWWWKKWWWKKWWK",
    ".KWKKK...KKKKKKKWWKbbKWKhhKWK",
    "KWWK..KKKWWWWWWKWWWKKWWWKKWWK",
    "KWWK.KWWWWWWWWWKWPWWWWWWWWPWK",
    "KWWKKWWWWWWWWWWKWWWWWWPWWWWWK",
    ".KWKWWWWWWWWWWWWKWWWWKWKWWWK.",
    ".KWKWWWWWWWWWWWWWKWWWWKWWWK..",
    "..KKWWWWWWWWWWWWWWKKWWWWKK...",
    "....KWWWWWWWWWWWWWK.KKKK.....",
    ".....KWWWWWWWWWWWWK..........",
    ".....KWWWWWWWWWWWWK..........",
    ".....KWWWWKKKKKWWWK..........",
    ".....KWWWK....KWWK...........",
    ".....KWWWK....KWWK...........",
    "......KKK......KK............",
  ],
  [
    "..................K......K...",
    ".................KWK....KWK..",
    ".................KWWKKKKWWK..",
    "................KWPPWWWWPPWK.",
    "..KKKK..........KWWWWWWWWWWK.",
    ".KWWWWK.........KWWWWWWWWWWWK",
    ".KWWKK.........KWWWKKWWWKKWWK",
    "KWWK.....KKKKKKKWWKbbKWKhhKWK",
    "KWK...KKKWWWWWWKWWWKKWWWKKWWK",
    "KWWK.KWWWWWWWWWKWPWWWWWWWWPWK",
    "KWWKKWWWWWWWWWWKWWWWWWPWWWWWK",
    ".KWKWWWWWWWWWWWWKWWWWKWKWWWK.",
    "..KKWWWWWWWWWWWWWKWWWWKWWWK..",
    "...KWWWWWWWWWWWWWWKKWWWWKK...",
    "....KWWWWWWWWWWWWWK.KKKK.....",
    "....KWWWWWWWWWWWWWWK.........",
    "....KWWWWWWWWWWWKWWK.........",
    "....KWWWKWWKKKWWKWWK.........",
    "....KWWWKWWK.KWWKWWK.........",
    "....KWWWKWWK.KWWKWWK.........",
    ".....KKK.KK...KK.KK..........",
  ],
  [
    "..................K......K...",
    ".................KWK....KWK..",
    ".................KWWKKKKWWK..",
    "....KK..........KWPPWWWWPPWK.",
    "..KKWWK.........KWWWWWWWWWWK.",
    ".KWWWWK.........KWWWWWWWWWWWK",
    ".KWKKK.........KWWWKKWWWKKWWK",
    "KWWK.....KKKKKKKWWKbbKWKhhKWK",
    "KWWK..KKKWWWWWWKWWWKKWWWKKWWK",
    "KWWK.KWWWWWWWWWKWPWWWWWWWWPWK",
    ".KWWKWWWWWWWWWWKWWWWWWPWWWWWK",
    ".KWKWWWWWWWWWWWWKWWWWKWKWWWK.",
    "..KKWWWWWWWWWWWWWKWWWWKWWWK..",
    "...KWWWWWWWWWWWWWWKKWWWWKK...",
    "....KWWWWWWWWWWWWWKKKKKK.....",
    "....KWWWWWWWWWWWWKWWK........",
    "....KWWKWWWWWWWKKKWWK........",
    "....KWWKKKWWKWWK.KWWK........",
    ".....KK..KWWKKK..KWWK........",
    ".........KWWK....KWWK........",
    "..........KK......KK.........",
  ],
  [
    "..................K......K...",
    ".................KWK....KWK..",
    ".................KWWKKKKWWK..",
    "................KWPPWWWWPPWK.",
    "..KKKK..........KWWWWWWWWWWK.",
    ".KWWWWK.........KWWWWWWWWWWWK",
    ".KWWKK.........KWWWKKWWWKKWWK",
    "KWWK.....KKKKKKKWWKbbKWKhhKWK",
    "KWK...KKKWWWWWWKWWWKKWWWKKWWK",
    "KWWK.KWWWWWWWWWKWPWWWWWWWWPWK",
    "KWWKKWWWWWWWWWWKWWWWWWPWWWWWK",
    ".KWKWWWWWWWWWWWWKWWWWKWKWWWK.",
    "..KKWWWWWWWWWWWWWKWWWWKWWWK..",
    "...KWWWWWWWWWWWWWWKKWWWWKK...",
    "....KWWWWWWWWWWWWWK.KKKK.....",
    "....KWWWWWWWWWWWWWWK.........",
    "....KWWWWWWWWWWWKWWK.........",
    "....KWWWKWWKKKWWKWWK.........",
    "....KWWWKWWK.KWWKWWK.........",
    "....KWWWKWWK.KWWKWWK.........",
    ".....KKK.KK...KK.KK..........",
  ],
] as const

const STAND = WALK[3]

const JUMP = [
  "..................K......K...",
  ".................KWK....KWK..",
  ".................KWWKKKKWWK..",
  "..KKKK..........KWPPWWWWPPWK.",
  ".KWWWWK.........KWWWWWWWWWWK.",
  ".KWWKK..........KWWWWWWWWWWWK",
  "KWWK...........KWWWWWWWWWWWWK",
  "KWK......KKKKKKKWWWKKWWWKKWWK",
  "KWWK..KKKWWWWWWKWWWWWWWWWWWWK",
  "KWWK.KWWWWWWWWWKWPWWWWWWWWPWK",
  ".KWWKWWWWWWWWWWKWWWWWWPWWWWWK",
  "..KKWWWWWWWWWWWWKWWWWKWKWWWK.",
  "...KWWWWWWWWWWWWWKWWWWKWWWK..",
  "...KWWWWWWWWWWWWWWKKWWWWKK...",
  "....KWWWWWWWWWWWWWK.KKKK.....",
  "....KWWWWWWWWWWWWWWK.........",
  "....KWWWWWWWWWWWKWWK.........",
  ".....KKKKKKKKKKK.KK..........",
  ".............................",
  ".............................",
  ".............................",
] as const

export const WALKER_PX_W = STAND[0].length
export const WALKER_PX_H = STAND.length
export const WALKER_SCALE = 2

/** the sprite is drawn facing right; hit box trims the tail and ear tips */
export const WALKER_BOX = {
  x: 3 * WALKER_SCALE,
  y: 3 * WALKER_SCALE,
  w: 24 * WALKER_SCALE,
  h: 18 * WALKER_SCALE,
}

export const WALKER_W = WALKER_PX_W * WALKER_SCALE
export const WALKER_H = WALKER_PX_H * WALKER_SCALE

type WalkerOpts = {
  frame: number
  onGround: boolean
  moving: boolean
  facing: number
  scale?: number
}

export function drawPrinceWalker(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  opts: WalkerOpts,
) {
  const scale = opts.scale ?? WALKER_SCALE

  let art: readonly string[]
  if (!opts.onGround) art = JUMP
  else if (opts.moving) art = WALK[Math.floor(opts.frame / 5) % WALK.length]
  else art = STAND

  const bob = opts.onGround && !opts.moving && Math.sin(opts.frame * 0.06) > 0.4 ? 1 : 0

  ctx.save()
  ctx.imageSmoothingEnabled = false
  ctx.translate(Math.round(x), Math.round(y + bob * scale))

  for (let py = 0; py < WALKER_PX_H; py += 1) {
    const row = art[py]
    if (!row) continue
    for (let px = 0; px < WALKER_PX_W; px += 1) {
      const sx = opts.facing < 0 ? WALKER_PX_W - 1 - px : px
      const fill = PAL[row[sx]]
      if (!fill) continue
      ctx.fillStyle = fill
      ctx.fillRect(px * scale, py * scale, scale, scale)
    }
  }

  ctx.restore()
}
