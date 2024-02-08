import { z } from '@hono/zod-openapi';

export const parkingsByPropertySuccessSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    fee: z.nullable(z.number().int()),
    feeInterval: z.nullable(z.string()),
    order: z.number().int(),
  }),
);

export const parkingBodySchemaExample = {
  and: [
    [
      'or',
      [
        ['eq', 'name', 'Outdoor'],
        ['eq', 'name', 'Covered'],
      ],
    ],
    ['eq', 'order', 1],
    ['eq', 'fee', 100],
    ['eq', 'feeInterval', 'monthly'],
    ['lt', 'createdAt', '2024-01-01T00:00:00.000Z'],
    ['gt', 'updatedAt', '2024-01-01T00:00:00.000Z'],
    [
      'between',
      'createdAt',
      '2024-01-01T00:00:00.000Z',
      '2024-01-02T00:00:00.000Z',
    ],
  ],
};
