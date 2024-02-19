/* eslint-disable no-console */
import { OpenAPIHono } from '@hono/zod-openapi';

import { postmanIds } from '@/constants';
import {
  customInsertUnitCheck,
  deleteItemHandler,
  getUnitHandler,
  postCreateItemHandler,
  postListItemHandler,
  publishDeleteUnit,
  publishInsertUnit,
  publishUpdateUnit,
  putUpdateItemHandler,
} from '@/controllers';
import { zodDefaultHook } from '@/middlewares';
import { unit } from '@/models/schema';
import {
  InsertUnitSchema,
  insertUnitSchema,
  insertUnitSchemaExample,
  selectUnitSchema,
  updatableUnitFields,
  UpdateUnitSchema,
  updateUnitSchema,
  updateUnitSchemaExample,
} from '@/models/zodSchemas';
import { NomenclatureTag } from '@/types';
import { createBodyDescription, getModelFields } from '@/utils';
import {
  bodyUnitListSchema,
  getUnitCursorValidatorByOrderBy,
  paginationUnitOrderSchema,
  unitBodySchemaExample,
} from '@/validators';

import {
  deleteItem,
  postCreateItem,
  postListItem,
  putUpdateItem,
} from '../common';
import getUnit from './getUnit';

const app = new OpenAPIHono({
  defaultHook: zodDefaultHook,
});

const { fields } = getModelFields(unit);

app.openapi(getUnit, getUnitHandler);

app.openapi(
  postListItem({
    tag: NomenclatureTag.Unit,
    selectItemSchema: selectUnitSchema,
    paginationItemOrderSchema: paginationUnitOrderSchema,
    bodyItemListSchema: bodyUnitListSchema,
    bodyItemListSchemaExample: unitBodySchemaExample,
    bodyDescription: createBodyDescription(fields),
  }),
  postListItemHandler({
    model: unit,
    getItemCursorValidatorByOrderBy: getUnitCursorValidatorByOrderBy,
    paginationItemOrderSchema: paginationUnitOrderSchema,
  }),
);

app.openapi(
  postCreateItem({
    tag: NomenclatureTag.Unit,
    insertItemSchema: insertUnitSchema,
    insertItemSchemaExample: insertUnitSchemaExample,
  }),
  postCreateItemHandler<InsertUnitSchema>({
    model: unit,
    customCheck: customInsertUnitCheck,
    postmanId: postmanIds.unit,
    onSuccess: publishInsertUnit,
  }),
);

app.openapi(
  putUpdateItem({
    tag: NomenclatureTag.Unit,
    updateItemSchema: updateUnitSchema,
    updateItemSchemaExample: updateUnitSchemaExample,
    postmanId: postmanIds.unit,
  }),
  putUpdateItemHandler<UpdateUnitSchema>({
    model: unit,
    tag: NomenclatureTag.Unit,
    updatableFields: updatableUnitFields,
    customCheck: customInsertUnitCheck,
    onSuccess: publishUpdateUnit,
  }),
);

app.openapi(
  deleteItem({
    tag: NomenclatureTag.Unit,
    postmanId: postmanIds.unit,
  }),
  deleteItemHandler({
    model: unit,
    tag: NomenclatureTag.Unit,
    idField: 'id',
    onSuccess: publishDeleteUnit,
  }),
);

export default app;
