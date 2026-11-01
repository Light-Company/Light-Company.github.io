CREATE TABLE `preorder_interest` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`full_name` text NOT NULL,
	`email` text NOT NULL,
	`company` text NOT NULL,
	`role` text,
	`use_case` text,
	`robot` text,
	`quantity` integer,
	`updates_opt_in` integer DEFAULT false NOT NULL,
	`source` text DEFAULT 'prism-order-page' NOT NULL,
	`consent_version` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `preorder_interest_email_unique` ON `preorder_interest` (`email`);