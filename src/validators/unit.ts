import { z } from '@hono/zod-openapi';

export const unitBodySchemaExample = {
  and: [
    [
      'or',
      [
        ['eq', 'bedroomId', 'ztie6w95a0ia39zssos2p4bx'],
        ['eq', 'bedroomId', 'kcfw2qhwnky96aeeov73aaze'],
      ],
    ],
    ['eq', 'bathroomId', 'rtfvftapzbzz6czz73ss09jf'],
    ['eq', 'longterm', 1],
    ['between', 'surface', 700, 1000],
    ['eq', 'furnished', 1],
    ['eq', 'heat', 1],
    ['eq', 'water', 1],
    ['eq', 'electricity', 1],
  ],
};

export const preparedUnitSchema = z.object({
  id: z.string(),
  propertyId: z.string(),
  floorPlanId: z.string(),
  name: z.string(),
  rent: z.number().int(),
  deposit: z.number().int().nullable(),
  available: z.boolean(),
  immediate: z.boolean(),
  availableDate: z.string().nullable(),
  shortterm: z.boolean(),
  longterm: z.boolean(),
  unitNumber: z.string().nullable(),
  unitName: z.string().nullable(),
  surface: z.number().int(),
  furnished: z.boolean(),
  heat: z.boolean(),
  water: z.boolean(),
  electricity: z.boolean(),
  internet: z.boolean(),
  television: z.boolean(),
  order: z.number().int(),
  published: z.boolean(),
  bedroom: z.object({ name: z.string() }).nullable(),
  bathroom: z.object({ name: z.string() }).nullable(),
});

export type PreparedUnitSchema = z.infer<typeof preparedUnitSchema>;

export const preparedUnitForIndexSchema = z.object({
  id: z.string(),
  rent: z.number(),
  immediate: z.boolean(),
  availableDate: z.date().nullable(),
  shortterm: z.boolean(),
  longterm: z.boolean(),
  furnished: z.boolean(),
  heat: z.boolean(),
  water: z.boolean(),
  electricity: z.boolean(),
  internet: z.boolean(),
  television: z.boolean(),
  bedroom: z.object({ name: z.string() }).nullable(),
  bathroom: z.object({ name: z.string() }).nullable(),
});

export type PreparedUnitForIndexSchema = z.infer<
  typeof preparedUnitForIndexSchema
>;
