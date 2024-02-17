/* eslint-disable no-console */
import { OpenAPIHono } from '@hono/zod-openapi';

import { postmanIds } from '@/constants';
import {
  customUpdateCommunityFeatureCheck,
  deleteItemHandler,
  postCreateItemHandler,
  postListItemHandler,
  putUpdateItemHandler,
} from '@/controllers';
import { zodDefaultHook } from '@/middlewares';
import { communityFeature, communityFeatureToCommunity } from '@/models/schema';
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

const { fields } = getModelFields(communityFeature);

app.openapi(
  postListItem({
    tag: NomenclatureTag.CommunityFeature,
    selectItemSchema: selectBathroomSchema,
    paginationItemOrderSchema: paginationNomenclatureOrderSchema,
    bodyItemListSchema: bodyNomenclatureListSchema,
    bodyItemListSchemaExample: bodyNomenclatureListSchemaExample,
    bodyDescription: createBodyDescription(fields),
  }),
  postListItemHandler({
    model: communityFeature,
    getItemCursorValidatorByOrderBy: getNomenclatureCursorValidatorByOrderBy,
    paginationItemOrderSchema: paginationNomenclatureOrderSchema,
  }),
);

app.openapi(
  postCreateItem({
    tag: NomenclatureTag.CommunityFeature,
    insertItemSchema: insertBathroomSchema,
    insertItemSchemaExample: insertBathroomSchemaExample,
  }),
  postCreateItemHandler<InsertBathroomSchema>({
    model: communityFeature,
    postmanId: postmanIds.communityFeature,
    onSuccess: async (id: string) => {
      console.log(`publish message for created communityFeature with id ${id}`);
    },
  }),
);

app.openapi(
  putUpdateItem({
    tag: NomenclatureTag.CommunityFeature,
    updateItemSchema: updateBathroomSchema,
    updateItemSchemaExample: updateBathroomSchemaExample,
    postmanId: postmanIds.communityFeature,
  }),
  putUpdateItemHandler<UpdateBathroomSchema>({
    model: communityFeature,
    tag: NomenclatureTag.CommunityFeature,
    updatableFields: updatableBathroomFields,
    customCheck: customUpdateCommunityFeatureCheck,
    onSuccess: async (id: string) => {
      console.log(`publish message for updated communityFeature with id ${id}`);
    },
  }),
);

app.openapi(
  deleteItem({
    tag: NomenclatureTag.CommunityFeature,
    postmanId: postmanIds.communityFeature,
  }),
  deleteItemHandler({
    model: communityFeature,
    tag: NomenclatureTag.CommunityFeature,
    idField: 'id',
    children: [
      {
        model: communityFeatureToCommunity,
        tag: NomenclatureTag.CommunityFeatureToCommunity,
        parentIdField: 'communityFeatureId',
      },
    ],
    onSuccess: async (id: string) => {
      console.log(`publish message for deleted communityFeature with id ${id}`);
    },
  }),
);

export default app;
