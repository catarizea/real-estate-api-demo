import { OpenAPIHono } from '@hono/zod-openapi';

import { postmanIds } from '@/constants';
import {
  deleteFeatureToItemHandler,
  getFeaturesByItemHandler,
  postCreateFeatureToItemHandler,
} from '@/controllers';
import { zodDefaultHook } from '@/middlewares';
import { NomenclatureTag } from '@/types';
import { buildingFeatureToPropertySuccessSchema } from '@/validators';

import deleteFeatureToItem from './deleteFeatureToItem';
import getFeaturesByItem from './getFeaturesByItem';
import postCreateFeatureToItem from './postCreateFeatureToItem';

const app = new OpenAPIHono({
  defaultHook: zodDefaultHook,
});

app.openapi(
  getFeaturesByItem(
    NomenclatureTag.BuildingFeatureToProperty,
    buildingFeatureToPropertySuccessSchema,
    postmanIds.property,
  ),
  getFeaturesByItemHandler(NomenclatureTag.BuildingFeatureToProperty),
);

app.openapi(
  postCreateFeatureToItem(NomenclatureTag.BuildingFeatureToProperty, {
    featureId: postmanIds.buildingFeature,
    itemId: postmanIds.property,
  }),
  postCreateFeatureToItemHandler(NomenclatureTag.BuildingFeatureToProperty),
);

app.openapi(
  deleteFeatureToItem(
    NomenclatureTag.BuildingFeatureToProperty,
    postmanIds.buildingFeature,
    postmanIds.property,
  ),
  deleteFeatureToItemHandler(NomenclatureTag.BuildingFeatureToProperty),
);

export default app;
