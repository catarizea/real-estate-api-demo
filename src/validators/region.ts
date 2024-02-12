import { z } from '@hono/zod-openapi';

export const regionBodySchemaExample = {
  and: [
    [
      'or',
      [
        ['eq', 'name', 'Alberta'],
        ['eq', 'name', 'Manitoba'],
      ],
    ],
    [
      'between',
      'createdAt',
      '2024-01-23T00:00:00.000Z',
      '2024-02-12T00:00:00.000Z',
    ],
  ],
};

export const preparedRegionSchema = z.object({
  id: z.string(),
  name: z.string(),
  administrativeName: z.string(),
  cities: z.array(z.object({ id: z.string(), name: z.string() }).optional()),
});

export type PreparedRegionSchema = z.infer<typeof preparedRegionSchema>;
