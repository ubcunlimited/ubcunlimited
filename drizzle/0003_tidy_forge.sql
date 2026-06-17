CREATE TABLE `leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`form_type` varchar(64) NOT NULL,
	`first_name` varchar(128) NOT NULL,
	`last_name` varchar(128) NOT NULL DEFAULT '',
	`email` varchar(320) NOT NULL DEFAULT '',
	`phone` varchar(32) NOT NULL DEFAULT '',
	`business_name` varchar(256),
	`business_type` varchar(128),
	`monthly_volume` varchar(64),
	`notes` text,
	`status` enum('new','contacted','qualified','closed','lost') NOT NULL DEFAULT 'new',
	`admin_notes` text,
	`source_page` varchar(256),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `leads_id` PRIMARY KEY(`id`)
);
