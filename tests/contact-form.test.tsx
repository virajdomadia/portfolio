import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import ContactForm from '@/components/Contact/ContactForm'

describe('ContactForm', () => {
  it('posts and shows the sent state', async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ ok: true }), { status: 200 }))
    vi.stubGlobal('fetch', fetchMock)
    render(<ContactForm />)
    await userEvent.click(screen.getByLabelText('A freelance project'))
    await userEvent.type(screen.getByLabelText('Your name'), 'Priya Sharma')
    await userEvent.type(screen.getByLabelText('Email'), 'priya@example.com')
    await userEvent.type(screen.getByLabelText('Message'), 'We need a booking platform built.')
    await userEvent.click(screen.getByRole('button', { name: /Send message/ }))
    await waitFor(() => expect(screen.getByText('Sent.')).toBeInTheDocument())
    expect(JSON.parse((fetchMock.mock.calls[0] as any)[1].body).intent).toBe('project')
  })
  it('shows the error with a mailto fallback and keeps the text', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ error: 'Mail is not configured. Please email me directly.' }), { status: 500 })))
    render(<ContactForm />)
    await userEvent.type(screen.getByLabelText('Your name'), 'Priya Sharma')
    await userEvent.type(screen.getByLabelText('Email'), 'priya@example.com')
    await userEvent.type(screen.getByLabelText('Message'), 'We need a booking platform built.')
    await userEvent.click(screen.getByRole('button', { name: /Send message/ }))
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent(/email me directly/))
    expect(screen.getByLabelText('Message')).toHaveValue('We need a booking platform built.')
    expect(screen.getByRole('alert').querySelector('a')).toHaveAttribute('href', expect.stringContaining('mailto:'))
  })
})
