import { createId } from '@paralleldrive/cuid2';

import { db } from '@/models';
import { bathroom } from '@/models/schema';
import { bathrooms } from '@/utils/db/taxonomy';

const bathroomsLoad = async (): Promise<string[]> => {
  const ids: string[] = [];

  const values = bathrooms.map((bathroom) => {
    const id = createId();
    ids.push(id);

    return {
      id,
      name: bathroom,
      order: bathrooms.indexOf(bathroom),
    };
  });

  await db.insert(bathroom).values(values);

  return ids;
};

export default bathroomsLoad;
