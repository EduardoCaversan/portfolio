import type { Locale, Mode, Theme } from '../data/types'
export interface Preferences {
  locale: Locale
  theme: Theme
  mode: Mode
}
export const preferenceKey = 'ec.preferences.v1'
export const defaults: Preferences = { locale: 'pt', theme: 'dark', mode: 'recruiter' }
export function readPreferences(): Preferences {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(preferenceKey) ?? 'null')
    if (!value || typeof value !== 'object') return defaults
    const p = value as Record<string, unknown>
    return {
      locale: p.locale === 'en' ? 'en' : 'pt',
      theme: p.theme === 'light' ? 'light' : 'dark',
      mode: p.mode === 'engineer' ? 'engineer' : 'recruiter',
    }
  } catch {
    return defaults
  }
}
export function savePreferences(preferences: Preferences): void {
  try {
    localStorage.setItem(preferenceKey, JSON.stringify(preferences))
  } catch {
    /* Preferences still work when storage is blocked. */
  }
}
