import { useEffect, useState } from 'react'
import { readPreferences, savePreferences } from '../lib/preferences'
import { profile } from '../data/profile'

export function usePreferences() {
  const [preferences, setPreferences] = useState(readPreferences)
  useEffect(() => {
    savePreferences(preferences)
    document.documentElement.dataset.theme = preferences.theme
    document.documentElement.lang = preferences.locale === 'pt' ? 'pt-BR' : 'en'
    for (const selector of [
      'meta[name="description"]',
      'meta[property="og:description"]',
      'meta[name="twitter:description"]',
    ]) {
      document
        .querySelector(selector)
        ?.setAttribute('content', profile.description[preferences.locale])
    }
    document
      .querySelector('meta[property="og:locale"]')
      ?.setAttribute('content', preferences.locale === 'pt' ? 'pt_BR' : 'en_US')
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', preferences.theme === 'dark' ? '#0b0e11' : '#f5f7f8')
  }, [preferences])
  return { preferences, setPreferences }
}
