/**
 * Test: GET https://fakestoreapi.com/products/1
 * - Uses Playwright's `request` fixture and `@playwright/test`
 * - Verifies status, required keys, and optional JSON Schema (Ajv)
 * - Logs product title and price
 *
 * Run: npx playwright test tests/fakestore.product.spec.ts
 * Optional: npm i ajv
 */

import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

test.describe('FakeStore API - GET /products/1', () => {
  const url = 'https://fakestoreapi.com/products/1';

  test('GET product returns 200 and expected fields', async ({ request }) => {
    const response = await request.get(url);
    console.log(`[REQUEST] GET ${url}`);
    console.log(`[RESPONSE] status: ${response.status()}`);

    // 3. Verify response status is 200
    expect(response.status()).toBe(200);

    const body: any = await response.json();
    console.log('[RESPONSE BODY]', body);

    // 4. Validate required keys exist
    const requiredKeys = ['id', 'title', 'price', 'category', 'description'];
    for (const key of requiredKeys) {
      expect(Object.prototype.hasOwnProperty.call(body, key)).toBeTruthy();
    }

    // 6. Log product title and price
    console.log(`Product title: ${body.title}`);
    console.log(`Product price: ${body.price}`);

    // 5. Optional: JSON Schema validation using Ajv
    const schema = {
      type: 'object',
      required: requiredKeys,
      properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        price: { type: 'number' },
        category: { type: 'string' },
        description: { type: 'string' }
      },
      additionalProperties: true
    } as const;

    const ajv = new Ajv();
    const validate = ajv.compile(schema as any);
    const valid = validate(body);
    if (!valid) {
      console.error('Schema validation errors:', validate.errors);
    }
    expect(valid).toBeTruthy();
  });
});
