import { createId } from '@paralleldrive/cuid2';

import { db } from '@/models';
import { bedroom } from '@/models/schema';
import { bedrooms } from '@/utils/db/taxonomy';

const bedroomsLoad = async (): Promise<string[]> => {
  const ids: string[] = [];

  const values = bedrooms.map((bedroom) => {
    const id = createId();
    ids.push(id);

    return {
      id,
      name: bedroom,
      order: bedrooms.indexOf(bedroom),
    };
  });

  await db.insert(bedroom).values(values);

  return ids;
};

export default bedroomsLoad;
