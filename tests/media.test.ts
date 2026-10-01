import { describe, it, expect } from 'vitest'
import { validateShotList, checkBudgets, encodeArgs, resolveText, pickItems, CLIP_MAX } from '../scripts/lib/media.mjs'

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
    ['unknown login', { ...ok, images: [{ name: 'a', path: '/', as: 'owner' }] }, /login "owner"/],
    ['unknown setup step', { ...ok, clips: [{ ...ok.clips[0], setup: [{ do: 'dance' }] }] }, /unknown step/],
    ['unknown login step', { ...ok, logins: { owner: [{ do: 'dance' }] } }, /unknown step/],
  ])('rejects %s', (_, list, msg) => { expect(validateShotList(list).join('\n')).toMatch(msg) })
  it('accepts signed-in items, setup steps and the newer step kinds', () => {
    const list = {
      ...ok,
      logins: { owner: [{ do: 'fill', sel: '#p', text: '$ENV:PW' }, { do: 'waitFor', sel: 'main' }] },
      images: [{ name: 'desk', path: '/admin', as: 'owner' }],
      clips: [{ ...ok.clips[0], setup: [{ do: 'select', sel: '#s', value: 'Goa' }], steps: [{ do: 'type', sel: '#q', text: 'Goa' }, { do: 'click', sel: 'b', frame: 'iframe' }] }],
    }
    expect(validateShotList(list)).toEqual([])
  })
})

describe('env text', () => {
  it('replaces $ENV:NAME with the env value and leaves other text alone', () => {
    expect(resolveText('$ENV:PW', { PW: 's3cret' })).toBe('s3cret')
    expect(resolveText('Meera', {})).toBe('Meera')
  })
  it('fails loudly on a missing variable, without echoing any value', () => {
    expect(() => resolveText('$ENV:NOPE', {})).toThrow(/NOPE is not set/)
  })
})

describe('pick items', () => {
  it('keeps everything with no names, else only the named stills and clips', () => {
    expect(pickItems(ok, [])).toEqual(ok)
    const only = pickItems(ok, ['flow'])
    expect(only.images).toEqual([])
    expect(only.clips.map((c: { name: string }) => c.name)).toEqual(['flow'])
  })
  it('skips clips that write to the live site unless they are named', () => {
    const list = { ...ok, clips: [...ok.clips, { name: 'pay', path: '/', seconds: 8, writes: true }] }
    expect(pickItems(list, []).clips.map((c: { name: string }) => c.name)).toEqual(['flow'])
    expect(pickItems(list, ['pay']).clips.map((c: { name: string }) => c.name)).toEqual(['pay'])
  })
  it('rejects a name that is not in the list', () => {
    expect(() => pickItems(ok, ['nope'])).toThrow(/nope/)
  })
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
