// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Config cho project thực hành
 * Website: https://the-internet.herokuapp.com - Nhiều scenario để học
 */
module.exports = defineConfig({
  testDir: './tests',
    fullyParallel: true,
  retries: 0,
  reporter: 'html',
  use: {
    baseURL: 'https://the-internet.herokuapp.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: false,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
