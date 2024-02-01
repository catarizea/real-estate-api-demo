import { z } from '@hono/zod-openapi';

const textFields = ['id', 'name'] as const;

const numericFields = ['order'] as const;

const eqTextSchema = z.tuple([z.enum(['eq']), z.enum(textFields), z.string()]);

const eqNumericSchema = z.tuple([
  z.enum(['eq']),
  z.enum(numericFields),
  z.number().int(),
]);

const orSchema = z.tuple([
  z.enum(['or']),
  z.array(z.union([eqNumericSchema, eqTextSchema])),
]);

const bathroomListSchema = z.array(
  z.union([eqNumericSchema, eqTextSchema, orSchema]),
);

export const bodyBathroomListSchema = z.object({
  and: bathroomListSchema.optional(),
});

export type BathroomListSchema = z.infer<typeof bathroomListSchema>;
