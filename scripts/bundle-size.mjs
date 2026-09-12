// Sums the gzipped size of every script and stylesheet the home page references. Run against `pnpm start`.
import fs from 'node:fs'
import zlib from 'node:zlib'
const html = await (await fetch('http://localhost:3000')).text()
const sum = (re, dir) => { const u = [...new Set(html.match(re) || [])]; let gz = 0; for (const x of u) gz += zlib.gzipSync(fs.readFileSync('.next' + x.replace('/_next', ''))).length; return { n: u.length, gz: Math.round(gz / 1024) } }
console.log('js', sum(/\/_next\/static\/chunks\/[^"]+\.js/g), 'css', sum(/\/_next\/static\/css\/[^"]+\.css/g), 'font-preloads', (html.match(/as="font"/g) || []).length)
