import { test, expect } from '@playwright/test';

test('search for data-test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByTestId('username').fill('standard_user');
})

test('basic assertions', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  const loginbutton =await page.locator('input#login-button');
  
  await expect.soft(loginbutton).toHaveCSS('background-color', 'rgb(61, 220, 145)');
  await expect.soft(loginbutton).toHaveAttribute('value', 'Login');
  // await expect.soft(loginbutton,'Button is visible').not.toBeVisible();
  await expect.soft(loginbutton).toBeVisible();
})
