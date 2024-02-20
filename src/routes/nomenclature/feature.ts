import { OpenAPIHono } from '@hono/zod-openapi';

import { postmanIds } from '@/constants';
import {
  customUpdateFeatureCheck,
  deleteItemHandler,
  postCreateItemHandler,
  postListItemHandler,
  putUpdateItemHandler,
} from '@/controllers';
import { zodDefaultHook } from '@/middlewares';
import { feature, featureToProperty } from '@/models/schema';
import {
  InsertBathroomSchema,
  insertBathroomSchema,
  insertBathroomSchemaExample,
  selectBathroomSchema,
  updatableBathroomFields,
  UpdateBathroomSchema,
  updateBathroomSchema,
  updateBathroomSchemaExample,
} from '@/models/zodSchemas';
import { NomenclatureTag } from '@/types';
import { createBodyDescription, getModelFields } from '@/utils';
import {
  bodyNomenclatureListSchema,
  bodyNomenclatureListSchemaExample,
  getNomenclatureCursorValidatorByOrderBy,
  paginationNomenclatureOrderSchema,
} from '@/validators';

import {
  deleteItem,
  postCreateItem,
  postListItem,
  putUpdateItem,
} from '../common';

const app = new OpenAPIHono({
  defaultHook: zodDefaultHook,
});

const { fields } = getModelFields(feature);

app.openapi(
  postListItem({
    tag: NomenclatureTag.Feature,
    selectItemSchema: selectBathroomSchema,
    paginationItemOrderSchema: paginationNomenclatureOrderSchema,
    bodyItemListSchema: bodyNomenclatureListSchema,
    bodyItemListSchemaExample: bodyNomenclatureListSchemaExample,
    bodyDescription: createBodyDescription(fields),
  }),
  postListItemHandler({
    model: feature,
    getItemCursorValidatorByOrderBy: getNomenclatureCursorValidatorByOrderBy,
    paginationItemOrderSchema: paginationNomenclatureOrderSchema,
  }),
);

app.openapi(
  postCreateItem({
    tag: NomenclatureTag.Feature,
    insertItemSchema: insertBathroomSchema,
    insertItemSchemaExample: insertBathroomSchemaExample,
  }),
  postCreateItemHandler<InsertBathroomSchema>({
    model: feature,
    postmanId: postmanIds.feature,
  }),
);

app.openapi(
  putUpdateItem({
    tag: NomenclatureTag.Feature,
    updateItemSchema: updateBathroomSchema,
    updateItemSchemaExample: updateBathroomSchemaExample,
    postmanId: postmanIds.feature,
  }),
  putUpdateItemHandler<UpdateBathroomSchema>({
    model: feature,
    tag: NomenclatureTag.Feature,
    updatableFields: updatableBathroomFields,
    customCheck: customUpdateFeatureCheck,
  }),
);

app.openapi(
  deleteItem({
    tag: NomenclatureTag.Feature,
    postmanId: postmanIds.feature,
  }),
  deleteItemHandler({
    model: feature,
    tag: NomenclatureTag.Feature,
    idField: 'id',
    children: [
      {
        model: featureToProperty,
        tag: NomenclatureTag.FeatureToProperty,
        parentIdField: 'featureId',
      },
    ],
  }),
);

export default app;
