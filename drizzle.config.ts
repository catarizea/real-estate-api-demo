import 'dotenv/config';

import type { Config } from 'drizzle-kit';

export default {
  schema: './src/models/schema.ts',
  out: './drizzle',
  driver: 'mysql2',
  dbCredentials: {
    uri: process.env.DATABASE_URI as string,
  },
  verbose: true,
  strict: true,
} satisfies Config;
