CREATE TABLE `all` AS SELECT * FROM `all_view`;

ALTER TABLE `all` ADD PRIMARY KEY(`id`);

CREATE FULLTEXT INDEX `parking_idx` ON `all` (`parking`);

CREATE FULLTEXT INDEX `feature_idx` ON `all` (`feature`);

CREATE FULLTEXT INDEX `address_idx` ON `all` (`address`);

CREATE INDEX `property_id_idx` ON `all` (`property_id`);

CREATE INDEX `rent_idx` ON `all` (`rent`);

CREATE INDEX `immediate_idx` ON `all` (`immediate`);

CREATE INDEX `shortterm_idx` ON `all` (`shortterm`);

CREATE INDEX `longterm_idx` ON `all` (`longterm`);

CREATE INDEX `furnished_idx` ON `all` (`furnished`);

CREATE INDEX `heat_idx` ON `all` (`heat`);

CREATE INDEX `water_idx` ON `all` (`water`);

CREATE INDEX `electricity_idx` ON `all` (`electricity`);

CREATE INDEX `internet_idx` ON `all` (`internet`);

CREATE INDEX `television_idx` ON `all` (`television`);

CREATE INDEX `bedroom_idx` ON `all` (`bedroom`);

CREATE INDEX `bathroom_idx` ON `all` (`bathroom`);

CREATE INDEX `listing_id_idx` ON `all` (`listing_id`);

CREATE INDEX `type_idx` ON `all` (`type`);

CREATE INDEX `smoking_idx` ON `all` (`smoking`);

CREATE INDEX `cats_idx` ON `all` (`cats`);

CREATE INDEX `dogs_idx` ON `all` (`dogs`);

CREATE INDEX `latitude_idx` ON `all` (`latitude`);

CREATE INDEX `longitude_idx` ON `all` (`longitude`);

CREATE VIEW `search_view` AS SELECT * FROM `all`;
