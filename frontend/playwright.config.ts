import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  projects: [
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
})