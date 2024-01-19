CREATE TABLE `bathroom` (
	`id` varchar(128) NOT NULL,
	`name` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `bathroom_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bedroom` (
	`id` varchar(128) NOT NULL,
	`name` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `bedroom_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `city` (
	`id` varchar(128) NOT NULL,
	`name` varchar(256) NOT NULL,
	`region_id` varchar(128) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `city_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `community` (
	`id` varchar(128) NOT NULL,
	`name` varchar(256) NOT NULL,
	`city_id` varchar(128) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `community_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `feature` (
	`id` varchar(128) NOT NULL,
	`name` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `feature_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `feature_to_property` (
	`feature_id` varchar(128) NOT NULL,
	`property_id` varchar(128) NOT NULL,
	CONSTRAINT `feature_to_property_pk` PRIMARY KEY(`feature_id`,`property_id`)
);
--> statement-breakpoint
CREATE TABLE `media` (
	`id` varchar(128) NOT NULL,
	`url` varchar(256) NOT NULL,
	`media_type_id` varchar(128) NOT NULL,
	`property_id` varchar(128) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `media_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media_type` (
	`id` varchar(128) NOT NULL,
	`name` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `media_type_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `parking` (
	`id` varchar(128) NOT NULL,
	`name` varchar(256) NOT NULL,
	`property_id` varchar(128) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `parking_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `property` (
	`id` varchar(128) NOT NULL,
	`name` varchar(256) NOT NULL,
	`address` varchar(256) NOT NULL,
	`type_id` varchar(128) NOT NULL,
	`bedroom_id` varchar(128),
	`bathroom_id` varchar(128),
	`community_id` varchar(128),
	`city_id` varchar(128) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `property_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `region` (
	`id` varchar(128) NOT NULL,
	`name` varchar(256) NOT NULL,
	`administrative_name` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `region_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `type_prop` (
	`id` varchar(128) NOT NULL,
	`name` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `type_prop_id` PRIMARY KEY(`id`)
);
