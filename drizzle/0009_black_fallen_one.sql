ALTER TABLE `feature` ADD CONSTRAINT `feature_name_unique` UNIQUE(`name`);--> statement-breakpoint
ALTER TABLE `type_prop` ADD CONSTRAINT `type_prop_name_unique` UNIQUE(`name`);