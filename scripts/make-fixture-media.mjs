// Generates the tiny committed media used by lib/fixtures/detail.ts (unit + e2e). Run once: pnpm gen:fixture-media
import fs from 'node:fs'
import { execFileSync } from 'node:child_process'
import sharp from 'sharp'
import ffmpeg from 'ffmpeg-static'

const out = 'public/projects/_fixture'
fs.mkdirSync(out, { recursive: true })
for (const [name, bg] of [['one', '#1C3BFF'], ['two', '#FFC800']]) await sharp({ create: { width: 1600, height: 1000, channels: 3, background: bg } }).webp({ quality: 60 }).toFile(`${out}/${name}.webp`)
const src = ['-y', '-f', 'lavfi', '-i', 'testsrc=size=1280x800:rate=30', '-t', '3', '-an']
execFileSync(ffmpeg, [...src, '-c:v', 'libvpx-vp9', '-crf', '50', '-b:v', '0', `${out}/flow.webm`], { stdio: 'ignore' })
execFileSync(ffmpeg, [...src, '-c:v', 'libx264', '-crf', '40', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `${out}/flow.mp4`], { stdio: 'ignore' })
execFileSync(ffmpeg, ['-y', '-f', 'lavfi', '-i', 'testsrc=size=1280x800:rate=1', '-frames:v', '1', `${out}/flow.jpg`], { stdio: 'ignore' })
for (const f of fs.readdirSync(out)) console.log(f, fs.statSync(`${out}/${f}`).size, 'bytes')
