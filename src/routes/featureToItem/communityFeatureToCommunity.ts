import { OpenAPIHono } from '@hono/zod-openapi';

import { postmanIds } from '@/constants';
import {
  deleteFeatureToItemHandler,
  getFeaturesByItemHandler,
  postCreateFeatureToItemHandler,
} from '@/controllers';
import { zodDefaultHook } from '@/middlewares';
import { NomenclatureTag } from '@/types';
import { communityFeatureToPropertySuccessSchema } from '@/validators';

import deleteFeatureToItem from './deleteFeatureToItem';
import getFeaturesByItem from './getFeaturesByItem';
import postCreateFeatureToItem from './postCreateFeatureToItem';

const app = new OpenAPIHono({
  defaultHook: zodDefaultHook,
});

app.openapi(
  getFeaturesByItem(
    NomenclatureTag.CommunityFeatureToCommunity,
    communityFeatureToPropertySuccessSchema,
    postmanIds.community,
  ),
  getFeaturesByItemHandler(NomenclatureTag.CommunityFeatureToCommunity),
);

app.openapi(
  postCreateFeatureToItem(NomenclatureTag.CommunityFeatureToCommunity, {
    featureId: postmanIds.communityFeature,
    itemId: postmanIds.community,
  }),
  postCreateFeatureToItemHandler(NomenclatureTag.CommunityFeatureToCommunity),
);

app.openapi(
  deleteFeatureToItem(
    NomenclatureTag.CommunityFeatureToCommunity,
    postmanIds.communityFeature,
    postmanIds.community,
  ),
  deleteFeatureToItemHandler(NomenclatureTag.CommunityFeatureToCommunity),
);

export default app;
