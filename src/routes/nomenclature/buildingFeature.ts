/* eslint-disable no-console */
import { OpenAPIHono } from '@hono/zod-openapi';

import { postmanIds } from '@/constants';
import {
  customUpdateBuildingFeatureCheck,
  deleteItemHandler,
  postCreateItemHandler,
  postListItemHandler,
  putUpdateItemHandler,
} from '@/controllers';
import { zodDefaultHook } from '@/middlewares';
import { buildingFeature, buildingFeatureToProperty } from '@/models/schema';
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

const { fields } = getModelFields(buildingFeature);

app.openapi(
  postListItem({
    tag: NomenclatureTag.BuildingFeature,
    selectItemSchema: selectBathroomSchema,
    paginationItemOrderSchema: paginationNomenclatureOrderSchema,
    bodyItemListSchema: bodyNomenclatureListSchema,
    bodyItemListSchemaExample: bodyNomenclatureListSchemaExample,
    bodyDescription: createBodyDescription(fields),
  }),
  postListItemHandler({
    model: buildingFeature,
    getItemCursorValidatorByOrderBy: getNomenclatureCursorValidatorByOrderBy,
    paginationItemOrderSchema: paginationNomenclatureOrderSchema,
  }),
);

app.openapi(
  postCreateItem({
    tag: NomenclatureTag.BuildingFeature,
    insertItemSchema: insertBathroomSchema,
    insertItemSchemaExample: insertBathroomSchemaExample,
  }),
  postCreateItemHandler<InsertBathroomSchema>({
    model: buildingFeature,
    postmanId: postmanIds.buildingFeature,
    onSuccess: async (id: string) => {
      console.log(`publish message for created buildingFeature with id ${id}`);
    },
  }),
);

app.openapi(
  putUpdateItem({
    tag: NomenclatureTag.BuildingFeature,
    updateItemSchema: updateBathroomSchema,
    updateItemSchemaExample: updateBathroomSchemaExample,
    postmanId: postmanIds.buildingFeature,
  }),
  putUpdateItemHandler<UpdateBathroomSchema>({
    model: buildingFeature,
    tag: NomenclatureTag.BuildingFeature,
    updatableFields: updatableBathroomFields,
    customCheck: customUpdateBuildingFeatureCheck,
    onSuccess: async (id: string) => {
      console.log(`publish message for updated buildingFeature with id ${id}`);
    },
  }),
);

app.openapi(
  deleteItem({
    tag: NomenclatureTag.BuildingFeature,
    postmanId: postmanIds.buildingFeature,
  }),
  deleteItemHandler({
    model: buildingFeature,
    tag: NomenclatureTag.BuildingFeature,
    idField: 'id',
    children: [
      {
        model: buildingFeatureToProperty,
        tag: NomenclatureTag.BuildingFeatureToProperty,
        parentIdField: 'buildingFeatureId',
      },
    ],
    onSuccess: async (id: string) => {
      console.log(`publish message for deleted buildingFeature with id ${id}`);
    },
  }),
);

export default app;
