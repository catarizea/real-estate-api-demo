import { createId } from '@paralleldrive/cuid2';

import { db } from '@/models';
import { communityFeature } from '@/models/schema';
import { communityFeatures } from '@/utils/db/taxonomy';

const communityFeaturesLoad = async (): Promise<string[]> => {
  const ids: string[] = [];

  const values = communityFeatures.map((communityFeature) => {
    const id = createId();
    ids.push(id);

    return {
      id,
      name: communityFeature,
      order: communityFeatures.indexOf(communityFeature),
    };
  });

  await db.insert(communityFeature).values(values);

  return ids;
};

export default communityFeaturesLoad;
