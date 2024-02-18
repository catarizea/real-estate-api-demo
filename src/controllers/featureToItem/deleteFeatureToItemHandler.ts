import { z } from '@hono/zod-openapi';
import { Context } from 'hono';

import { NomenclatureTag } from '@/types';
import { badRequestResponse } from '@/utils';

import deleteBuildingFeatureToProperty from './deleteBuildingFeatureToProperty';
import deleteCommunityFeatureToCommunity from './deleteCommunityFeatureToCommunity';
import deleteFeatureToProperty from './deleteFeatureToProperty';

const deleteFeatureToItemHandler =
  (
    tag:
      | NomenclatureTag.CommunityFeatureToCommunity
      | NomenclatureTag.BuildingFeatureToProperty
      | NomenclatureTag.FeatureToProperty,
    onSuccess?: (itemId: string) => Promise<void>,
  ) =>
  async (c: Context) => {
    const itemId = c.req.param('itemId');
    const featureId = c.req.param('featureId');

    if (tag === NomenclatureTag.CommunityFeatureToCommunity) {
      const notOk = await deleteCommunityFeatureToCommunity(itemId, featureId);

      if (notOk) {
        return c.json(notOk, 400);
      }
    }

    if (tag === NomenclatureTag.BuildingFeatureToProperty) {
      const notOk = await deleteBuildingFeatureToProperty(itemId, featureId);

      if (notOk) {
        return c.json(notOk, 400);
      }
    }

    if (tag === NomenclatureTag.FeatureToProperty) {
      const notOk = await deleteFeatureToProperty(itemId, featureId);

      if (notOk) {
        return c.json(notOk, 400);
      }

      if (onSuccess) {
        await onSuccess(itemId);
      }
    }

    if (
      ![
        NomenclatureTag.CommunityFeatureToCommunity,
        NomenclatureTag.BuildingFeatureToProperty,
        NomenclatureTag.FeatureToProperty,
      ].includes(tag)
    ) {
      return c.json(
        badRequestResponse({
          reason: 'validation error',
          message: `unknown tag ${tag}`,
          path: ['tag'],
        }),
        400,
      );
    }

    return c.json({ success: z.literal(true).value });
  };

export default deleteFeatureToItemHandler;
