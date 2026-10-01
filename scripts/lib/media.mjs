// Pure helpers for scripts/shoot-detail.mjs: shot-list validation, size budgets, ffmpeg arguments.
export const STEP_KINDS = ['goto', 'click', 'fill', 'type', 'select', 'press', 'hover', 'scroll', 'wait', 'waitFor']
export const CLIP_MAX = 2 * 1024 * 1024
export const FOLDER_MAX = 15 * 1024 * 1024
const mb = (b) => (b / 1048576).toFixed(2)

export function validateShotList(list) {
  const errs = []
  if (!/^https:\/\//.test(list.base ?? '')) errs.push('base must be an https URL')
  const images = list.images ?? [], clips = list.clips ?? []
  if (!images.length && !clips.length) errs.push('shot list is empty')
  const logins = list.logins ?? {}
  const badSteps = (who, steps) => { for (const st of steps ?? []) if (!STEP_KINDS.includes(st.do)) errs.push(`${who}: unknown step "${st.do}"`) }
  for (const [role, steps] of Object.entries(logins)) badSteps(`login ${role}`, steps)
  const names = new Set()
  for (const it of [...images, ...clips]) {
    if (!/^[a-z0-9-]+$/.test(it.name ?? '')) errs.push(`bad name "${it.name}" (use a-z, 0-9, -)`)
    else if (names.has(it.name)) errs.push(`duplicate name "${it.name}"`)
    names.add(it.name)
    if (!String(it.path ?? '').startsWith('/')) errs.push(`${it.name}: path must start with /`)
    badSteps(it.name, it.setup)
    badSteps(it.name, it.steps)
    if (it.as !== undefined && !Object.hasOwn(logins, it.as)) errs.push(`${it.name}: no login "${it.as}" in logins`)
  }
  for (const c of clips) if (!(Number.isInteger(c.seconds) && c.seconds >= 1 && c.seconds <= 30)) errs.push(`${c.name}: seconds must be a whole number 1–30`)
  return errs
}

// "$ENV:NAME" → the env value, so credentials live in the shell, never in the shot list.
export function resolveText(text, env = process.env) {
  const m = /^\$ENV:([A-Z0-9_]+)$/.exec(String(text))
  if (!m) return text
  if (!env[m[1]]) throw new Error(`${m[1]} is not set — export it before shooting`)
  return env[m[1]]
}

// `pnpm shoot:detail <slug> [name…]` re-shoots only the named items. A clip marked `writes` (e.g. a real
// test-mode payment) changes the live site, so it runs only when named — never in a full re-shoot.
export function pickItems(list, names) {
  if (!names.length) return { ...list, clips: (list.clips ?? []).filter((c) => !c.writes) }
  const all = [...(list.images ?? []), ...(list.clips ?? [])].map((it) => it.name)
  const missing = names.filter((n) => !all.includes(n))
  if (missing.length) throw new Error(`not in the shot list: ${missing.join(', ')}`)
  const keep = (items) => (items ?? []).filter((it) => names.includes(it.name))
  return { ...list, images: keep(list.images), clips: keep(list.clips) }
}

export function checkBudgets(files) {
  const errs = files.filter((f) => /\.(webm|mp4)$/.test(f.name) && f.bytes > CLIP_MAX).map((f) => `${f.name} is ${mb(f.bytes)} MB (max 2 MB per clip)`)
  const total = files.reduce((a, f) => a + f.bytes, 0)
  if (total > FOLDER_MAX) errs.push(`folder is ${mb(total)} MB (max 15 MB per project)`)
  return errs
}

const cut = (input, trim, seconds) => ['-y', '-ss', String(trim), '-t', String(seconds), '-i', input, '-vf', 'scale=1280:-2,fps=30', '-an']
export const encodeArgs = {
  webm: (input, output, trim, seconds) => [...cut(input, trim, seconds), '-c:v', 'libvpx-vp9', '-crf', '36', '-b:v', '0', '-row-mt', '1', output],
  mp4: (input, output, trim, seconds) => [...cut(input, trim, seconds), '-c:v', 'libx264', '-crf', '28', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', output],
  poster: (input, output, trim) => ['-y', '-ss', String(trim + 0.5), '-i', input, '-frames:v', '1', '-vf', 'scale=1280:-2', '-q:v', '3', output],
}
