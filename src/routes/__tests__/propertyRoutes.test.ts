import { expect, test } from 'bun:test';

import { SuccessSchema } from '@/routes/propertyRoutes';
import app from '@/server';

test('GET /properties', async () => {
  const response = await app.request('/properties');
  const body = (await response.json()) as SuccessSchema;

  expect(response.status).toBe(200);
  expect(body).toHaveProperty('data');
  expect(body.data).toBeInstanceOf(Array);
  expect(body.data.length).toBeGreaterThan(0);
  expect(body.data[0]).toHaveProperty('id');
});

test('GET /properties?limit=1', async () => {
  const response = await app.request('/properties?limit=1');
  const body = (await response.json()) as SuccessSchema;

  expect(response.status).toBe(200);
  expect(body).toHaveProperty('data');
  expect(body.data).toBeInstanceOf(Array);
  expect(body.data.length).toBe(1);
  expect(body.data[0]).toHaveProperty('id');
});

test('GET /properties?cursor=2024-01-01T00:00:00.000Z', async () => {
  const response = await app.request(
    '/properties?cursor=2024-01-01T00:00:00.000Z',
  );
  const body = (await response.json()) as SuccessSchema;

  expect(response.status).toBe(200);
  expect(body).toHaveProperty('data');
  expect(body.data).toBeInstanceOf(Array);
  expect(body.data.length).toBeGreaterThan(0);
  expect(body.data[0]).toHaveProperty('id');
});
