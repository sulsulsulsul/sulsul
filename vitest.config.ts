import { loadEnvConfig } from '@next/env'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

const projectDir = process.cwd()
loadEnvConfig(projectDir)

export default defineConfig({
  plugins: [react(), tsconfigPaths()],

  test: {
    globals: true,
    environment: 'jsdom',
    clearMocks: true,
    mockReset: true,
    setupFiles: ['./vitest.setup.ts'],
  },
})
