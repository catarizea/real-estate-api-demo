/* eslint-disable no-console */
import { OpenAPIHono } from '@hono/zod-openapi';

import {
  customInsertFloorPlanCheck,
  deleteItemHandler,
  postCreateItemHandler,
  postListItemHandler,
  putUpdateItemHandler,
} from '@/controllers';
import { zodDefaultHook } from '@/middlewares';
import { floorPlan, unit } from '@/models/schema';
import {
  InsertFloorPlanSchema,
  insertFloorPlanSchema,
  insertFloorPlanSchemaExample,
  selectFloorPlanSchema,
  updatableFloorPlanFields,
  UpdateFloorPlanSchema,
  updateFloorPlanSchema,
  updateFloorPlanSchemaExample,
} from '@/models/zodSchemas';
import { NomenclatureTag } from '@/types';
import { createBodyDescription, getModelFields } from '@/utils';
import {
  bodyFloorPlanListSchema,
  floorPlanBodySchemaExample,
  getFloorPlanCursorValidatorByOrderBy,
  paginationFloorPlanOrderSchema,
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

const { fields } = getModelFields(floorPlan);

app.openapi(
  postListItem({
    tag: NomenclatureTag.FloorPlan,
    selectItemSchema: selectFloorPlanSchema,
    paginationItemOrderSchema: paginationFloorPlanOrderSchema,
    bodyItemListSchema: bodyFloorPlanListSchema,
    bodyItemListSchemaExample: floorPlanBodySchemaExample,
    bodyDescription: createBodyDescription(fields),
  }),
  postListItemHandler({
    model: floorPlan,
    getItemCursorValidatorByOrderBy: getFloorPlanCursorValidatorByOrderBy,
    paginationItemOrderSchema: paginationFloorPlanOrderSchema,
  }),
);

app.openapi(
  postCreateItem({
    tag: NomenclatureTag.FloorPlan,
    insertItemSchema: insertFloorPlanSchema,
    insertItemSchemaExample: insertFloorPlanSchemaExample,
  }),
  postCreateItemHandler<InsertFloorPlanSchema>({
    model: floorPlan,
    customCheck: customInsertFloorPlanCheck,
    onSuccess: async (id: string) => {
      console.log(`publish message for created floorPlan with id ${id}`);
    },
  }),
);

app.openapi(
  putUpdateItem({
    tag: NomenclatureTag.FloorPlan,
    updateItemSchema: updateFloorPlanSchema,
    updateItemSchemaExample: updateFloorPlanSchemaExample,
  }),
  putUpdateItemHandler<UpdateFloorPlanSchema>({
    model: floorPlan,
    tag: NomenclatureTag.FloorPlan,
    updatableFields: updatableFloorPlanFields,
    customCheck: customInsertFloorPlanCheck,
    onSuccess: async (id: string) => {
      console.log(`publish message for updated floorPlan with id ${id}`);
    },
  }),
);

app.openapi(
  deleteItem({
    tag: NomenclatureTag.FloorPlan,
  }),
  deleteItemHandler({
    model: floorPlan,
    tag: NomenclatureTag.FloorPlan,
    idField: 'id',
    children: [
      {
        model: unit,
        tag: NomenclatureTag.Unit,
        parentIdField: 'floorPlanId',
      },
    ],
    onSuccess: async (id: string) => {
      console.log(`publish message for deleted floorPlan with id ${id}`);
    },
  }),
);

export default app;
