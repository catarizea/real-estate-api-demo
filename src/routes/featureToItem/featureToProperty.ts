import { OpenAPIHono } from '@hono/zod-openapi';

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
  ),
  getFeaturesByItemHandler(NomenclatureTag.FeatureToProperty),
);

app.openapi(
  postCreateFeatureToItem(NomenclatureTag.FeatureToProperty),
  postCreateFeatureToItemHandler(NomenclatureTag.FeatureToProperty),
);

app.openapi(
  deleteFeatureToItem(NomenclatureTag.FeatureToProperty),
  deleteFeatureToItemHandler(NomenclatureTag.FeatureToProperty),
);

export default app;
