export const STEP_KINDS: string[]
export const CLIP_MAX: number
export const FOLDER_MAX: number
export function validateShotList(list: unknown): string[]
export function checkBudgets(files: { name: string; bytes: number }[]): string[]
export const encodeArgs: Record<'webm' | 'mp4' | 'poster', (input: string, output: string, trim: number, seconds: number) => string[]>
