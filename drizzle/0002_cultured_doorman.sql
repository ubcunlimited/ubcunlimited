CREATE TABLE `testimonial_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(128) NOT NULL,
	`business_name` varchar(256) NOT NULL,
	`location` varchar(128) NOT NULL,
	`industry` varchar(64) NOT NULL,
	`quote` text NOT NULL,
	`rating` int NOT NULL DEFAULT 5,
	`email` varchar(320),
	`status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`admin_notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`reviewedAt` timestamp,
	CONSTRAINT `testimonial_submissions_id` PRIMARY KEY(`id`)
);
