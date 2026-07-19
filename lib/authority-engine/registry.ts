// lib/authority-engine/registry.ts
//
// DOMAIN_MANIFEST is the single addition point for new domains.
// Adding a domain:
//   1. Add its slug string to DOMAIN_MANIFEST
//   2. TypeScript immediately errors on the missing import + record entry below
//   3. Add the import + entry — done.
//
// Record<DomainSlug, AuthorityDomain> enforces completeness:
// every slug in the manifest must have a registered domain, and no extra slugs are allowed.
//
// Evolution path: when domain count exceeds ~20, replace this file with a codegen script
// (scripts/generate-registry.ts) that scans lib/domains/*/_index.ts and writes this file.
// The interface to resolver.ts stays identical.

import type { AuthorityDomain } from './types'

// ─── Manifest ────────────────────────────────────────────────────────────────
// The only place to declare that a domain exists.

export const DOMAIN_MANIFEST = [
  'financial-astrology',
  // 'marriage-astrology',
  // 'health-astrology',
  // 'property-astrology',
  // 'education-astrology',
  // 'foreign-settlement-astrology',
] as const

export type DomainSlug = typeof DOMAIN_MANIFEST[number]

// ─── Domain Imports ───────────────────────────────────────────────────────────
// One import per manifest entry. Compiler errors here if you add a slug above
// without creating the corresponding lib/domains/<slug>/_index.ts file.

import { financialAstrologyDomain } from '@/lib/domains/financial-astrology/_index'
// import { marriageAstrologyDomain }  from '@/lib/domains/marriage-astrology/_index'

// ─── Registry ─────────────────────────────────────────────────────────────────
// Record<DomainSlug, AuthorityDomain> — TypeScript errors if any slug is missing.

export const authorityRegistry: Record<DomainSlug, AuthorityDomain> = {
  'financial-astrology': financialAstrologyDomain,
  // 'marriage-astrology':  marriageAstrologyDomain,
}
