// spec: Exploratory script
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Exploratory script', () => {
  test('Exploratory script: login and capture locators and screenshots', async ({ page }) => {
    // 1) Open OrangeHRM login page for exploratory script
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // 2) Fill Username 'Admin' and Password 'admin123' and submit
    await page.locator('input[name="username"], input[placeholder*="Username"]').first().fill('Admin');
    await page.locator('input[type="password"], input[name*="password"]').first().fill('admin123');
    await page.locator('button[type="submit"], button:has-text("Login"), button:has-text("log in")').first().click();

    // 3) Wait for Dashboard heading to confirm successful login
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({ timeout: 15000 });

    // 4) Capture dashboard screenshot
    await page.screenshot({ path: 'artifacts/dashboard.png', fullPage: true });

    // 5) Extract top navigation items and iterate
    const menuItems = await page.locator('.oxd-main-menu-item').allInnerTexts();
    for (const rawText of menuItems) {
      const text = (rawText || '').trim();
      if (!text) continue;

      // Click the menu item by its visible menu selector (re-query each time to avoid stale handles)
      const menuLocator = page.locator(`.oxd-main-menu-item:has-text("${text}")`).first();
      const exists = (await menuLocator.count()) > 0;
      if (!exists) {
        console.log('menu item not found or not clickable, skipping:', text);
        continue;
      }
      try {
        await menuLocator.click({ timeout: 15000 });
      } catch (e) {
        console.log('click failed for menu item, skipping:', text, (e as Error).message || String(e));
        continue;
      }

      // After navigation, capture a screenshot for this module
      const safeName = text.replace(/[^a-z0-9_\-]/gi, '_').slice(0, 80);
      await page.screenshot({ path: `tests/artifacts/page_${safeName}.png`, fullPage: true });

      // Capture a small DOM summary (counts of interactive elements)
      const counts = {
        links: await page.locator('a').count(),
        buttons: await page.locator('button').count(),
        inputs: await page.locator('input').count(),
        selects: await page.locator('select').count(),
        forms: await page.locator('form').count(),
      };
      // Attach a small assertion to ensure the page loaded (no crash)
      await expect(page).toHaveTitle(/OrangeHRM/);

      // Log a brief message to the test output
      console.log({ page: safeName, url: page.url(), counts });
    }
  });
});