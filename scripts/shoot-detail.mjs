// Captures a project's detail-page media from its live site. Usage: pnpm shoot:detail <slug>
// Reads scripts/shots/<slug>.json → writes public/projects/<slug>/ (WebP stills; WebM + MP4 + JPG poster per clip). Fails on budget.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { chromium } from '@playwright/test'
import sharp from 'sharp'
import ffmpeg from 'ffmpeg-static'
import { validateShotList, checkBudgets, encodeArgs } from './lib/media.mjs'

const slug = process.argv[2]
if (!slug) { console.error('usage: pnpm shoot:detail <slug>'); process.exit(1) }
const list = JSON.parse(fs.readFileSync(`scripts/shots/${slug}.json`, 'utf8'))
const errs = validateShotList(list)
if (errs.length) { console.error(errs.join('\n')); process.exit(1) }

const out = `public/projects/${slug}`
fs.mkdirSync(out, { recursive: true })
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'shoot-'))
const VIEW = { width: 1600, height: 1000 }

async function run(page, steps = []) {
  for (const st of steps) {
    if (st.do === 'goto') await page.goto(list.base + st.path, { waitUntil: 'networkidle' })
    else if (st.do === 'click') await page.click(st.sel)
    else if (st.do === 'fill') await page.fill(st.sel, st.text)
    else if (st.do === 'press') await page.keyboard.press(st.key)
    else if (st.do === 'hover') await page.hover(st.sel)
    else if (st.do === 'scroll') await page.mouse.wheel(0, st.y)
    else if (st.do === 'wait') await page.waitForTimeout(st.ms)
  }
}

const browser = await chromium.launch()
for (const im of list.images ?? []) {
  const ctx = await browser.newContext({ viewport: VIEW, deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  await page.goto(list.base + im.path, { waitUntil: 'networkidle' })
  await page.waitForTimeout(im.wait ?? 2500) // let entrance animations settle
  await run(page, im.steps)
  await sharp(await page.screenshot({ type: 'png' })).webp({ quality: 80 }).toFile(`${out}/${im.name}.webp`)
  await ctx.close()
  console.log('image', im.name)
}
for (const cl of list.clips ?? []) {
  const t0 = Date.now()
  const ctx = await browser.newContext({ viewport: VIEW, deviceScaleFactor: 1, recordVideo: { dir: tmp, size: VIEW } })
  const page = await ctx.newPage()
  await page.goto(list.base + cl.path, { waitUntil: 'networkidle' })
  await page.waitForTimeout(cl.wait ?? 2500)
  const trim = (Date.now() - t0) / 1000 // cut the blank load-in from the recording
  await run(page, cl.steps)
  await page.waitForTimeout(800)
  const raw = await page.video().path()
  await ctx.close() // the recording is complete only after the context closes
  for (const [kind, ext] of [['webm', 'webm'], ['mp4', 'mp4'], ['poster', 'jpg']]) execFileSync(ffmpeg, encodeArgs[kind](raw, `${out}/${cl.name}.${ext}`, trim, cl.seconds), { stdio: 'ignore' })
  console.log('clip', cl.name)
}
await browser.close()
fs.rmSync(tmp, { recursive: true, force: true })

const files = fs.readdirSync(out).map((name) => ({ name, bytes: fs.statSync(`${out}/${name}`).size }))
for (const f of files) console.log(`${f.name.padEnd(30)} ${(f.bytes / 1048576).toFixed(2)} MB`)
const over = checkBudgets(files)
if (over.length) { console.error(over.join('\n')); process.exit(1) }
