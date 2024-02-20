import { OpenAPIHono } from '@hono/zod-openapi';

import { postmanIds } from '@/constants';
import {
  customInsertParkingCheck,
  customUpdateParkingCheck,
  deleteItemHandler,
  getParkingsByPropertyHandler,
  postCreateItemHandler,
  postListItemHandler,
  publishDeleteParking,
  publishInsertParking,
  publishUpdateParking,
  putUpdateItemHandler,
} from '@/controllers';
import { zodDefaultHook } from '@/middlewares';
import { parking } from '@/models/schema';
import {
  InsertParkingSchema,
  insertParkingSchema,
  insertParkingSchemaExample,
  selectParkingSchema,
  updatableParkingFields,
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
    postmanId: postmanIds.parking,
    onSuccess: publishInsertParking,
  }),
);

app.openapi(
  putUpdateItem({
    tag: NomenclatureTag.Parking,
    updateItemSchema: updateParkingSchema,
    updateItemSchemaExample: updateParkingSchemaExample,
    postmanId: postmanIds.parking,
  }),
  putUpdateItemHandler<UpdateParkingSchema>({
    model: parking,
    tag: NomenclatureTag.Parking,
    updatableFields: updatableParkingFields,
    customCheck: customUpdateParkingCheck,
    onSuccess: publishUpdateParking,
  }),
);

app.openapi(
  deleteItem({
    tag: NomenclatureTag.Parking,
    postmanId: postmanIds.parking,
  }),
  deleteItemHandler({
    model: parking,
    tag: NomenclatureTag.Parking,
    idField: 'id',
    onSuccess: publishDeleteParking,
  }),
);

export default app;
