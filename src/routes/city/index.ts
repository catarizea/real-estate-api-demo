/* eslint-disable no-console */
import { OpenAPIHono } from '@hono/zod-openapi';

import { postmanIds } from '@/constants';
import {
  customInsertCityCheck,
  deleteItemHandler,
  postCreateItemHandler,
  postListItemHandler,
  putUpdateItemHandler,
} from '@/controllers';
import { zodDefaultHook } from '@/middlewares';
import { city, community, property } from '@/models/schema';
import {
  InsertCitySchema,
  insertCitySchema,
  insertCitySchemaExample,
  selectCitySchema,
  updatableCityFields,
  UpdateCitySchema,
  updateCitySchema,
  updateCitySchemaExample,
} from '@/models/zodSchemas';
import { NomenclatureTag } from '@/types';
import { createBodyDescription, getModelFields } from '@/utils';
import {
  bodyCityListSchema,
  cityBodySchemaExample,
  getCityCursorValidatorByOrderBy,
  paginationCityOrderSchema,
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

const { fields } = getModelFields(city);

app.openapi(
  postListItem({
    tag: NomenclatureTag.City,
    selectItemSchema: selectCitySchema,
    paginationItemOrderSchema: paginationCityOrderSchema,
    bodyItemListSchema: bodyCityListSchema,
    bodyItemListSchemaExample: cityBodySchemaExample,
    bodyDescription: createBodyDescription(fields),
  }),
  postListItemHandler({
    model: city,
    getItemCursorValidatorByOrderBy: getCityCursorValidatorByOrderBy,
    paginationItemOrderSchema: paginationCityOrderSchema,
  }),
);

app.openapi(
  postCreateItem({
    tag: NomenclatureTag.City,
    insertItemSchema: insertCitySchema,
    insertItemSchemaExample: insertCitySchemaExample,
  }),
  postCreateItemHandler<InsertCitySchema>({
    model: city,
    customCheck: customInsertCityCheck,
    postmanId: postmanIds.city,
    onSuccess: async (id: string) => {
      console.log(`publish message for created city with id ${id}`);
    },
  }),
);

app.openapi(
  putUpdateItem({
    tag: NomenclatureTag.City,
    updateItemSchema: updateCitySchema,
    updateItemSchemaExample: updateCitySchemaExample,
    postmanId: postmanIds.city,
  }),
  putUpdateItemHandler<UpdateCitySchema>({
    model: city,
    tag: NomenclatureTag.City,
    updatableFields: updatableCityFields,
    customCheck: customInsertCityCheck,
    onSuccess: async (id: string) => {
      console.log(`publish message for updated city with id ${id}`);
    },
  }),
);

app.openapi(
  deleteItem({
    tag: NomenclatureTag.City,
    postmanId: postmanIds.city,
  }),
  deleteItemHandler({
    model: city,
    tag: NomenclatureTag.City,
    idField: 'id',
    children: [
      {
        model: community,
        tag: NomenclatureTag.Community,
        parentIdField: 'cityId',
      },
      {
        model: property,
        tag: NomenclatureTag.Property,
        parentIdField: 'cityId',
      },
    ],
    onSuccess: async (id: string) => {
      console.log(`publish message for deleted city with id ${id}`);
    },
  }),
);

export default app;
