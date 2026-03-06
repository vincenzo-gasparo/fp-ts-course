// next.config.mjs
// Source: https://nextjs.org/docs/app/guides/static-exports
import { build } from 'velite'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // In CI (Model B deploy), each course is served from a subdirectory
  basePath: process.env.CI ? '/fp-ts-course' : '',
}

// Velite integration — Turbopack-compatible (uses programmatic API, not VeliteWebpackPlugin)
// Reference: https://velite.js.org/guide/with-nextjs
if (process.env.NODE_ENV === 'development') {
  await build({ watch: true, clean: true })
} else {
  await build({ clean: true })
}

export default nextConfig
