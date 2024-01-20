ALTER TABLE `city` ADD `latitude` decimal(10,8) NOT NULL;--> statement-breakpoint
ALTER TABLE `city` ADD `longitude` decimal(11,8) NOT NULL;--> statement-breakpoint
ALTER TABLE `community` ADD `latitude` decimal(10,8) NOT NULL;--> statement-breakpoint
ALTER TABLE `community` ADD `longitude` decimal(11,8) NOT NULL;--> statement-breakpoint
ALTER TABLE `property` ADD `latitude` decimal(10,8) NOT NULL;--> statement-breakpoint
ALTER TABLE `property` ADD `longitude` decimal(11,8) NOT NULL;