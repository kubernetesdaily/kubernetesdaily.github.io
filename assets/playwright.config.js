const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests',
  workers: 1,
  use: { baseURL: process.env.SITE_URL || 'http://127.0.0.1:4180', channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome' },
});
