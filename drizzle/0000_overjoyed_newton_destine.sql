CREATE TABLE `bathroom` (
	`id` varchar(128) NOT NULL,
	`name` varchar(256) NOT NULL,
	`order` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `bathroom_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bedroom` (
	`id` varchar(128) NOT NULL,
	`name` varchar(256) NOT NULL,
	`order` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `bedroom_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `building_feature` (
	`id` varchar(128) NOT NULL,
	`name` varchar(256) NOT NULL,
	`order` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `building_feature_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `building_feature_to_property` (
	`building_feature_id` varchar(128) NOT NULL,
	`property_id` varchar(128) NOT NULL,
	CONSTRAINT `building_feature_to_property_pk` PRIMARY KEY(`building_feature_id`,`property_id`)
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
CREATE TABLE `community_feature` (
	`id` varchar(128) NOT NULL,
	`name` varchar(256) NOT NULL,
	`order` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `community_feature_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `community_feature_to_community` (
	`community_feature_id` varchar(128) NOT NULL,
	`community_id` varchar(128) NOT NULL,
	CONSTRAINT `community_feature_to_community_pk` PRIMARY KEY(`community_feature_id`,`community_id`)
);
--> statement-breakpoint
CREATE TABLE `feature` (
	`id` varchar(128) NOT NULL,
	`name` varchar(256) NOT NULL,
	`order` int NOT NULL,
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
CREATE TABLE `floor_plan` (
	`id` varchar(128) NOT NULL,
	`name` varchar(256) NOT NULL,
	`property_id` varchar(128) NOT NULL,
	`order` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `floor_plan_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media` (
	`id` varchar(128) NOT NULL,
	`url` varchar(256) NOT NULL,
	`media_type_id` varchar(128) NOT NULL,
	`property_id` varchar(128) NOT NULL,
	`order` int NOT NULL,
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
	`fee` int,
	`fee_interval` varchar(128),
	`order` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `parking_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `property` (
	`id` varchar(128) NOT NULL,
	`listing_id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`address` varchar(256) NOT NULL,
	`year_built` int,
	`description_title` varchar(256),
	`description_subtitle` varchar(256),
	`description_text` text,
	`type_id` varchar(128) NOT NULL,
	`community_id` varchar(128),
	`city_id` varchar(128) NOT NULL,
	`smoking` boolean NOT NULL DEFAULT false,
	`cats` boolean NOT NULL DEFAULT false,
	`dogs` boolean NOT NULL DEFAULT false,
	`pets_negotiable` boolean NOT NULL DEFAULT false,
	`pets_fee` int,
	`pets_fee_interval` varchar(128),
	`published` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `property_id` PRIMARY KEY(`id`),
	CONSTRAINT `property_listing_id_unique` UNIQUE(`listing_id`)
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
	`order` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `type_prop_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `unit` (
	`id` varchar(128) NOT NULL,
	`name` varchar(256) NOT NULL,
	`property_id` varchar(128) NOT NULL,
	`floor_plan_id` varchar(128) NOT NULL,
	`rent` int NOT NULL,
	`deposit` int,
	`available` boolean NOT NULL DEFAULT true,
	`immediate` boolean NOT NULL DEFAULT true,
	`available_date` date,
	`shortterm` boolean NOT NULL DEFAULT false,
	`longterm` boolean NOT NULL DEFAULT true,
	`unit_number` varchar(128),
	`unit_name` varchar(128),
	`surface` int NOT NULL,
	`furnished` boolean NOT NULL DEFAULT true,
	`bedroom_id` varchar(128),
	`bathroom_id` varchar(128),
	`heat` boolean NOT NULL DEFAULT false,
	`water` boolean NOT NULL DEFAULT false,
	`electricity` boolean NOT NULL DEFAULT false,
	`internet` boolean NOT NULL DEFAULT false,
	`television` boolean NOT NULL DEFAULT false,
	`order` int NOT NULL,
	`published` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `unit_id` PRIMARY KEY(`id`)
);
