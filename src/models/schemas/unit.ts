import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import {
  boolean,
  date,
  index,
  int,
  mysqlTable,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

import { bathroom } from './bathroom';
import { bedroom } from './bedroom';
import { floorPlan } from './floorPlan';
import { property } from './property';

export const unit = mysqlTable(
  'unit',
  {
    id: varchar('id', { length: 128 })
      .$defaultFn(() => createId())
      .primaryKey(),
    name: varchar('name', { length: 256 }).notNull(),
    propertyId: varchar('property_id', { length: 128 }).notNull(),
    floorPlanId: varchar('floor_plan_id', { length: 128 }).notNull(),
    rent: int('rent').notNull(),
    deposit: int('deposit'),
    available: boolean('available').notNull().default(true),
    immediate: boolean('immediate').notNull().default(true),
    availableDate: date('available_date'),
    shortterm: boolean('shortterm').notNull().default(false),
    longterm: boolean('longterm').notNull().default(true),
    unitNumber: varchar('unit_number', { length: 128 }),
    unitName: varchar('unit_name', { length: 128 }),
    surface: int('surface').notNull(),
    furnished: boolean('furnished').notNull().default(true),
    bedroomId: varchar('bedroom_id', { length: 128 }),
    bathroomId: varchar('bathroom_id', { length: 128 }),
    heat: boolean('heat').notNull().default(false),
    water: boolean('water').notNull().default(false),
    electricity: boolean('electricity').notNull().default(false),
    internet: boolean('internet').notNull().default(false),
    television: boolean('television').notNull().default(false),
    order: int('order').notNull(),
    published: boolean('published').notNull().default(false),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (t) => ({
    propertyIdIdx: index('property_id_idx').on(t.propertyId),
    bedroomIdIdx: index('bedroom_id_idx').on(t.bedroomId),
    bathroomIdIdx: index('bathroom_id_idx').on(t.bathroomId),
    rentIdx: index('rent_idx').on(t.rent),
    publishedIdx: index('published_idx').on(t.published),
  }),
);

export const unitFloorPlanRelations = relations(unit, ({ one }) => ({
  floorPlan: one(floorPlan, {
    fields: [unit.floorPlanId],
    references: [floorPlan.id],
  }),
}));

export const unitPropertyRelations = relations(unit, ({ one }) => ({
  property: one(property, {
    fields: [unit.propertyId],
    references: [property.id],
  }),
}));

export const unitBathroomRelations = relations(unit, ({ one }) => ({
  bathroom: one(bathroom, {
    fields: [unit.bathroomId],
    references: [bathroom.id],
  }),
}));

export const unitBedroomRelations = relations(unit, ({ one }) => ({
  bedroom: one(bedroom, {
    fields: [unit.bedroomId],
    references: [bedroom.id],
  }),
}));
