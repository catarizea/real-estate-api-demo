ALTER TABLE `community` ADD `score` int;--> statement-breakpoint
ALTER TABLE `community` ADD `image_url` varchar(256);--> statement-breakpoint
ALTER TABLE `community` ADD `quadrant` varchar(32);--> statement-breakpoint
ALTER TABLE `community` ADD `sector` varchar(128);--> statement-breakpoint
ALTER TABLE `community` ADD `ward` varchar(64);--> statement-breakpoint
ALTER TABLE `community` ADD `population` int;--> statement-breakpoint
ALTER TABLE `community` ADD `dwellings` int;--> statement-breakpoint
ALTER TABLE `community` ADD `used_for_renting` decimal(4,2);--> statement-breakpoint
ALTER TABLE `community` ADD `area` decimal(10,2);--> statement-breakpoint
ALTER TABLE `community` ADD `density` decimal(4,2);--> statement-breakpoint
ALTER TABLE `community` ADD `average_income` int;--> statement-breakpoint
ALTER TABLE `community` ADD `low_income` decimal(4,2);--> statement-breakpoint
ALTER TABLE `community` ADD `immigrants` decimal(4,2);--> statement-breakpoint
ALTER TABLE `community` ADD `elevation` int;--> statement-breakpoint
ALTER TABLE `community` ADD `established` int;--> statement-breakpoint
ALTER TABLE `community` ADD `description` text;