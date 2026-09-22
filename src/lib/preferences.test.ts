import { describe, expect, it, vi } from 'vitest'
import { defaults, preferenceKey, readPreferences, savePreferences } from './preferences'

describe('preferences', () => {
  it('defaults to Portuguese, dark theme and Recruiter', () =>
    expect(readPreferences()).toEqual(defaults))
  it('persists all preferences', () => {
    const value = { locale: 'en', mode: 'engineer', theme: 'light' } as const
    savePreferences(value)
    expect(readPreferences()).toEqual(value)
  })
  it.each(['not json', 'null', '[]', '{"locale":"fr","theme":"neon","mode":"admin"}'])(
    'recovers from corrupted or unsupported data: %s',
    (value) => {
      localStorage.setItem(preferenceKey, value)
      expect(readPreferences()).toEqual(defaults)
    },
  )
  it('remains usable when browser storage is unavailable', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    expect(readPreferences()).toEqual(defaults)
    expect(() => savePreferences(defaults)).not.toThrow()
  })
})
