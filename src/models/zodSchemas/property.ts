import { z } from '@hono/zod-openapi';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { property } from '@/models/schema';
import { atLeastOneFieldDefined } from '@/utils';

export const selectPropertySchema = createSelectSchema(property, {
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SelectPropertySchema = z.infer<typeof selectPropertySchema>;

export const insertPropertySchema = createInsertSchema(property);

export const insertPropertySchemaExample = {
  name: 'Property name',
  address: '123 Main St, Calgary, AB T2P 1J9',
  latitude: '51.0447',
  longitude: '-114.0719',
  yearBuilt: 2019,
  descriptionTitle: 'Property description title',
  descriptionSubtitle: 'Property description subtitle',
  descriptionText: 'Property description text',
  typePropId: 'a5ug1fdwkkc4byl1uw9d7cqo',
  communityId: 'a5ug1fdwkkc4byl1uw9d7cqo',
  cityId: 'a5ug1fdwkkc4byl1uw9d7cqo',
  smoking: false,
  cats: true,
  dogs: false,
  petsNegotiable: true,
};

export type InsertPropertySchema = z.infer<typeof insertPropertySchema>;

const updateSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  yearBuilt: z.number().int().optional(),
  descriptionTitle: z.string().optional(),
  descriptionSubtitle: z.string().optional(),
  descriptionText: z.string().optional(),
  typePropId: z.string().optional(),
  communityId: z.string().optional(),
  cityId: z.string().optional(),
  smoking: z.boolean().optional(),
  cats: z.boolean().optional(),
  dogs: z.boolean().optional(),
  petsNegotiable: z.boolean().optional(),
  petsFee: z.number().optional(),
  petsFeeInterval: z.string().optional(),
  published: z.boolean().optional(),
  customerRanking: z.number().optional(),
  paidSearchRanking: z.boolean().optional(),
});

export const updatablePropertyFields: string[] = updateSchema.keyof().options;

export const updatePropertySchema = updateSchema.refine(
  (fields) => atLeastOneFieldDefined(fields, updatablePropertyFields),
  {
    message: 'at least one field must be provided for update',
    path: updatablePropertyFields,
  },
);

export type UpdatePropertySchema = z.infer<typeof updatePropertySchema>;

export const updatePropertySchemaExample = {
  name: 'Property name',
  address: '123 Main St, Calgary, AB T2P 1J9',
  latitude: '51.0447',
  longitude: '-114.0719',
  yearBuilt: 2020,
  descriptionTitle: 'Property description title',
  descriptionSubtitle: 'Property description subtitle',
  descriptionText: 'Property description text',
  smoking: true,
  cats: true,
  dogs: false,
  petsNegotiable: true,
  petsFee: 100,
};
