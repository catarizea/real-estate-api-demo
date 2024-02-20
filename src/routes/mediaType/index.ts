import { OpenAPIHono } from '@hono/zod-openapi';

import { postmanIds } from '@/constants';
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
    postmanId: postmanIds.mediaType,
  }),
);

app.openapi(
  putUpdateItem({
    tag: NomenclatureTag.MediaType,
    updateItemSchema: updateMediaTypeSchema,
    updateItemSchemaExample: updateMediaTypeSchemaExample,
    postmanId: postmanIds.mediaType,
  }),
  putUpdateItemHandler<UpdateMediaTypeSchema>({
    model: mediaType,
    tag: NomenclatureTag.MediaType,
    updatableFields: updatableMediaTypeFields,
    customCheck: customInsertMediaTypeCheck,
  }),
);

app.openapi(
  deleteItem({
    tag: NomenclatureTag.MediaType,
    postmanId: postmanIds.mediaType,
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
  }),
);

export default app;
