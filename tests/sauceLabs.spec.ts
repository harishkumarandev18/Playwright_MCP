import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageclasses/LoginPage';
import { ProductsPage } from '../pageclasses/ProductsPage';

test('Complete Login and Shopping Flow', async ({ page }) => {
  // Initialize page objects
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  // Step 1: Navigate to https://www.saucedemo.com/
  await loginPage.navigateToLoginPage();
  console.log('✓ Step 1: Navigated to https://www.saucedemo.com/');

  // Step 2: Verify Login page
  await loginPage.verifyLoginPageIsDisplayed();
  console.log('✓ Step 2: Login page verified');

  // Step 3: Enter Username as standard_user
  await loginPage.enterUsername('standard_user');
  console.log('✓ Step 3: Username entered - standard_user');

  // Step 4: Enter password as secret_sauce
  await loginPage.enterPassword('secret_sauce');
  console.log('✓ Step 4: Password entered - secret_sauce');
  await page.waitForTimeout(2000);

  // Step 5: Click Login button
  await loginPage.clickLoginButton();
  console.log('✓ Step 5: Login button clicked');

  // Wait for navigation to complete
  await page.waitForURL(/.*inventory.html/, { timeout: 10000 });

  // Step 6: Verify the products page
  await productsPage.verifyProductsPageIsDisplayed();
  console.log('✓ Step 6: Products page verified');

  // Step 7: Verify Sauce Labs Backpack is available
  await productsPage.verifySauceLabsBackpackIsAvailable();
  console.log('✓ Step 7: Sauce Labs Backpack is available');

  // Step 8: Click on Add to cart
  await productsPage.clickAddToCartButton();
  console.log('✓ Step 8: Add to cart button clicked');
  await page.waitForTimeout(2000);

  // Final verification: Verify item was added to cart
  await productsPage.verifyCartItemCount(1);
  console.log('✓ Final verification: Item successfully added to cart');

  console.log('\n✅ All steps completed successfully in single flow!');
});
