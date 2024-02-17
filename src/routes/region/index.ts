/* eslint-disable no-console */
import { OpenAPIHono } from '@hono/zod-openapi';

import { postmanIds } from '@/constants';
import {
  customUpdateRegionCheck,
  deleteItemHandler,
  getRegionHandler,
  postCreateItemHandler,
  postListItemHandler,
  putUpdateItemHandler,
} from '@/controllers';
import { zodDefaultHook } from '@/middlewares';
import { city, region } from '@/models/schema';
import {
  InsertRegionSchema,
  insertRegionSchema,
  insertRegionSchemaExample,
  selectRegionSchema,
  updatableRegionFields,
  UpdateRegionSchema,
  updateRegionSchema,
  updateRegionSchemaExample,
} from '@/models/zodSchemas';
import { NomenclatureTag } from '@/types';
import { createBodyDescription, getModelFields } from '@/utils';
import {
  bodyRegionListSchema,
  getRegionCursorValidatorByOrderBy,
  paginationRegionOrderSchema,
  regionBodySchemaExample,
} from '@/validators';

import {
  deleteItem,
  postCreateItem,
  postListItem,
  putUpdateItem,
} from '../common';
import getRegion from './getRegion';

const app = new OpenAPIHono({
  defaultHook: zodDefaultHook,
});

const { fields } = getModelFields(region);

app.openapi(getRegion, getRegionHandler);

app.openapi(
  postListItem({
    tag: NomenclatureTag.Region,
    selectItemSchema: selectRegionSchema,
    paginationItemOrderSchema: paginationRegionOrderSchema,
    bodyItemListSchema: bodyRegionListSchema,
    bodyItemListSchemaExample: regionBodySchemaExample,
    bodyDescription: createBodyDescription(fields),
  }),
  postListItemHandler({
    model: region,
    getItemCursorValidatorByOrderBy: getRegionCursorValidatorByOrderBy,
    paginationItemOrderSchema: paginationRegionOrderSchema,
  }),
);

app.openapi(
  postCreateItem({
    tag: NomenclatureTag.Region,
    insertItemSchema: insertRegionSchema,
    insertItemSchemaExample: insertRegionSchemaExample,
  }),
  postCreateItemHandler<InsertRegionSchema>({
    model: region,
    postmanId: postmanIds.region,
    onSuccess: async (id: string) => {
      console.log(`publish message for created region with id ${id}`);
    },
  }),
);

app.openapi(
  putUpdateItem({
    tag: NomenclatureTag.Region,
    updateItemSchema: updateRegionSchema,
    updateItemSchemaExample: updateRegionSchemaExample,
    postmanId: postmanIds.region,
  }),
  putUpdateItemHandler<UpdateRegionSchema>({
    model: region,
    tag: NomenclatureTag.Region,
    updatableFields: updatableRegionFields,
    customCheck: customUpdateRegionCheck,
    onSuccess: async (id: string) => {
      console.log(`publish message for updated region with id ${id}`);
    },
  }),
);

app.openapi(
  deleteItem({
    tag: NomenclatureTag.Region,
    postmanId: postmanIds.region,
  }),
  deleteItemHandler({
    model: region,
    tag: NomenclatureTag.Region,
    idField: 'id',
    children: [
      {
        model: city,
        tag: NomenclatureTag.City,
        parentIdField: 'regionId',
      },
    ],
    onSuccess: async (id: string) => {
      console.log(`publish message for deleted region with id ${id}`);
    },
  }),
);

export default app;
