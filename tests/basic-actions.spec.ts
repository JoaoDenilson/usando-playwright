import { test, expect } from '@playwright/test';

test('valid checkbox', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/checkboxes');

    // Check first item.
    const firstTodo = page.getByTestId('todo-item').nth(0);
    await firstTodo.getByRole('checkbox').check();
    //await firstTodo.getByRole('checkbox').uncheck();
    await expect(firstTodo).toHaveClass('completed');

    // Check second item.
    const secondTodo = page.getByTestId('todo-item').nth(1);
    await expect(secondTodo).not.toHaveClass('completed');
    await secondTodo.getByRole('checkbox').check();

    // Assert completed class.
    await expect(firstTodo).toHaveClass('completed');
    await expect(secondTodo).toHaveClass('completed');
})

test('valid dropdown', async ({ page }) => {
    //dropdown
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    const dropdown = page.locator('select#dropdown');
    await dropdown.selectOption('1');
    await expect(dropdown).toHaveValue('1');

    await dropdown.selectOption({ label: 'Option 2' });
    await expect(dropdown).toHaveValue('2');
})
    
test('valid hover', async ({ page }) => {
    //hover
    await page.goto('https://the-internet.herokuapp.com/hovers');
    const img1 = page.locator('div.figure').nth(0);
    const img2 = page.locator('div.figure').nth(1);
    const img3 = page.locator('div.figure').nth(2);

    const imginfo1 = img1.locator('.figcaption');
    const imginfo2 = img2.locator('.figcaption');
    const imginfo3 = img3.locator('.figcaption');

    await img1.hover();

    await expect(imginfo1).toBeVisible();
    await expect(imginfo2).not.toBeVisible();
    await expect(imginfo3).not.toBeVisible();

    await img2.hover();

    await expect(imginfo1).not.toBeVisible();
    await expect(imginfo2).toBeVisible();
    await expect(imginfo3).not.toBeVisible();

    await imginfo2.getByRole('link', { name: 'View profile' }).click();

    await expect(page).toHaveURL('https://the-internet.herokuapp.com/users/2');
})