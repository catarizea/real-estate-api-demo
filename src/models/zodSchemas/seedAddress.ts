import { z } from '@hono/zod-openapi';
import { createSelectSchema } from 'drizzle-zod';

import { seedAddress } from '@/models/schema';

export const selectSeedAddressSchema = createSelectSchema(seedAddress, {
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SelectSeedAddressSchema = z.infer<typeof selectSeedAddressSchema>;
