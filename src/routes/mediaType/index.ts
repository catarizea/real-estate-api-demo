/* eslint-disable no-console */
import { OpenAPIHono } from '@hono/zod-openapi';

import {
  customInsertMediaTypeCheck,
  deleteItemHandler,
  postCreateItemHandler,
  postListItemHandler,
  putUpdateItemHandler,
} from '@/controllers';
import { zodDefaultHook } from '@/middlewares';
import { media, mediaType } from '@/models/schema';
import {
  InsertMediaTypeSchema,
  insertMediaTypeSchema,
  insertMediaTypeSchemaExample,
  selectMediaTypeSchema,
  updatableMediaTypeFields,
  UpdateMediaTypeSchema,
  updateMediaTypeSchema,
  updateMediaTypeSchemaExample,
} from '@/models/zodSchemas';
import { NomenclatureTag } from '@/types';
import { createBodyDescription, getModelFields } from '@/utils';
import {
  bodyMediaTypeListSchema,
  getMediaTypeCursorValidatorByOrderBy,
  mediaTypeBodySchemaExample,
  paginationMediaTypeOrderSchema,
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

const { fields } = getModelFields(mediaType);

app.openapi(
  postListItem({
    tag: NomenclatureTag.MediaType,
    selectItemSchema: selectMediaTypeSchema,
    paginationItemOrderSchema: paginationMediaTypeOrderSchema,
    bodyItemListSchema: bodyMediaTypeListSchema,
    bodyItemListSchemaExample: mediaTypeBodySchemaExample,
    bodyDescription: createBodyDescription(fields),
  }),
  postListItemHandler({
    model: mediaType,
    getItemCursorValidatorByOrderBy: getMediaTypeCursorValidatorByOrderBy,
    paginationItemOrderSchema: paginationMediaTypeOrderSchema,
  }),
);

app.openapi(
  postCreateItem({
    tag: NomenclatureTag.MediaType,
    insertItemSchema: insertMediaTypeSchema,
    insertItemSchemaExample: insertMediaTypeSchemaExample,
  }),
  postCreateItemHandler<InsertMediaTypeSchema>({
    model: mediaType,
    customCheck: customInsertMediaTypeCheck,
    onSuccess: async (id: string) => {
      console.log(`publish message for created mediaType with id ${id}`);
    },
  }),
);

app.openapi(
  putUpdateItem({
    tag: NomenclatureTag.MediaType,
    updateItemSchema: updateMediaTypeSchema,
    updateItemSchemaExample: updateMediaTypeSchemaExample,
  }),
  putUpdateItemHandler<UpdateMediaTypeSchema>({
    model: mediaType,
    tag: NomenclatureTag.MediaType,
    updatableFields: updatableMediaTypeFields,
    customCheck: customInsertMediaTypeCheck,
    onSuccess: async (id: string) => {
      console.log(`publish message for updated mediaType with id ${id}`);
    },
  }),
);

app.openapi(
  deleteItem({
    tag: NomenclatureTag.MediaType,
  }),
  deleteItemHandler({
    model: mediaType,
    tag: NomenclatureTag.MediaType,
    idField: 'id',
    children: [
      {
        model: media,
        tag: NomenclatureTag.Media,
        parentIdField: 'mediaTypeId',
      },
    ],
    onSuccess: async (id: string) => {
      console.log(`publish message for deleted mediaType with id ${id}`);
    },
  }),
);

export default app;
