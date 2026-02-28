const { test, expect } = require('@playwright/test');

/**
 * Ví dụ đơn giản - Không dùng Page Object
 * Dùng để làm quen cú pháp test, expect
 */
test.describe('Basic Examples', () => {
  test('kiểm tra tiêu đề trang', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/The Internet/);
  });

  test('click link và kiểm tra URL', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/abtest"]');
    await expect(page).toHaveURL(/\/abtest/);
  });
});
