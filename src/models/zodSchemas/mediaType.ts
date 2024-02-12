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
  name: 'image',
};

export type InsertMediaTypeSchema = z.infer<typeof insertMediaTypeSchema>;

export const updateMediaTypeSchema = z
  .object({
    name: z.string().optional(),
  })
  .refine(({ name }) => typeof name !== 'undefined', {
    message: 'name must be provided for update',
    path: ['name'],
  });

export type UpdateMediaTypeSchema = z.infer<typeof updateMediaTypeSchema>;

export const updateMediaTypeSchemaExample = {
  name: 'video',
};
