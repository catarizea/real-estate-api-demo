import { db } from '@/models';
import { community } from '@/models/schema';

const communitiesIds = async () => {
  const communities = await db
    .select({
      id: community.id,
      name: community.name,
    })
    .from(community);

  const ids: { [key: string]: string } = {};

  communities.forEach((c) => {
    ids[c.name] = c.id;
  });

  return ids;
};

export default communitiesIds;
