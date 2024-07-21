import { test, expect } from '@playwright/test';

test('has slido title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Slido/);
});
