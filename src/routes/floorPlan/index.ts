import { OpenAPIHono } from '@hono/zod-openapi';

import { postmanIds } from '@/constants';
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
    postmanId: postmanIds.floorPlan,
  }),
);

app.openapi(
  putUpdateItem({
    tag: NomenclatureTag.FloorPlan,
    updateItemSchema: updateFloorPlanSchema,
    updateItemSchemaExample: updateFloorPlanSchemaExample,
    postmanId: postmanIds.floorPlan,
  }),
  putUpdateItemHandler<UpdateFloorPlanSchema>({
    model: floorPlan,
    tag: NomenclatureTag.FloorPlan,
    updatableFields: updatableFloorPlanFields,
    customCheck: customInsertFloorPlanCheck,
  }),
);

app.openapi(
  deleteItem({
    tag: NomenclatureTag.FloorPlan,
    postmanId: postmanIds.floorPlan,
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
  }),
);

export default app;
