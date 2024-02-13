/* eslint-disable no-console */
import { OpenAPIHono } from '@hono/zod-openapi';

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
    onSuccess: async (id: string) => {
      console.log(`publish message for created feature with id ${id}`);
    },
  }),
);

app.openapi(
  putUpdateItem({
    tag: NomenclatureTag.Feature,
    updateItemSchema: updateBathroomSchema,
    updateItemSchemaExample: updateBathroomSchemaExample,
  }),
  putUpdateItemHandler<UpdateBathroomSchema>({
    model: feature,
    tag: NomenclatureTag.Feature,
    customCheck: customUpdateFeatureCheck,
    onSuccess: async (id: string) => {
      console.log(`publish message for updated feature with id ${id}`);
    },
  }),
);

app.openapi(
  deleteItem({
    tag: NomenclatureTag.Feature,
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
    onSuccess: async (id: string) => {
      console.log(`publish message for deleted feature with id ${id}`);
    },
  }),
);

export default app;
