import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import {
  int,
  mysqlTable,
  primaryKey,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

import { community } from './community';

export const communityFeature = mysqlTable('community_feature', {
  id: varchar('id', { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  order: int('order').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const communityFeatureCommunityRelations = relations(
  communityFeature,
  ({ many }) => ({
    communityFeatureToCommunity: many(communityFeatureToCommunity),
  }),
);

export const communityFeatureToCommunity = mysqlTable(
  'community_feature_to_community',
  {
    communityFeatureId: varchar('community_feature_id', {
      length: 128,
    }).notNull(),
    communityId: varchar('community_id', { length: 128 }).notNull(),
  },
  (t) => ({
    pk: primaryKey({
      name: 'community_feature_to_community_pk',
      columns: [t.communityFeatureId, t.communityId],
    }),
  }),
);

export const communityFeatureToCommunityRelations = relations(
  communityFeatureToCommunity,
  ({ one }) => ({
    communityFeature: one(communityFeature, {
      fields: [communityFeatureToCommunity.communityFeatureId],
      references: [communityFeature.id],
    }),
    community: one(community, {
      fields: [communityFeatureToCommunity.communityId],
      references: [community.id],
    }),
  }),
);
