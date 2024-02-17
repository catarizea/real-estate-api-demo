import { z } from '@hono/zod-openapi';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { mediaType } from '@/models/schema';

export const selectMediaTypeSchema = createSelectSchema(mediaType, {
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SelectMediaTypeSchema = z.infer<typeof selectMediaTypeSchema>;

export const insertMediaTypeSchema = createInsertSchema(mediaType);

export const insertMediaTypeSchemaExample = {
  name: 'postman test media type',
};

export type InsertMediaTypeSchema = z.infer<typeof insertMediaTypeSchema>;

const updateSchema = z.object({
  name: z.string().optional(),
});

export const updatableMediaTypeFields: string[] = updateSchema.keyof().options;

export const updateMediaTypeSchema = updateSchema.refine(
  ({ name }) => typeof name !== 'undefined',
  {
    message: 'name must be provided for update',
    path: updatableMediaTypeFields,
  },
);

export type UpdateMediaTypeSchema = z.infer<typeof updateMediaTypeSchema>;

export const updateMediaTypeSchemaExample = {
  name: 'postman test media type update',
};
