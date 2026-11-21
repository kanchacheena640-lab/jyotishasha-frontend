// lib/requestNow.ts
// One "now" per server request, shared by generateMetadata() and the page body.
//
// In the App Router both run inside the same React server render
// (next/dist/server/app-render/app-render.js renders MetadataTree in the same
// tree as the page), so React's cache() -- exported by Next's react-server
// build -- memoizes per request: the <title> date and the body date come from
// the same instant even if the request straddles IST midnight. Across requests
// nothing is shared (each request gets a fresh snapshot).
//
// Plain React 18.2 (e.g. standalone Node tests) has no `cache`; there the
// factory falls back to an un-memoized clock, which is the previous behaviour.

import { cache } from "react";

type CacheFn = <T extends (...args: never[]) => unknown>(fn: T) => T;

/** Builds the request clock; exported only so tests can inject a cache. */
export function createRequestNow(cacheImpl: CacheFn | undefined): () => Date {
  const read = () => new Date();
  return typeof cacheImpl === "function" ? cacheImpl(read) : read;
}

/** The current request's snapshot of "now" (same Date for every caller in one request). */
export const getRequestNow: () => Date = createRequestNow(
  typeof cache === "function" ? (cache as unknown as CacheFn) : undefined,
);
