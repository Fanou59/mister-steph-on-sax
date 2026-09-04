import path from 'node:path'
import { defineConfig } from 'vitest/config'

// Minimal Vitest config — mirrors the `@/*` path alias from tsconfig.json
// so unit tests can import app code (e.g. `@/lib/actions`) the same way
// the app itself does.
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './'),
    },
  },
  test: {
    environment: 'node',
  },
})
