CREATE TABLE `activity_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`actUserId` int NOT NULL,
	`action` varchar(100) NOT NULL,
	`entityType` varchar(50),
	`entityId` int,
	`actTitle` varchar(500),
	`actDescription` text,
	`actMetadata` json,
	`actCreatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `activity_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `calendar_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`brandProfileId` int,
	`calEventTitle` varchar(500) NOT NULL,
	`calEventDescription` text,
	`eventType` enum('content','task','milestone','custom') NOT NULL DEFAULT 'custom',
	`scheduledDate` timestamp NOT NULL,
	`endDate` timestamp,
	`allDay` int DEFAULT 0,
	`contentPieceId` int,
	`calTaskId` int,
	`calPlanId` int,
	`calEventStatus` enum('scheduled','in_progress','completed','cancelled') NOT NULL DEFAULT 'scheduled',
	`color` varchar(20),
	`calEventMetadata` json,
	`calEventCreatedAt` timestamp NOT NULL DEFAULT (now()),
	`calEventUpdatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `calendar_events_id` PRIMARY KEY(`id`)
);
