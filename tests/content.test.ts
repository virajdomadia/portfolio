import { describe, it, expect } from 'vitest'
import { content } from '@/lib/content'
import { ContentSchema } from '@/lib/content-schema'

describe('content', () => {
  it('validates against its schema', () => { expect(() => ContentSchema.parse(content)).not.toThrow() })
  it('has five projects in the approved order', () => {
    expect(content.projects.map(p => p.slug)).toEqual(['smart-job-board', 'real-time-chat', 'e-commerce', 'expense-tracker', 'ecommerce-ui'])
  })
  it('has 22 tools across four layers', () => {
    expect(content.tools).toHaveLength(22)
    expect(new Set(content.tools.map(t => t.layer))).toEqual(new Set(['client', 'server', 'data', 'tooling']))
  })
})
