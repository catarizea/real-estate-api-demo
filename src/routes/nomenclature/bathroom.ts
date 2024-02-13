/* eslint-disable no-console */
import { OpenAPIHono } from '@hono/zod-openapi';

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
    onSuccess: async (id: string) => {
      console.log(`publish message for created bathroom with id ${id}`);
    },
  }),
);

app.openapi(
  putUpdateItem({
    tag: NomenclatureTag.Bathroom,
    updateItemSchema: updateBathroomSchema,
    updateItemSchemaExample: updateBathroomSchemaExample,
  }),
  putUpdateItemHandler<UpdateBathroomSchema>({
    model: bathroom,
    tag: NomenclatureTag.Bathroom,
    customCheck: customBathroomBedroomCheck,
    onSuccess: async (id: string) => {
      console.log(`publish message for updated bathroom with id ${id}`);
    },
  }),
);

app.openapi(
  deleteItem({
    tag: NomenclatureTag.Bathroom,
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
    onSuccess: async (id: string) => {
      console.log(`publish message for deleted bathroom with id ${id}`);
    },
  }),
);

export default app;
