// Writes public/llms.txt and public/llms-full.txt from lib/content.ts. Run: pnpm gen:llms (also runs as `prebuild`).
import fs from 'node:fs'
import { content as c } from '../lib/content.ts'
import { llmsText, llmsFullText } from './llms.mjs'
import { guides } from '../lib/guides.ts'

const site = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://virajdomadia.com').replace(/\/+$/, '')
fs.writeFileSync('public/llms.txt', llmsText(c, site, guides))
fs.writeFileSync('public/llms-full.txt', llmsFullText(c, site, guides))
console.log('wrote public/llms.txt + llms-full.txt')
