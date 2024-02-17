import { z } from '@hono/zod-openapi';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { postmanIds } from '@/constants';
import { media } from '@/models/schema';
import { atLeastOneFieldDefined } from '@/utils';

export const selectMediaSchema = createSelectSchema(media, {
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SelectMediaSchema = z.infer<typeof selectMediaSchema>;

export const insertMediaSchema = createInsertSchema(media);

export const insertMediaSchemaExample = {
  assetId: 'a344xpp1',
  mediaTypeId: postmanIds.mediaType,
  propertyId: postmanIds.property,
  order: 0,
};

export type InsertMediaSchema = z.infer<typeof insertMediaSchema>;

const updateSchema = z.object({
  assetId: z.string().optional(),
  mediaTypeId: z.string().optional(),
  propertyId: z.string().optional(),
  order: z.number().optional(),
});

export const updatableMediaFields: string[] = updateSchema.keyof().options;

export const updateMediaSchema = updateSchema.refine(
  (fields) => atLeastOneFieldDefined(fields, updatableMediaFields),
  {
    message: 'at least one field must be provided for update',
    path: updatableMediaFields,
  },
);

export type UpdateMediaSchema = z.infer<typeof updateMediaSchema>;

export const updateMediaSchemaExample = {
  order: 1,
};
