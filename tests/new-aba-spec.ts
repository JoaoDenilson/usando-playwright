import { test, expect } from '@playwright/test';

test.('control new window', async ({ page }) => {
  await page.goto('https://www.playwright.dev/');

  const pagePromise = page.context().waitForEvent('page');
  await page.locator('.gh-btn').getByText('Star').click();

  const newPage = await pagePromise;    
  await newPage.waitForLoadState();

  console.log('New page Title:', newPage.title());
  await expect(newPage).toHaveURL('https://github.com/microsoft/playwright');

  await page.bringToFront();
  await page.goto('https://www.google.com');
  await expect(page).toHaveTitle('Google');
  
  await expect(page).toHaveURL('https://www.google.com');
});      
