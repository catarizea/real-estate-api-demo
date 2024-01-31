import { expect, test } from 'bun:test';

import { ErrorSchema, SuccessSchema } from '@/routes/property/getProperty';
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

test('GET /properties?cursorrrrr=2024-01-01T00:00:00.000Z', async () => {
  const response = await app.request(
    '/properties?cursorrrrr=2024-01-01T00:00:00.000Z',
  );
  const body = (await response.json()) as ErrorSchema;

  expect(response.status).toBe(400);
  expect(body).toHaveProperty('success');
  expect(body.success).toBe(false);
  expect(body).toHaveProperty('error');
  expect(body.error).toHaveProperty('reason');
  expect(body.error.reason).toBe('validation error');
  expect(body.error).toHaveProperty('issues');
  expect(body.error.issues).toBeInstanceOf(Array);
  expect(body.error.issues).toHaveLength(1);
});

test('GET /properties?cursor=2024-01-01T00:00:00.000', async () => {
  const response = await app.request(
    '/properties?cursor=2024-01-01T00:00:00.000',
  );
  const body = (await response.json()) as ErrorSchema;

  expect(response.status).toBe(400);
  expect(body).toHaveProperty('success');
  expect(body.success).toBe(false);
  expect(body).toHaveProperty('error');
  expect(body.error).toHaveProperty('reason');
  expect(body.error.reason).toBe('validation error');
  expect(body.error).toHaveProperty('issues');
  expect(body.error.issues).toBeInstanceOf(Array);
  expect(body.error.issues).toHaveLength(1);
});
