import { expect, test } from 'bun:test';

import { SuccessSchema } from '@/routes/propertyRoutes';
import app from '@/server';

test('GET /properties', async () => {
  const response = await app.request('/properties');
  const body = (await response.json()) as SuccessSchema;

  expect(response.status).toBe(200);
  expect(body).toHaveProperty('data');
  expect(body.data).toBeInstanceOf(Array);
});
