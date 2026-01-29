import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly backpackProduct: Locator;
  readonly addToCartButton: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.backpackProduct = page.locator('text=Sauce Labs Backpack');
    this.addToCartButton = page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async verifyProductsPageIsDisplayed(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await this.pageTitle.isVisible();
  }

  async verifyProductIsAvailable(productName: string): Promise<void> {
    const product = this.page.locator(`text=${productName}`);
    await product.isVisible();
  }

  async verifySauceLabsBackpackIsAvailable(): Promise<void> {
    await this.backpackProduct.isVisible();
  }

  async clickAddToCartButton(): Promise<void> {
    await this.addToCartButton.click();
  }

  async verifyCartItemCount(count: number): Promise<void> {
    const badge = this.page.locator('.shopping_cart_badge');
    await badge.isVisible();
    const text = await badge.textContent();
    const itemCount = parseInt(text || '0');
    if (itemCount !== count) {
      throw new Error(`Expected ${count} items in cart, but found ${itemCount}`);
    }
  }
}
