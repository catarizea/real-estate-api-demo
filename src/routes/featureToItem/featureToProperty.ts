import { OpenAPIHono } from '@hono/zod-openapi';

import { postmanIds } from '@/constants';
import {
  deleteFeatureToItemHandler,
  getFeaturesByItemHandler,
  postCreateFeatureToItemHandler,
} from '@/controllers';
import { zodDefaultHook } from '@/middlewares';
import { NomenclatureTag } from '@/types';
import { featureToPropertySuccessSchema } from '@/validators';

import deleteFeatureToItem from './deleteFeatureToItem';
import getFeaturesByItem from './getFeaturesByItem';
import postCreateFeatureToItem from './postCreateFeatureToItem';

const app = new OpenAPIHono({
  defaultHook: zodDefaultHook,
});

app.openapi(
  getFeaturesByItem(
    NomenclatureTag.FeatureToProperty,
    featureToPropertySuccessSchema,
    postmanIds.property,
  ),
  getFeaturesByItemHandler(NomenclatureTag.FeatureToProperty),
);

app.openapi(
  postCreateFeatureToItem(NomenclatureTag.FeatureToProperty, {
    featureId: postmanIds.feature,
    itemId: postmanIds.property,
  }),
  postCreateFeatureToItemHandler(NomenclatureTag.FeatureToProperty),
);

app.openapi(
  deleteFeatureToItem(
    NomenclatureTag.FeatureToProperty,
    postmanIds.feature,
    postmanIds.property,
  ),
  deleteFeatureToItemHandler(NomenclatureTag.FeatureToProperty),
);

export default app;
