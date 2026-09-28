import { test, expect } from '@playwright/test';

test('visiting the Playwright page', async ({ page }) => {
  await page.goto('https://playwright.dev/');
//   await page.locator('.getStarted_Sjson').click();
await page.getByText('Get started').click();
//   await expect(page).toHaveTitle(/Playwright/);
// const text = await page.getByText('enables reliable web automation for testing, scripting, and AI agents.').textContent();
//  console.log(text);
})