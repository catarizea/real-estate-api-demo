CREATE VIEW `property_view` AS SELECT * FROM (SELECT pc.`id`, pc.`listing_id`, pc.`address`, c.`name` AS `community`, pc.`type`, pc.`smoking`, pc.`cats`, pc.`dogs`, pc.`latitude`, pc.`longitude` FROM (SELECT p.`id`, p.`listing_id`, p.`address`, p.`community_id`, p.`smoking`, p.`cats`, p.`dogs`, p.`latitude`, p.`longitude`, t.`name` AS `type` FROM (SELECT `id`, `listing_id`, `address`, `type_id`, `community_id`, `smoking`, `cats`, `dogs`, `latitude`, `longitude` FROM `property` WHERE `published` = 1) AS p INNER JOIN (SELECT `id`, `name` FROM `type_prop`) AS t ON p.`type_id` = t.`id`) AS pc INNER JOIN (SELECT `id`, `name` FROM `community`) AS c ON pc.`community_id` = c.`id` ORDER BY pc.`id` ASC) AS f;

CREATE VIEW `unit_view` AS SELECT * FROM (SELECT ub.`id`, ub.`property_id`, ub.`rent`, ub.`immediate`, ub.`available_date`, ub.`shortterm`, ub.`longterm`, ub.`furnished`, ub.`heat`, ub.`water`, ub.`electricity`, ub.`internet`, ub.`television`, ub.`bedroom`, h.`name` AS `bathroom` FROM (SELECT u.`id`, u.`property_id`, u.`rent`, u.`immediate`, u.`available_date`, u.`shortterm`, u.`longterm`, u.`furnished`, u.`heat`, u.`water`, u.`electricity`, u.`internet`, u.`television`, b.`name` AS `bedroom`, u.`bathroom_id` FROM (SELECT `id`, `property_id`, `rent`, `immediate`, `available_date`, `shortterm`, `longterm`, `furnished`, `heat`, `water`, `electricity`, `internet`, `television`, `bedroom_id`, `bathroom_id` FROM `unit` WHERE `published` = 1 AND `available` = 1) AS u INNER JOIN (SELECT `id`, `name` FROM `bedroom`) AS b ON u.`bedroom_id` = b.`id`) AS ub INNER JOIN (SELECT `id`, `name` FROM `bathroom`) AS h ON ub.`bathroom_id` = h.`id` ORDER BY ub.`id` ASC) AS f;

CREATE VIEW `all_view` AS SELECT * FROM (SELECT u.`id`, u.`property_id`, u.`rent`, u.`immediate`, u.`available_date`, u.`shortterm`, u.`longterm`, u.`furnished`, u.`heat`, u.`water`, u.`electricity`, u.`internet`, u.`television`, u.`bedroom`, u.`bathroom`, p.`listing_id`, p.`address`, p.`community`, p.`type`, p.`smoking`, p.`cats`, p.`dogs`, p.`latitude`, p.`longitude` FROM (SELECT `id`, `property_id`, `rent`, `immediate`, `available_date`, `shortterm`, `longterm`, `furnished`, `heat`, `water`, `electricity`, `internet`, `television`, `bedroom`, `bathroom`  FROM `unit_view`) AS u INNER JOIN (SELECT `id`, `listing_id`, `address`, `community`, `type`, `smoking`, `cats`, `dogs`, `latitude`, `longitude` FROM `property_view`) AS p ON u.`property_id` = p.`id` ORDER BY u.`id` ASC) AS f;
