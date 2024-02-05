import { OpenAPIHono } from '@hono/zod-openapi';

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
  ),
  getFeaturesByItemHandler(NomenclatureTag.BuildingFeatureToProperty),
);

app.openapi(
  postCreateFeatureToItem(NomenclatureTag.BuildingFeatureToProperty),
  postCreateFeatureToItemHandler(NomenclatureTag.BuildingFeatureToProperty),
);

app.openapi(
  deleteFeatureToItem(NomenclatureTag.BuildingFeatureToProperty),
  deleteFeatureToItemHandler(NomenclatureTag.BuildingFeatureToProperty),
);

export default app;
