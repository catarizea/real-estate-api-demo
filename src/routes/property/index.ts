/* eslint-disable no-console */
import { OpenAPIHono } from '@hono/zod-openapi';

import {
  customInsertPropertyCheck,
  deleteItemHandler,
  postCreateItemHandler,
  postListItemHandler,
  putUpdateItemHandler,
} from '@/controllers';
import { zodDefaultHook } from '@/middlewares';
import { floorPlan, media, parking, property, unit } from '@/models/schema';
import {
  InsertPropertySchema,
  insertPropertySchema,
  insertPropertySchemaExample,
  selectPropertySchema,
  UpdatePropertySchema,
  updatePropertySchema,
  updatePropertySchemaExample,
} from '@/models/zodSchemas';
import { NomenclatureTag } from '@/types';
import { createBodyDescription, getModelFields } from '@/utils';
import {
  bodyPropertyListSchema,
  getPropertyCursorValidatorByOrderBy,
  paginationPropertyOrderSchema,
  propertyBodySchemaExample,
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

const { fields } = getModelFields(property);

app.openapi(
  postListItem({
    tag: NomenclatureTag.Property,
    selectItemSchema: selectPropertySchema,
    paginationItemOrderSchema: paginationPropertyOrderSchema,
    bodyItemListSchema: bodyPropertyListSchema,
    bodyItemListSchemaExample: propertyBodySchemaExample,
    bodyDescription: createBodyDescription(fields),
  }),
  postListItemHandler({
    model: property,
    getItemCursorValidatorByOrderBy: getPropertyCursorValidatorByOrderBy,
    paginationItemOrderSchema: paginationPropertyOrderSchema,
  }),
);

app.openapi(
  postCreateItem({
    tag: NomenclatureTag.Property,
    insertItemSchema: insertPropertySchema,
    insertItemSchemaExample: insertPropertySchemaExample,
  }),
  postCreateItemHandler<InsertPropertySchema>({
    model: property,
    customCheck: customInsertPropertyCheck,
    onSuccess: async (id: string) => {
      console.log(`publish message for created property with id ${id}`);
    },
  }),
);

app.openapi(
  putUpdateItem({
    tag: NomenclatureTag.Property,
    updateItemSchema: updatePropertySchema,
    updateItemSchemaExample: updatePropertySchemaExample,
  }),
  putUpdateItemHandler<UpdatePropertySchema>({
    model: property,
    tag: NomenclatureTag.Property,
    customCheck: customInsertPropertyCheck,
    onSuccess: async (id: string) => {
      console.log(`publish message for updated property with id ${id}`);
    },
  }),
);

app.openapi(
  deleteItem({
    tag: NomenclatureTag.Property,
  }),
  deleteItemHandler({
    model: property,
    tag: NomenclatureTag.Property,
    idField: 'id',
    children: [
      {
        model: unit,
        tag: NomenclatureTag.Unit,
        parentIdField: 'propertyId',
      },
      {
        model: floorPlan,
        tag: NomenclatureTag.FloorPlan,
        parentIdField: 'propertyId',
      },
      {
        model: parking,
        tag: NomenclatureTag.Parking,
        parentIdField: 'propertyId',
      },
      {
        model: media,
        tag: NomenclatureTag.Media,
        parentIdField: 'propertyId',
      },
    ],
    onSuccess: async (id: string) => {
      console.log(`publish message for deleted property with id ${id}`);
    },
  }),
);

export default app;
