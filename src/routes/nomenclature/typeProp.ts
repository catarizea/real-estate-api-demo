import { OpenAPIHono } from '@hono/zod-openapi';

import { postmanIds } from '@/constants';
import {
  customUpdateTypePropCheck,
  deleteItemHandler,
  postCreateItemHandler,
  postListItemHandler,
  putUpdateItemHandler,
} from '@/controllers';
import { zodDefaultHook } from '@/middlewares';
import { property, typeProp } from '@/models/schema';
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

const { fields } = getModelFields(typeProp);

app.openapi(
  postListItem({
    tag: NomenclatureTag.TypeProp,
    selectItemSchema: selectBathroomSchema,
    paginationItemOrderSchema: paginationNomenclatureOrderSchema,
    bodyItemListSchema: bodyNomenclatureListSchema,
    bodyItemListSchemaExample: bodyNomenclatureListSchemaExample,
    bodyDescription: createBodyDescription(fields),
  }),
  postListItemHandler({
    model: typeProp,
    getItemCursorValidatorByOrderBy: getNomenclatureCursorValidatorByOrderBy,
    paginationItemOrderSchema: paginationNomenclatureOrderSchema,
  }),
);

app.openapi(
  postCreateItem({
    tag: NomenclatureTag.TypeProp,
    insertItemSchema: insertBathroomSchema,
    insertItemSchemaExample: insertBathroomSchemaExample,
  }),
  postCreateItemHandler<InsertBathroomSchema>({
    model: typeProp,
    postmanId: postmanIds.typeProp,
  }),
);

app.openapi(
  putUpdateItem({
    tag: NomenclatureTag.TypeProp,
    updateItemSchema: updateBathroomSchema,
    updateItemSchemaExample: updateBathroomSchemaExample,
    postmanId: postmanIds.typeProp,
  }),
  putUpdateItemHandler<UpdateBathroomSchema>({
    model: typeProp,
    tag: NomenclatureTag.TypeProp,
    updatableFields: updatableBathroomFields,
    customCheck: customUpdateTypePropCheck,
  }),
);

app.openapi(
  deleteItem({
    tag: NomenclatureTag.TypeProp,
    postmanId: postmanIds.typeProp,
  }),
  deleteItemHandler({
    model: typeProp,
    tag: NomenclatureTag.TypeProp,
    idField: 'id',
    children: [
      {
        model: property,
        tag: NomenclatureTag.Property,
        parentIdField: 'typePropId',
      },
    ],
  }),
);

export default app;
