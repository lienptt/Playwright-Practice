import { test, expect } from '@playwright/test';

test('by Role 1', async ({ page }) => {
  await page.goto('https://omnito.dev/');
  await page.getByRole('link', { name: 'Launch Omnito' }).click();
  await page.waitForTimeout(50000);
});
