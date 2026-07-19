// lib/authority-engine/i18n.ts
// Localization utility for flat _hi suffix convention.
// Usage: loc(topic, 'title', locale) → reads topic.title or topic.title_hi.
// Field must be a valid key of obj — enforced at call sites via keyof T.

import type { Locale } from './types'

export function loc<T extends object>(
  obj: T,
  field: keyof T & string,
  locale: Locale
): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const o = obj as any
  if (locale === 'hi') {
    const hiVal = o[`${field}_hi`]
    if (typeof hiVal === 'string' && hiVal.length > 0) return hiVal
  }
  const val = o[field]
  return typeof val === 'string' ? val : ''
}

export function locArr<T extends object>(
  obj: T,
  field: keyof T & string,
  locale: Locale
): string[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const o = obj as any
  if (locale === 'hi') {
    const hiVal = o[`${field}_hi`]
    if (Array.isArray(hiVal) && hiVal.length > 0) return hiVal as string[]
  }
  const val = o[field]
  return Array.isArray(val) ? (val as string[]) : []
}
