ALTER TABLE `building_feature` ADD CONSTRAINT `building_feature_name_unique` UNIQUE(`name`);--> statement-breakpoint
ALTER TABLE `community_feature` ADD CONSTRAINT `community_feature_name_unique` UNIQUE(`name`);