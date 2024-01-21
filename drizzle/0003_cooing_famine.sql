CREATE TABLE `seed_address` (
	`id` varchar(128) NOT NULL,
	`name` varchar(256) NOT NULL,
	`street_number` varchar(10) NOT NULL,
	`street_name` varchar(128) NOT NULL,
	`neighborhood` varchar(100),
	`zip_code` varchar(30) NOT NULL,
	`city` varchar(100) NOT NULL,
	`administrative_long` varchar(100),
	`administrative_short` varchar(100),
	`country` varchar(100) NOT NULL,
	`latitude` decimal(10,8) NOT NULL,
	`longitude` decimal(11,8) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `seed_address_id` PRIMARY KEY(`id`)
);
