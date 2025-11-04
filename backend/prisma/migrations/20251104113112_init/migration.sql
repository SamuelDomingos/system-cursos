-- AlterTable
ALTER TABLE `progress` ADD COLUMN `duration` INTEGER NULL,
    ADD COLUMN `watchTime` INTEGER NOT NULL DEFAULT 0;
