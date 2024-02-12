/* eslint-disable no-console */
import { OpenAPIHono } from '@hono/zod-openapi';

import {
  customInsertMediaCheck,
  deleteItemHandler,
  postCreateItemHandler,
  postListItemHandler,
  putUpdateItemHandler,
} from '@/controllers';
import { zodDefaultHook } from '@/middlewares';
import { media } from '@/models/schema';
import {
  InsertMediaSchema,
  insertMediaSchema,
  insertMediaSchemaExample,
  selectMediaSchema,
  UpdateMediaSchema,
  updateMediaSchema,
  updateMediaSchemaExample,
} from '@/models/zodSchemas';
import { NomenclatureTag } from '@/types';
import { createBodyDescription, getModelFields } from '@/utils';
import {
  bodyMediaListSchema,
  getMediaCursorValidatorByOrderBy,
  mediaBodySchemaExample,
  paginationMediaOrderSchema,
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

const { fields } = getModelFields(media);

app.openapi(
  postListItem({
    tag: NomenclatureTag.Media,
    selectItemSchema: selectMediaSchema,
    paginationItemOrderSchema: paginationMediaOrderSchema,
    bodyItemListSchema: bodyMediaListSchema,
    bodyItemListSchemaExample: mediaBodySchemaExample,
    bodyDescription: createBodyDescription(fields),
  }),
  postListItemHandler({
    model: media,
    getItemCursorValidatorByOrderBy: getMediaCursorValidatorByOrderBy,
    paginationItemOrderSchema: paginationMediaOrderSchema,
  }),
);

app.openapi(
  postCreateItem({
    tag: NomenclatureTag.Media,
    insertItemSchema: insertMediaSchema,
    insertItemSchemaExample: insertMediaSchemaExample,
  }),
  postCreateItemHandler<InsertMediaSchema>({
    model: media,
    customCheck: customInsertMediaCheck,
    onSuccess: async (id: string) => {
      console.log(`publish message for created media with id ${id}`);
    },
  }),
);

app.openapi(
  putUpdateItem({
    tag: NomenclatureTag.Media,
    updateItemSchema: updateMediaSchema,
    updateItemSchemaExample: updateMediaSchemaExample,
  }),
  putUpdateItemHandler<UpdateMediaSchema>({
    model: media,
    tag: NomenclatureTag.Media,
    customCheck: customInsertMediaCheck,
    onSuccess: async (id: string) => {
      console.log(`publish message for updated media with id ${id}`);
    },
  }),
);

app.openapi(
  deleteItem({
    tag: NomenclatureTag.Media,
  }),
  deleteItemHandler({
    model: media,
    tag: NomenclatureTag.Media,
    idField: 'id',
    onSuccess: async (id: string) => {
      console.log(`publish message for deleted media with id ${id}`);
    },
  }),
);

export default app;
