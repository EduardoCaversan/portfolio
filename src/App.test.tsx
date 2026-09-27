import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'
import { preferenceKey } from './lib/preferences'

describe('professional profile', () => {
  it('renders the correct role, career, curated projects, engineering lab and education', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Software bem construído.')
    expect(screen.getByText('Software Engineer Pleno — SustainOps')).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Celcoin' })).toBeVisible()
    expect(screen.getByText(/março de 2026/)).toBeVisible()
    expect(screen.getByRole('link', { name: 'Ver repositório: IncidentHub' })).toHaveAttribute(
      'href',
      'https://github.com/EduardoCaversan/incident-hub',
    )
    expect(screen.getByRole('link', { name: 'Open Ekklesia: Ekklesia' })).toHaveAttribute(
      'href',
      'https://eduardocaversan.github.io/ekklesia/',
    )
    expect(screen.getByRole('heading', { name: /VoIP Infrastructure Lab/ })).toBeVisible()
    expect(screen.getByRole('heading', { name: /\.NET Easy/ })).toBeVisible()
    expect(screen.getByText(/Universidade Tecnológica/)).toBeVisible()
    expect(document.body.textContent).not.toMatch(
      /MyFinance|Educa\+|SRE|CRE|Platform Engineer|DevOps Engineer/,
    )
  })
  it('switches language, updates document language, and restores persisted preferences', async () => {
    const user = userEvent.setup()
    const { unmount } = render(<App />)
    await user.click(screen.getByRole('button', { name: /Switch to English/ }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Software built with care.')
    expect(document.documentElement.lang).toBe('en')
    expect(JSON.parse(localStorage.getItem(preferenceKey)!)).toMatchObject({ locale: 'en' })
    unmount()
    render(<App />)
    expect(screen.getByRole('link', { name: 'Explore projects' })).toBeVisible()
  })
  it('persists theme and mode while retaining essential content in both modes', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Alternar tema' }))
    await user.click(screen.getByRole('button', { name: 'Engineer' }))
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(JSON.parse(localStorage.getItem(preferenceKey)!)).toMatchObject({
      theme: 'light',
      mode: 'engineer',
    })
    expect(
      [...document.querySelectorAll('.technical-details')].every((el) => el.hasAttribute('open')),
    ).toBe(true)
    await user.click(screen.getByRole('button', { name: 'Recruiter' }))
    expect(screen.getByRole('heading', { name: 'Celcoin' })).toBeVisible()
    expect(screen.getByRole('heading', { name: /IncidentHub/ })).toBeVisible()
  })
  it('filters featured projects without removing the engineering lab', async () => {
    const user = userEvent.setup()
    render(<App />)
    const section = document.getElementById('projects')!
    await user.click(within(section).getByRole('button', { name: 'Go' }))
    expect(within(section).getByRole('heading', { name: /Mini K6/ })).toBeVisible()
    expect(within(section).queryByRole('heading', { name: /IncidentHub/ })).toBeNull()
    expect(screen.getByRole('heading', { name: /\.NET Easy/ })).toBeVisible()
  })
})
