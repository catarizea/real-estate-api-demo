/* eslint-disable no-console */
import { OpenAPIHono } from '@hono/zod-openapi';

import {
  customInsertParkingCheck,
  customUpdateParkingCheck,
  deleteItemHandler,
  getParkingsByPropertyHandler,
  postCreateItemHandler,
  postListItemHandler,
  putUpdateItemHandler,
} from '@/controllers';
import { zodDefaultHook } from '@/middlewares';
import { parking } from '@/models/schema';
import {
  InsertParkingSchema,
  insertParkingSchema,
  insertParkingSchemaExample,
  selectParkingSchema,
  UpdateParkingSchema,
  updateParkingSchema,
  updateParkingSchemaExample,
} from '@/models/zodSchemas';
import { NomenclatureTag } from '@/types';
import { createBodyDescription, getModelFields } from '@/utils';
import {
  bodyParkingListSchema,
  getParkingCursorValidatorByOrderBy,
  paginationParkingOrderSchema,
  parkingBodySchemaExample,
} from '@/validators';

import {
  deleteItem,
  postCreateItem,
  postListItem,
  putUpdateItem,
} from '../common';
import getParkingsByProperty from './getParkingsByProperty';

const app = new OpenAPIHono({
  defaultHook: zodDefaultHook,
});

const { fields } = getModelFields(parking);

app.openapi(getParkingsByProperty, getParkingsByPropertyHandler);

app.openapi(
  postListItem({
    tag: NomenclatureTag.Parking,
    selectItemSchema: selectParkingSchema,
    paginationItemOrderSchema: paginationParkingOrderSchema,
    bodyItemListSchema: bodyParkingListSchema,
    bodyItemListSchemaExample: parkingBodySchemaExample,
    bodyDescription: createBodyDescription(fields),
  }),
  postListItemHandler({
    model: parking,
    getItemCursorValidatorByOrderBy: getParkingCursorValidatorByOrderBy,
    paginationItemOrderSchema: paginationParkingOrderSchema,
  }),
);

app.openapi(
  postCreateItem({
    tag: NomenclatureTag.Parking,
    insertItemSchema: insertParkingSchema,
    insertItemSchemaExample: insertParkingSchemaExample,
  }),
  postCreateItemHandler<InsertParkingSchema>({
    model: parking,
    customCheck: customInsertParkingCheck,
    onSuccess: async (id: string) => {
      console.log(`publish message for created parking with id ${id}`);
    },
  }),
);

app.openapi(
  putUpdateItem({
    tag: NomenclatureTag.Parking,
    updateItemSchema: updateParkingSchema,
    updateItemSchemaExample: updateParkingSchemaExample,
  }),
  putUpdateItemHandler<UpdateParkingSchema>({
    model: parking,
    tag: NomenclatureTag.Parking,
    customCheck: customUpdateParkingCheck,
    onSuccess: async (id: string) => {
      console.log(`publish message for updated parking with id ${id}`);
    },
  }),
);

app.openapi(
  deleteItem({
    tag: NomenclatureTag.Parking,
  }),
  deleteItemHandler({
    model: parking,
    tag: NomenclatureTag.Parking,
    idField: 'id',
    onSuccess: async (id: string) => {
      console.log(`publish message for deleted parking with id ${id}`);
    },
  }),
);

export default app;
