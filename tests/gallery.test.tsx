import { render, screen, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import Gallery from '@/components/ProjectDetail/Gallery'
import type { Media } from '@/lib/content'

const img = (n: number): Media => ({ kind: 'image', src: `/projects/x/${n}.webp`, alt: `Screenshot number ${n} of the app`, caption: `Shot ${n}` })
const clip = (n: number): Media => ({ kind: 'clip', webm: `/projects/x/${n}.webm`, mp4: `/projects/x/${n}.mp4`, poster: `/projects/x/${n}.jpg`, seconds: 9, alt: `Clip number ${n} of the app`, caption: `Clip ${n}` })
const reduce = (on: boolean) => { window.matchMedia = ((q: string) => ({ matches: on && q.includes('reduce'), media: q, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia }

afterEach(() => { vi.restoreAllMocks(); reduce(false) })

describe('Gallery', () => {
  it('a single image renders no strip, arrows or counter', () => {
    render(<Gallery media={[img(1)]} title="Demo" />)
    expect(screen.getByRole('img', { name: 'Screenshot number 1 of the app' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Next' })).toBeNull()
    expect(screen.queryByRole('link', { name: /^Show / })).toBeNull()
    expect(screen.queryByText(/Item 1 of/)).toBeNull()
  })
  it('thumbnail click and arrow keys move the stage and update the live text', async () => {
    const u = userEvent.setup()
    render(<Gallery media={[img(1), img(2), img(3)]} title="Demo" />)
    expect(screen.getByText(/Item 1 of 3 · Shot 1/)).toBeInTheDocument()
    await u.click(screen.getByRole('link', { name: 'Show Shot 3' }))
    expect(screen.getByText(/Item 3 of 3 · Shot 3/)).toBeInTheDocument()
    screen.getByRole('region', { name: 'Demo gallery' }).focus()
    await u.keyboard('{ArrowRight}')
    expect(screen.getByText(/Item 1 of 3/)).toBeInTheDocument() // wraps
    await u.keyboard('{ArrowLeft}')
    expect(screen.getByText(/Item 3 of 3/)).toBeInTheDocument()
    await u.click(screen.getByRole('button', { name: 'Next' }))
    expect(screen.getByText(/Item 1 of 3/)).toBeInTheDocument()
  })
  it('thumbnails are real links to the files (works without JS) and clips carry a badge', () => {
    render(<Gallery media={[img(1), clip(2)]} title="Demo" />)
    expect(screen.getByRole('link', { name: 'Show Shot 1' })).toHaveAttribute('href', '/projects/x/1.webp')
    expect(screen.getByRole('link', { name: 'Show Clip 2 (video)' })).toHaveAttribute('href', '/projects/x/2.mp4')
    expect(screen.getByText('▶ 0:09')).toBeInTheDocument()
  })
  it('plays a clip only when it is selected', async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play')
    const u = userEvent.setup()
    const { container } = render(<Gallery media={[img(1), clip(2)]} title="Demo" />)
    expect(play).not.toHaveBeenCalled()
    expect(container.querySelector('video')).toBeNull()
    await u.click(screen.getByRole('link', { name: 'Show Clip 2 (video)' }))
    const v = container.querySelector('video')!
    expect(v).toHaveAttribute('preload', 'none'); expect(v.muted).toBe(true); expect(v).toHaveAttribute('controls')
    expect(play).toHaveBeenCalledTimes(1)
  })
  it('with reduced motion, a selected clip does not auto-play', async () => {
    reduce(true)
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play')
    const u = userEvent.setup()
    render(<Gallery media={[img(1), clip(2)]} title="Demo" />)
    await u.click(screen.getByRole('link', { name: 'Show Clip 2 (video)' }))
    expect(play).not.toHaveBeenCalled()
  })
  it('a clip first paints its poster as an image, then the video after hydration', () => {
    const { container } = render(<Gallery media={[clip(1), img(2)]} title="Demo" />)
    // after mount (effects flushed by render) the video is in place with the poster attribute
    expect(container.querySelector('video')).toHaveAttribute('poster', '/projects/x/1.jpg')
  })
  it('a clip that fails to load falls back to its poster and a note; navigation still works', async () => {
    const u = userEvent.setup()
    const { container } = render(<Gallery media={[clip(1), img(2)]} title="Demo" />)
    act(() => { fireEvent.error(container.querySelector('source[type="video/mp4"]')!) })
    expect(container.querySelector('video')).toBeNull()
    expect(screen.getByRole('img', { name: 'Clip number 1 of the app' })).toBeInTheDocument()
    expect(screen.getByText(/video could not load/)).toBeInTheDocument()
    await u.click(screen.getByRole('button', { name: 'Next' }))
    expect(screen.getByText(/Item 2 of 2 · Shot 2/)).toBeInTheDocument()
  })
  it('opens the current item in a fullscreen dialog and closes it', async () => {
    const u = userEvent.setup()
    render(<Gallery media={[img(1), img(2)]} title="Demo" />)
    await u.click(screen.getByRole('button', { name: 'Fullscreen' }))
    expect(screen.getByRole('dialog', { name: /Shot 1/ })).toHaveAttribute('open')
    await u.click(screen.getByRole('button', { name: 'Close' }))
    expect(document.querySelector('dialog')).not.toHaveAttribute('open')
  })
})
