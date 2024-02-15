import { z } from '@hono/zod-openapi';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { unit } from '@/models/schema';

export const selectUnitSchema = createSelectSchema(unit, {
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SelectUnitSchema = z.infer<typeof selectUnitSchema>;

export const insertUnitSchema = createInsertSchema(unit);

export const insertUnitSchemaExample = {
  propertyId: 'a5ug1fdwkkc4byl1uw9d7cqo',
  floorPlanId: 'pkzhabeowrf5q2gj0gtl1657',
  name: 'Unit name',
  rent: 1000,
  deposit: 1000,
  shortterm: true,
  longterm: true,
  unitNumber: '101',
  unitName: '101',
  surface: 1000,
  furnished: true,
  heat: true,
  water: true,
  electricity: true,
  internet: true,
  television: true,
  order: 1,
  bedroomId: 'ztie6w95a0ia39zssos2p4bx',
  bathroomId: 'rtfvftapzbzz6czz73ss09jf',
};

export type InsertUnitSchema = z.infer<typeof insertUnitSchema>;

const updateSchema = z.object({
  name: z.string().optional(),
  rent: z.number().int().optional(),
  deposit: z.number().int().optional(),
  available: z.boolean().optional(),
  immediate: z.boolean().optional(),
  availableDate: z.string().optional(),
  shortterm: z.boolean().optional(),
  longterm: z.boolean().optional(),
  unitNumber: z.string().optional(),
  unitName: z.string().optional(),
  surface: z.number().int().optional(),
  furnished: z.boolean().optional(),
  bedroomId: z.string().optional(),
  bathroomId: z.string().optional(),
  heat: z.boolean().optional(),
  water: z.boolean().optional(),
  electricity: z.boolean().optional(),
  internet: z.boolean().optional(),
  television: z.boolean().optional(),
  order: z.number().int().optional(),
  published: z.boolean().optional(),
});

export const updatableUnitFields: string[] = updateSchema.keyof().options;

export const updateUnitSchema = updateSchema.refine(
  ({
    name,
    rent,
    deposit,
    available,
    immediate,
    availableDate,
    shortterm,
    longterm,
    unitNumber,
    unitName,
    surface,
    furnished,
    bedroomId,
    bathroomId,
    heat,
    water,
    electricity,
    internet,
    television,
    order,
    published,
  }) =>
    typeof name !== 'undefined' ||
    typeof rent !== 'undefined' ||
    typeof deposit !== 'undefined' ||
    typeof available !== 'undefined' ||
    typeof immediate !== 'undefined' ||
    typeof availableDate !== 'undefined' ||
    typeof shortterm !== 'undefined' ||
    typeof longterm !== 'undefined' ||
    typeof unitNumber !== 'undefined' ||
    typeof unitName !== 'undefined' ||
    typeof surface !== 'undefined' ||
    typeof furnished !== 'undefined' ||
    typeof bedroomId !== 'undefined' ||
    typeof bathroomId !== 'undefined' ||
    typeof heat !== 'undefined' ||
    typeof water !== 'undefined' ||
    typeof electricity !== 'undefined' ||
    typeof internet !== 'undefined' ||
    typeof television !== 'undefined' ||
    typeof order !== 'undefined' ||
    typeof published !== 'undefined',
  {
    message: 'at least one field must be provided for update',
    path: updatableUnitFields,
  },
);

export const updateUnitSchemaExample = {
  rent: 1500,
  deposit: 1500,
  shortterm: false,
  longterm: true,
  order: 0,
  published: true,
};

export type UpdateUnitSchema = z.infer<typeof updateUnitSchema>;
