CREATE TABLE `seo_audit_config` (
	`id` int AUTO_INCREMENT NOT NULL,
	`schedule_cron_task_uid` varchar(65),
	`cron_expression` varchar(64) NOT NULL DEFAULT '0 0 6 * * 1',
	`enabled` int NOT NULL DEFAULT 1,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `seo_audit_config_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `seo_audit_issues` (
	`id` int AUTO_INCREMENT NOT NULL,
	`run_id` int NOT NULL,
	`severity` enum('error','warning','notice') NOT NULL,
	`issue_type` varchar(256) NOT NULL,
	`description` text NOT NULL,
	`affected_pages` int NOT NULL DEFAULT 0,
	`raw_issue_data` text,
	`ai_analysis` text,
	`ai_analyzed_at` timestamp,
	`fix_status` enum('pending','analyzed','fix_ready','applied','ignored') NOT NULL DEFAULT 'pending',
	`suggested_fix` text,
	`admin_notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `seo_audit_issues_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `seo_audit_runs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`total_issues` int NOT NULL DEFAULT 0,
	`errors` int NOT NULL DEFAULT 0,
	`warnings` int NOT NULL DEFAULT 0,
	`notices` int NOT NULL DEFAULT 0,
	`raw_data` text,
	`status` enum('running','completed','failed') NOT NULL DEFAULT 'running',
	`error_message` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	CONSTRAINT `seo_audit_runs_id` PRIMARY KEY(`id`)
);
