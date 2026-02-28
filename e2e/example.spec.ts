import { test, expect } from '@playwright/test';

test('by property', async ({ page }) => {
  await page.goto('https://omnito.dev/');
  await page.getByRole('link', { name: 'Launch Omnito' }).click();

  await page.getByLabel('Email').fill('huydao@omnibox.com');
  await page.getByLabel('Password').fill('asdEDZ12#');
  await page.getByRole('button', {name: 'Sign In'}).click();
  await page.waitForTimeout(5000);


});
