import { z } from '@hono/zod-openapi';
import { createSelectSchema } from 'drizzle-zod';

import { property } from './schema';

export const selectPropertySchema = createSelectSchema(property, {
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SelectPropertySchema = z.infer<typeof selectPropertySchema>;
