import { test, expect } from '@playwright/test';

test('Login to Swag Labs with standard_user', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://www.saucedemo.com/');

  // Verify the Login page
  await expect(page).toHaveTitle('Swag Labs');
  await expect(page.locator('[data-test="username"]')).toBeVisible();
  await expect(page.locator('[data-test="password"]')).toBeVisible();
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();

  // Enter username
  await page.locator('[data-test="username"]').fill('standard_user');

  // Enter password
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.waitForTimeout(3000);

  // Click Login button
  await page.locator('[data-test="login-button"]').click();
  await page.waitForTimeout(3000);

  // Verify successful login by checking if inventory page is loaded
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});
