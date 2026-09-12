import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
    css: { modules: { classNameStrategy: 'non-scoped' } },
  },
  // tests don't need Tailwind; an inline config stops Vite loading Next's postcss.config.mjs
  css: { postcss: { plugins: [] } },
  resolve: { alias: { '@': path.resolve(__dirname, '.') } },
})
