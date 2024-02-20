import { OpenAPIHono } from '@hono/zod-openapi';

import { postmanIds } from '@/constants';
import {
  customInsertCommunityCheck,
  deleteItemHandler,
  getCommunityHandler,
  postCreateItemHandler,
  postListItemHandler,
  putUpdateItemHandler,
} from '@/controllers';
import { zodDefaultHook } from '@/middlewares';
import {
  community,
  communityFeatureToCommunity,
  property,
} from '@/models/schema';
import {
  InsertCommunitySchema,
  insertCommunitySchema,
  insertCommunitySchemaExample,
  selectCommunitySchema,
  updatableCommunityFields,
  UpdateCommunitySchema,
  updateCommunitySchema,
  updateCommunitySchemaExample,
} from '@/models/zodSchemas';
import { NomenclatureTag } from '@/types';
import { createBodyDescription, getModelFields } from '@/utils';
import {
  bodyCommunityListSchema,
  bodyCommunityListSchemaExample,
  getCommunityCursorValidatorByOrderBy,
  paginationCommunityOrderSchema,
} from '@/validators';

import {
  deleteItem,
  postCreateItem,
  postListItem,
  putUpdateItem,
} from '../common';
import getCommunity from './getCommunity';

const app = new OpenAPIHono({
  defaultHook: zodDefaultHook,
});

const { fields } = getModelFields(community);

app.openapi(getCommunity, getCommunityHandler);

app.openapi(
  postListItem({
    tag: NomenclatureTag.Community,
    selectItemSchema: selectCommunitySchema,
    paginationItemOrderSchema: paginationCommunityOrderSchema,
    bodyItemListSchema: bodyCommunityListSchema,
    bodyItemListSchemaExample: bodyCommunityListSchemaExample,
    bodyDescription: createBodyDescription(fields),
  }),
  postListItemHandler({
    model: community,
    getItemCursorValidatorByOrderBy: getCommunityCursorValidatorByOrderBy,
    paginationItemOrderSchema: paginationCommunityOrderSchema,
  }),
);

app.openapi(
  postCreateItem({
    tag: NomenclatureTag.Community,
    insertItemSchema: insertCommunitySchema,
    insertItemSchemaExample: insertCommunitySchemaExample,
  }),
  postCreateItemHandler<InsertCommunitySchema>({
    model: community,
    customCheck: customInsertCommunityCheck,
    postmanId: postmanIds.community,
  }),
);

app.openapi(
  putUpdateItem({
    tag: NomenclatureTag.Community,
    updateItemSchema: updateCommunitySchema,
    updateItemSchemaExample: updateCommunitySchemaExample,
    postmanId: postmanIds.community,
  }),
  putUpdateItemHandler<UpdateCommunitySchema>({
    model: community,
    tag: NomenclatureTag.Community,
    updatableFields: updatableCommunityFields,
    customCheck: customInsertCommunityCheck,
  }),
);

app.openapi(
  deleteItem({
    tag: NomenclatureTag.Community,
    postmanId: postmanIds.community,
  }),
  deleteItemHandler({
    model: community,
    tag: NomenclatureTag.Community,
    idField: 'id',
    children: [
      {
        model: property,
        tag: NomenclatureTag.Property,
        parentIdField: 'communityId',
      },
      {
        model: communityFeatureToCommunity,
        tag: NomenclatureTag.CommunityFeatureToCommunity,
        parentIdField: 'communityId',
      },
    ],
  }),
);

export default app;
