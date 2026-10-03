import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});

// Test suite for login page functionality
// Success login
test.describe('Login Page success', () => {          
  test('check login functionality', async ({ page }) => {
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    const productslabel = await page.locator('[data-test="title"]');
    await expect(productslabel).toHaveText('Products');
    //await expect(page.getByTestId('inventory_container')).toBeVisible();
  })
});

test.describe('Login page failed', () => {  
  //User locked out
  test('check login functionality - locked out user', async ({ page }) => {    
    const errolabel = await page.locator('[data-test="error"]');
    await expect(errolabel).not.toBeVisible();

    await page.getByTestId('username').fill('locked_out_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();
    
    
    await expect(errolabel).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    await expect(errolabel).toBeVisible();
  });

  //Wrong password
  test('check login functionality - wrong password', async ({ page }) => { 
    const errolabel = await page.locator('[data-test="error"]');
    await expect(errolabel).not.toBeVisible();

    await page.getByTestId('username').fill('standard_user');   
    await page.getByTestId('password').fill('wrong_password');
    await page.getByTestId('login-button').click();
      
    await expect(errolabel).toHaveText('Epic sadface: Username and password do not match any user in this service');
    await expect(errolabel).toBeVisible();
  });

  test.afterAll(async ({ page }) => {
    await page.close();
    console.log('All tests completed.');
  });
});
