import { createId } from '@paralleldrive/cuid2';
import { MySqlTable, TableConfig } from 'drizzle-orm/mysql-core';

import { db } from '@/models';
import { logger } from '@/services';

export const prefix = '[DB SEED]';

const loadModel = async (
  model: MySqlTable<TableConfig>,
  taxonomy: string[],
  name: string,
): Promise<string[] | undefined> => {
  try {
    const ids: string[] = [];

    const values = taxonomy.map((t, index) => {
      const id = createId();
      ids.push(id);

      return {
        id,
        name: t,
        order: index,
      };
    });

    await db.insert(model).values(values);

    logger.info(`${prefix} ${name} loaded: ${ids.length} items`);

    return ids;
  } catch (_) {
    logger.error(`${prefix} ${name} loading error`);
    process.exit(1);
  }
};

export default loadModel;
