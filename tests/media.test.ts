import { describe, it, expect } from 'vitest'
import { validateShotList, checkBudgets, encodeArgs, CLIP_MAX } from '../scripts/lib/media.mjs'

const ok = { base: 'https://x.dev', images: [{ name: 'home', path: '/' }], clips: [{ name: 'flow', path: '/', seconds: 8, steps: [{ do: 'click', sel: 'a' }] }] }

describe('shot list', () => {
  it('accepts a valid list, images-only and clips-only', () => {
    expect(validateShotList(ok)).toEqual([])
    expect(validateShotList({ ...ok, clips: [] })).toEqual([])
    expect(validateShotList({ ...ok, images: [] })).toEqual([])
  })
  it.each([
    ['http base', { ...ok, base: 'http://x.dev' }, /https/],
    ['empty', { base: 'https://x.dev' }, /empty/],
    ['duplicate names', { ...ok, clips: [{ ...ok.clips[0], name: 'home' }] }, /duplicate/],
    ['bad name', { ...ok, images: [{ name: 'Home Page', path: '/' }] }, /bad name/],
    ['relative path', { ...ok, images: [{ name: 'a', path: 'x' }] }, /path/],
    ['unknown step', { ...ok, clips: [{ ...ok.clips[0], steps: [{ do: 'dance' }] }] }, /unknown step/],
    ['clip too long', { ...ok, clips: [{ ...ok.clips[0], seconds: 40 }] }, /seconds/],
  ])('rejects %s', (_, list, msg) => { expect(validateShotList(list).join('\n')).toMatch(msg) })
})

describe('budgets', () => {
  it('passes small files, fails a clip over 2 MB and a folder over 15 MB', () => {
    expect(checkBudgets([{ name: 'a.webm', bytes: CLIP_MAX }, { name: 'a.webp', bytes: 500_000 }])).toEqual([])
    expect(checkBudgets([{ name: 'a.mp4', bytes: CLIP_MAX + 1 }]).join()).toMatch(/a\.mp4/)
    expect(checkBudgets(Array.from({ length: 16 }, (_, i) => ({ name: `${i}.webp`, bytes: 1024 * 1024 }))).join()).toMatch(/folder/)
  })
})

describe('encode args', () => {
  it('trims the load-in, silences, and makes streamable files', () => {
    const mp4 = encodeArgs.mp4('in.webm', 'out.mp4', 2.5, 10)
    expect(mp4.slice(0, 5)).toEqual(['-y', '-ss', '2.5', '-t', '10'])
    expect(mp4).toEqual(expect.arrayContaining(['-an', '+faststart', 'libx264', 'yuv420p']))
    expect(encodeArgs.webm('in.webm', 'out.webm', 0, 8)).toEqual(expect.arrayContaining(['libvpx-vp9', '-an']))
    expect(encodeArgs.poster('in.webm', 'p.jpg', 1, 8)).toEqual(expect.arrayContaining(['-frames:v', '1']))
  })
})
