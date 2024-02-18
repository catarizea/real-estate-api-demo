import { z } from '@hono/zod-openapi';
import { Context } from 'hono';

import { NomenclatureTag } from '@/types';
import { FeatureToItemSchema } from '@/validators';

import createBuildingFeatureToProperty from './createBuildingFeatureToProperty';
import createCommunityFeatureToCommunity from './createCommunityFeatureToCommunity';
import createFeatureToProperty from './createFeatureToProperty';

const postCreateFeatureToItemHandler =
  (
    tag:
      | NomenclatureTag.CommunityFeatureToCommunity
      | NomenclatureTag.FeatureToProperty
      | NomenclatureTag.BuildingFeatureToProperty,
    onSuccess?: (itemId: string) => Promise<void>,
  ) =>
  async (c: Context) => {
    const body: FeatureToItemSchema = await c.req.json();

    if (tag === NomenclatureTag.CommunityFeatureToCommunity) {
      const notOk = await createCommunityFeatureToCommunity(body);

      if (notOk) {
        return c.json(notOk, 400);
      }
    }

    if (tag === NomenclatureTag.FeatureToProperty) {
      const notOk = await createFeatureToProperty(body);

      if (notOk) {
        return c.json(notOk, 400);
      }

      if (onSuccess) {
        await onSuccess(body.itemId);
      }
    }

    if (tag === NomenclatureTag.BuildingFeatureToProperty) {
      const notOk = await createBuildingFeatureToProperty(body);

      if (notOk) {
        return c.json(notOk, 400);
      }
    }

    return c.json({ success: z.literal(true).value }, 201);
  };

export default postCreateFeatureToItemHandler;
