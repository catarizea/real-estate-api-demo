import { z } from '@hono/zod-openapi';
import { expect, test } from 'bun:test';

import { apiVersion, headers, postmanIds } from '@/constants';
import {
  insertCitySchemaExample,
  insertCommunitySchemaExample,
  insertFeatureSchemaExample,
  insertPropertySchemaExample,
  insertRegionSchemaExample,
  insertTypePropSchemaExample,
} from '@/models/zodSchemas';
import app from '@/server';

const successSchema = z.object({
  success: z.literal(true),
});

type SuccessSchema = z.infer<typeof successSchema>;

test('POST /region/create', async () => {
  const response = await app.request(`/${apiVersion}/region/create`, {
    method: 'POST',
    body: JSON.stringify(insertRegionSchemaExample),
    headers,
  });

  const body = (await response.json()) as SuccessSchema;

  expect(response.status).toBe(201);
  expect(body).toHaveProperty('success');
  expect(body.success).toBe(true);
});

test('POST /city/create', async () => {
  const response = await app.request(`/${apiVersion}/city/create`, {
    method: 'POST',
    body: JSON.stringify(insertCitySchemaExample),
    headers,
  });

  const body = (await response.json()) as SuccessSchema;

  expect(response.status).toBe(201);
  expect(body).toHaveProperty('success');
  expect(body.success).toBe(true);
});

test('POST /community/create', async () => {
  const response = await app.request(`/${apiVersion}/community/create`, {
    method: 'POST',
    body: JSON.stringify(insertCommunitySchemaExample),
    headers,
  });

  const body = (await response.json()) as SuccessSchema;

  expect(response.status).toBe(201);
  expect(body).toHaveProperty('success');
  expect(body.success).toBe(true);
});

test('POST /feature/create', async () => {
  const response = await app.request(`/${apiVersion}/feature/create`, {
    method: 'POST',
    body: JSON.stringify(insertFeatureSchemaExample),
    headers,
  });

  const body = (await response.json()) as SuccessSchema;

  expect(response.status).toBe(201);
  expect(body).toHaveProperty('success');
  expect(body.success).toBe(true);
});

test('POST /type-prop/create', async () => {
  const response = await app.request(`/${apiVersion}/type-prop/create`, {
    method: 'POST',
    body: JSON.stringify(insertTypePropSchemaExample),
    headers,
  });

  const body = (await response.json()) as SuccessSchema;

  expect(response.status).toBe(201);
  expect(body).toHaveProperty('success');
  expect(body.success).toBe(true);
});

test('POST /property/create', async () => {
  const response = await app.request(`/${apiVersion}/property/create`, {
    method: 'POST',
    body: JSON.stringify(insertPropertySchemaExample),
    headers,
  });

  const body = (await response.json()) as SuccessSchema;

  expect(response.status).toBe(201);
  expect(body).toHaveProperty('success');
  expect(body.success).toBe(true);
});

test('POST /feature-to-property/create', async () => {
  const response = await app.request(
    `/${apiVersion}/feature-to-property/create`,
    {
      method: 'POST',
      body: JSON.stringify({
        featureId: postmanIds.feature,
        itemId: postmanIds.property,
      }),
      headers,
    },
  );

  const body = (await response.json()) as SuccessSchema;

  expect(response.status).toBe(201);
  expect(body).toHaveProperty('success');
  expect(body.success).toBe(true);
});

test('DELETE /feature-to-property/delete', async () => {
  const response = await app.request(
    `/${apiVersion}/feature-to-property/delete/${postmanIds.feature}/${postmanIds.property}`,
    {
      method: 'DELETE',
      headers,
    },
  );

  const body = (await response.json()) as SuccessSchema;

  expect(response.status).toBe(200);
  expect(body).toHaveProperty('success');
  expect(body.success).toBe(true);
});

test('DELETE /property/delete', async () => {
  const response = await app.request(
    `/${apiVersion}/property/delete/${postmanIds.property}`,
    {
      method: 'DELETE',
      headers,
    },
  );

  const body = (await response.json()) as SuccessSchema;

  expect(response.status).toBe(200);
  expect(body).toHaveProperty('success');
  expect(body.success).toBe(true);
});

test('DELETE /type-prop/delete', async () => {
  const response = await app.request(
    `/${apiVersion}/type-prop/delete/${postmanIds.typeProp}`,
    {
      method: 'DELETE',
      headers,
    },
  );

  const body = (await response.json()) as SuccessSchema;

  expect(response.status).toBe(200);
  expect(body).toHaveProperty('success');
  expect(body.success).toBe(true);
});

test('DELETE /feature/delete', async () => {
  const response = await app.request(
    `/${apiVersion}/feature/delete/${postmanIds.feature}`,
    {
      method: 'DELETE',
      headers,
    },
  );

  const body = (await response.json()) as SuccessSchema;

  expect(response.status).toBe(200);
  expect(body).toHaveProperty('success');
  expect(body.success).toBe(true);
});

test('DELETE /community/delete', async () => {
  const response = await app.request(
    `/${apiVersion}/community/delete/${postmanIds.community}`,
    {
      method: 'DELETE',
      headers,
    },
  );

  const body = (await response.json()) as SuccessSchema;

  expect(response.status).toBe(200);
  expect(body).toHaveProperty('success');
  expect(body.success).toBe(true);
});

test('DELETE /city/delete', async () => {
  const response = await app.request(
    `/${apiVersion}/city/delete/${postmanIds.city}`,
    {
      method: 'DELETE',
      headers,
    },
  );

  const body = (await response.json()) as SuccessSchema;

  expect(response.status).toBe(200);
  expect(body).toHaveProperty('success');
  expect(body.success).toBe(true);
});

test('DELETE /region/delete', async () => {
  const response = await app.request(
    `/${apiVersion}/region/delete/${postmanIds.region}`,
    {
      method: 'DELETE',
      headers,
    },
  );

  const body = (await response.json()) as SuccessSchema;

  expect(response.status).toBe(200);
  expect(body).toHaveProperty('success');
  expect(body.success).toBe(true);
});
