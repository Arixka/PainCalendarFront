import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('App', () => {
    it('renders the app title', async () => {
        vi.stubEnv('VITE_API_BASE_URL', 'http://localhost:8080')
        const { default: App } = await import('./App')

        render(<App />)
        expect(screen.getByText(/Pain Calendar/i)).toBeInTheDocument()
    })
})
