import { z } from '@hono/zod-openapi';
import { Context } from 'hono';

import { db } from '@/models';
import { preparedCommunity } from '@/models/preparedStatements';
import { badRequestResponse } from '@/utils';
import { PreparedCommunitySchema } from '@/validators';

const getCommunityHandler = async (c: Context) => {
  const id = c.req.param('id');

  const communityExists = await db.query.community.findFirst({
    where: (community, { eq }) => eq(community.id, id),
  });

  if (!communityExists) {
    return c.json(
      badRequestResponse({
        reason: 'validation error',
        message: `community with id ${id} does not exist`,
        path: ['id'],
      }),
      400,
    );
  }

  const community = await preparedCommunity.execute({
    id,
  });

  return c.json({
    success: z.literal(true).value,
    data: community as PreparedCommunitySchema,
  });
};

export default getCommunityHandler;
