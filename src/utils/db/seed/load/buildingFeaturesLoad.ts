import { createId } from '@paralleldrive/cuid2';

import { db } from '@/models';
import { buildingFeature } from '@/models/schema';
import { buildingFeatures } from '@/utils/db/taxonomy';

const buildingFeaturesLoad = async (): Promise<string[]> => {
  const ids: string[] = [];

  const values = buildingFeatures.map((buildingFeature) => {
    const id = createId();
    ids.push(id);

    return {
      id,
      name: buildingFeature,
      order: buildingFeatures.indexOf(buildingFeature),
    };
  });

  await db.insert(buildingFeature).values(values);

  return ids;
};

export default buildingFeaturesLoad;
