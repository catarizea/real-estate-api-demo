/* eslint-disable no-console */
import { OpenAPIHono } from '@hono/zod-openapi';

import { postmanIds } from '@/constants';
import {
  customDeleteMediaCheck,
  customInsertMediaCheck,
  deleteItemHandler,
  postCreateItemHandler,
  postListItemHandler,
  publishDeleteMedia,
  publishInsertMedia,
  publishUpdateMedia,
  putUpdateItemHandler,
} from '@/controllers';
import { zodDefaultHook } from '@/middlewares';
import { media } from '@/models/schema';
import {
  InsertMediaSchema,
  insertMediaSchema,
  insertMediaSchemaExample,
  selectMediaSchema,
  updatableMediaFields,
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
    postmanId: postmanIds.media,
    onSuccess: publishInsertMedia,
  }),
);

app.openapi(
  putUpdateItem({
    tag: NomenclatureTag.Media,
    updateItemSchema: updateMediaSchema,
    updateItemSchemaExample: updateMediaSchemaExample,
    postmanId: postmanIds.media,
  }),
  putUpdateItemHandler<UpdateMediaSchema>({
    model: media,
    tag: NomenclatureTag.Media,
    updatableFields: updatableMediaFields,
    customCheck: customInsertMediaCheck,
    onSuccess: publishUpdateMedia,
  }),
);

app.openapi(
  deleteItem({
    tag: NomenclatureTag.Media,
    postmanId: postmanIds.media,
  }),
  deleteItemHandler({
    model: media,
    tag: NomenclatureTag.Media,
    idField: 'id',
    customCheck: customDeleteMediaCheck,
    onSuccess: publishDeleteMedia,
  }),
);

export default app;
