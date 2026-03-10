CREATE TABLE `brand_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`surveyId` int NOT NULL,
	`userId` int,
	`archetype` varchar(100),
	`mission` text,
	`coreFeeling` varchar(200),
	`positioningStatement` text,
	`brandDNA` json,
	`toneOfVoice` json,
	`colorPalette` json,
	`brandKeywords` json,
	`avatarUrl` text,
	`brandGuidelinesGenerated` json,
	`roleMapping` json,
	`contentPillars` json,
	`channelStrategy` json,
	`serviceRecommendation` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `brand_profiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `content_pieces` (
	`id` int AUTO_INCREMENT NOT NULL,
	`brandProfileId` int NOT NULL,
	`userId` int,
	`taskId` int,
	`contentType` enum('text_post','image_prompt','video_script','carousel','story') NOT NULL,
	`contentTitle` varchar(500),
	`body` text,
	`imageUrl` text,
	`metadata` json,
	`contentStatus` enum('draft','ready','published') NOT NULL DEFAULT 'draft',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `content_pieces_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `execution_plans` (
	`id` int AUTO_INCREMENT NOT NULL,
	`brandProfileId` int NOT NULL,
	`userId` int,
	`month` int NOT NULL,
	`title` varchar(255),
	`status` enum('draft','active','completed') NOT NULL DEFAULT 'draft',
	`weeklyPlan` json,
	`goals` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `execution_plans_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `survey_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`fullName` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`answers` json NOT NULL,
	`totalScore` int NOT NULL,
	`levelId` int NOT NULL,
	`levelName` varchar(100) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `survey_submissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`executionPlanId` int NOT NULL,
	`userId` int,
	`title` varchar(500) NOT NULL,
	`description` text,
	`category` enum('content','branding','networking','learning','strategy') NOT NULL,
	`week` int NOT NULL,
	`day` int,
	`taskStatus` enum('pending','in_progress','completed','skipped') NOT NULL DEFAULT 'pending',
	`stepByStepGuide` json,
	`aiPromptTemplate` text,
	`estimatedMinutes` int,
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `tasks_id` PRIMARY KEY(`id`)
);
