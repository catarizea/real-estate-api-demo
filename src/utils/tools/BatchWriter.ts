import { Placeholder, SQL } from 'drizzle-orm';
import { MySqlTable, TableConfig } from 'drizzle-orm/mysql-core';

import { db } from '@/models';

class BatchWriter<
  M extends MySqlTable<TableConfig>,
  V extends {
    [Key in keyof M['$inferInsert']]:
      | SQL<unknown>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      | Placeholder<string, any>
      | M['$inferInsert'][Key];
  },
> {
  private model: M;
  private data: V[] = [];
  private batchSize: number;

  constructor({ model, batchSize }: { model: M; batchSize: number }) {
    this.batchSize = batchSize;
    this.model = model;
  }

  load = (item: V) => this.data.push(item);

  execute = () =>
    new Promise<void>((resolve, reject) => {
      const func = async () => {
        if (this.data.length < this.batchSize) {
          try {
            await db.insert(this.model).values(this.data);
            resolve();
          } catch (error) {
            reject(error);
          }
        } else {
          const data = this.data.slice(0, this.batchSize);

          try {
            await db.insert(this.model).values(data);
            this.data = this.data.slice(this.batchSize);
            func();
          } catch (error) {
            reject(error);
          }
        }
      };

      func();
    });
}

export default BatchWriter;
