import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import App from './App'

describe('App', () => {
  it('renders heading and increments counter', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /Vite \+ React/i })).toBeInTheDocument()
    const button = screen.getByRole('button', { name: /count is 0/i })
    fireEvent.click(button)
    expect(button).toHaveTextContent('count is 1')
  })
})
