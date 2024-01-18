import { migrate } from 'drizzle-orm/planetscale-serverless/migrator';
import path from 'path';

import { db } from '@/models';

await migrate(db, { migrationsFolder: path.join(process.cwd(), 'drizzle') });
