import { OpenAPIHono } from '@hono/zod-openapi';

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
  ),
  getFeaturesByItemHandler(NomenclatureTag.CommunityFeatureToCommunity),
);

app.openapi(
  postCreateFeatureToItem(NomenclatureTag.CommunityFeatureToCommunity),
  postCreateFeatureToItemHandler(NomenclatureTag.CommunityFeatureToCommunity),
);

app.openapi(
  deleteFeatureToItem(NomenclatureTag.CommunityFeatureToCommunity),
  deleteFeatureToItemHandler(NomenclatureTag.CommunityFeatureToCommunity),
);

export default app;
