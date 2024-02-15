import { z } from '@hono/zod-openapi';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { media } from '@/models/schema';

export const selectMediaSchema = createSelectSchema(media, {
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SelectMediaSchema = z.infer<typeof selectMediaSchema>;

export const insertMediaSchema = createInsertSchema(media);

export const insertMediaSchemaExample = {
  assetId: 'a344xpp1',
  mediaTypeId: 'a27vslbjwoyszaqrxw6082aa',
  propertyId: 'a1i6zw4lep7o2qrc5hdxytmv',
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
  ({ assetId, mediaTypeId, propertyId, order }) =>
    typeof assetId !== 'undefined' ||
    typeof mediaTypeId !== 'undefined' ||
    typeof propertyId !== 'undefined' ||
    typeof order !== 'undefined',
  {
    message: 'at least one field must be provided for update',
    path: updatableMediaFields,
  },
);

export type UpdateMediaSchema = z.infer<typeof updateMediaSchema>;

export const updateMediaSchemaExample = {
  order: 1,
};
