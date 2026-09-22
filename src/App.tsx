import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { LazyMotion, domAnimation, MotionConfig } from 'motion/react'
import { content } from './data/content'
import { profile } from './data/profile'
import { usePreferences } from './hooks/usePreferences'
import { Boot } from './components/Boot'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { Experience } from './components/Experience'
import { Projects } from './components/Projects'
import { Contact, Education, Footer, Stack } from './components/ProfileSections'

const CommandPalette = lazy(() => import('./components/CommandPalette'))
const Terminal = lazy(() => import('./components/Terminal'))

export default function App() {
  const { preferences, setPreferences } = usePreferences()
  const { locale, mode } = preferences
  const [overlay, setOverlay] = useState<'palette' | 'terminal' | null>(null)
  const [notice, setNotice] = useState('')
  const t = content[locale]
  const toggleLocale = () =>
    setPreferences((p) => ({ ...p, locale: p.locale === 'pt' ? 'en' : 'pt' }))
  const toggleTheme = () =>
    setPreferences((p) => ({ ...p, theme: p.theme === 'dark' ? 'light' : 'dark' }))
  const toggleMode = () =>
    setPreferences((p) => ({ ...p, mode: p.mode === 'recruiter' ? 'engineer' : 'recruiter' }))
  const close = useCallback(() => setOverlay(null), [])
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id) return
    let cancelled = false
    void document.fonts.ready.then(() => {
      if (!cancelled) document.getElementById(id)?.scrollIntoView({ behavior: 'instant' })
    })
    return () => {
      cancelled = true
    }
  }, [])
  useEffect(() => {
    function keydown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOverlay((previous) => (previous === 'palette' ? null : 'palette'))
      }
    }
    window.addEventListener('keydown', keydown)
    return () => window.removeEventListener('keydown', keydown)
  }, [])
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setNotice(t.copied)
    } catch {
      setNotice(t.copyFailed)
    }
  }
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <a className="skip-link" href="#main">
          {t.skip}
        </a>
        <Navigation
          preferences={preferences}
          onLocale={toggleLocale}
          onTheme={toggleTheme}
          onPalette={() => setOverlay('palette')}
        />
        <Boot locale={locale} />
        <main id="main" className="page-shell" tabIndex={-1}>
          <Hero
            locale={locale}
            mode={mode}
            onMode={(value) => setPreferences((p) => ({ ...p, mode: value }))}
            onTerminal={() => setOverlay('terminal')}
          />
          <Experience locale={locale} mode={mode} />
          <Projects locale={locale} mode={mode} />
          <Stack locale={locale} />
          <Education locale={locale} />
          <Contact locale={locale} onCopy={() => void copyEmail()} notice={notice} />
        </main>
        <Footer locale={locale} />
        <Suspense
          fallback={
            <div className="loading-indicator" role="status">
              …
            </div>
          }
        >
          {overlay === 'palette' && (
            <CommandPalette
              locale={locale}
              onClose={close}
              onLocale={toggleLocale}
              onTheme={toggleTheme}
              onMode={toggleMode}
              onCopy={() => void copyEmail()}
              onTerminal={() => setOverlay('terminal')}
            />
          )}
          {overlay === 'terminal' && <Terminal locale={locale} onClose={close} />}
        </Suspense>
      </LazyMotion>
    </MotionConfig>
  )
}
