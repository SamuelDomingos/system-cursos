/*
  Warnings:

  - The primary key for the `coursetopic` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `topic` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `coursetopic` DROP FOREIGN KEY `CourseTopic_topicId_fkey`;

-- DropIndex
DROP INDEX `CourseTopic_topicId_fkey` ON `coursetopic`;

-- AlterTable
ALTER TABLE `coursetopic` DROP PRIMARY KEY,
    MODIFY `topicId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`courseId`, `topicId`);

-- AlterTable
ALTER TABLE `topic` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `CourseTopic` ADD CONSTRAINT `CourseTopic_topicId_fkey` FOREIGN KEY (`topicId`) REFERENCES `Topic`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
