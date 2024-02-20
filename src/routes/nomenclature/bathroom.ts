import { OpenAPIHono } from '@hono/zod-openapi';

import { postmanIds } from '@/constants';
import {
  customBathroomBedroomCheck,
  deleteItemHandler,
  postCreateItemHandler,
  postListItemHandler,
  putUpdateItemHandler,
} from '@/controllers';
import { zodDefaultHook } from '@/middlewares';
import { bathroom, unit } from '@/models/schema';
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

const { fields } = getModelFields(bathroom);

app.openapi(
  postListItem({
    tag: NomenclatureTag.Bathroom,
    selectItemSchema: selectBathroomSchema,
    paginationItemOrderSchema: paginationNomenclatureOrderSchema,
    bodyItemListSchema: bodyNomenclatureListSchema,
    bodyItemListSchemaExample: bodyNomenclatureListSchemaExample,
    bodyDescription: createBodyDescription(fields),
  }),
  postListItemHandler({
    model: bathroom,
    getItemCursorValidatorByOrderBy: getNomenclatureCursorValidatorByOrderBy,
    paginationItemOrderSchema: paginationNomenclatureOrderSchema,
  }),
);

app.openapi(
  postCreateItem({
    tag: NomenclatureTag.Bathroom,
    insertItemSchema: insertBathroomSchema,
    insertItemSchemaExample: insertBathroomSchemaExample,
  }),
  postCreateItemHandler<InsertBathroomSchema>({
    model: bathroom,
    postmanId: postmanIds.bathroom,
  }),
);

app.openapi(
  putUpdateItem({
    tag: NomenclatureTag.Bathroom,
    updateItemSchema: updateBathroomSchema,
    updateItemSchemaExample: updateBathroomSchemaExample,
    postmanId: postmanIds.bathroom,
  }),
  putUpdateItemHandler<UpdateBathroomSchema>({
    model: bathroom,
    tag: NomenclatureTag.Bathroom,
    updatableFields: updatableBathroomFields,
    customCheck: customBathroomBedroomCheck,
  }),
);

app.openapi(
  deleteItem({
    tag: NomenclatureTag.Bathroom,
    postmanId: postmanIds.bathroom,
  }),
  deleteItemHandler({
    model: bathroom,
    tag: NomenclatureTag.Bathroom,
    idField: 'id',
    children: [
      {
        model: unit,
        tag: NomenclatureTag.Unit,
        parentIdField: 'bathroomId',
      },
    ],
  }),
);

export default app;
