import { z } from '@hono/zod-openapi';

const textFields = ['id', 'name'] as const;

const numericFields = ['order'] as const;

const dateFields = ['createdAt', 'updatedAt'] as const;

const eqTextSchema = z.tuple([z.enum(['eq']), z.enum(textFields), z.string()]);

const eqNumericSchema = z.tuple([
  z.enum(['eq']),
  z.enum(numericFields),
  z.number().int(),
]);

const dateSchemaSingle = z.tuple([
  z.enum(['lt', 'gt']),
  z.enum(dateFields),
  z.string().datetime(),
]);

const dateSchemaBetween = z.tuple([
  z.enum(['between']),
  z.enum(dateFields),
  z.string().datetime(),
  z.string().datetime(),
]);

const orSchema = z.tuple([
  z.enum(['or']),
  z.array(
    z.union([
      eqNumericSchema,
      eqTextSchema,
      dateSchemaSingle,
      dateSchemaBetween,
    ]),
  ),
]);

const bathroomListSchema = z.array(
  z.union([
    eqNumericSchema,
    eqTextSchema,
    dateSchemaSingle,
    dateSchemaBetween,
    orSchema,
  ]),
);

export const bodyBathroomListSchema = z.object({
  and: bathroomListSchema.optional(),
});

export type BathroomListSchema = z.infer<typeof bathroomListSchema>;
