import { OpenAPIHono } from '@hono/zod-openapi';

import { postmanIds } from '@/constants';
import {
  customInsertPropertyCheck,
  deleteItemHandler,
  getPropertyHandler,
  postCreateItemHandler,
  postListItemHandler,
  publishUpdateProperty,
  putUpdateItemHandler,
} from '@/controllers';
import { zodDefaultHook } from '@/middlewares';
import {
  buildingFeatureToProperty,
  featureToProperty,
  floorPlan,
  media,
  parking,
  property,
  unit,
} from '@/models/schema';
import {
  InsertPropertySchema,
  insertPropertySchema,
  insertPropertySchemaExample,
  selectPropertySchema,
  updatablePropertyFields,
  UpdatePropertySchema,
  updatePropertySchema,
  updatePropertySchemaExample,
} from '@/models/zodSchemas';
import { NomenclatureTag } from '@/types';
import {
  badRequestResponse,
  createBodyDescription,
  getModelFields,
} from '@/utils';
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
import getProperty from './getProperty';

const app = new OpenAPIHono({
  defaultHook: zodDefaultHook,
});

const { fields } = getModelFields(property);

app.openapi(getProperty, getPropertyHandler);

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
    postmanId: postmanIds.property,
  }),
);

app.openapi(
  putUpdateItem({
    tag: NomenclatureTag.Property,
    updateItemSchema: updatePropertySchema,
    postmanId: postmanIds.property,
    updateItemSchemaExample: updatePropertySchemaExample,
  }),
  putUpdateItemHandler<UpdatePropertySchema>({
    model: property,
    tag: NomenclatureTag.Property,
    updatableFields: updatablePropertyFields,
    customCheck: customInsertPropertyCheck,
    onSuccess: publishUpdateProperty,
  }),
);

app.openapi(
  deleteItem({
    tag: NomenclatureTag.Property,
    postmanId: postmanIds.property,
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
      {
        model: featureToProperty,
        tag: NomenclatureTag.FeatureToProperty,
        parentIdField: 'propertyId',
      },
      {
        model: buildingFeatureToProperty,
        tag: NomenclatureTag.BuildingFeatureToProperty,
        parentIdField: 'propertyId',
      },
    ],
  }),
);

export default app;
