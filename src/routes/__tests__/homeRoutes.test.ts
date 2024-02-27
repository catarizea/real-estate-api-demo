import { expect, test } from 'bun:test';

import { SuccessSchema } from '@/routes/home/getHome';
import app from '@/server';

test('GET /', async () => {
  const response = await app.request('/');
  const body = (await response.json()) as SuccessSchema;

  expect(response.status).toBe(200);
  expect(body).toHaveProperty('message');
  expect(body.message).toBeString();
});
