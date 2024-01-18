CREATE TABLE `property` (
	`id` varchar(128) NOT NULL,
	`name` varchar(256) NOT NULL,
	`address` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `property_id` PRIMARY KEY(`id`)
);
