ALTER TABLE `parking` ADD CONSTRAINT `unique_name_property_id` UNIQUE(`name`,`property_id`);--> statement-breakpoint
CREATE INDEX `property_id_idx` ON `parking` (`property_id`);