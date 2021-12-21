/*
  Warnings:

  - You are about to drop the column `social` on the `Enterprise` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Comment` MODIFY `isActive` BIT(1) NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Enterprise` DROP COLUMN `social`,
    ADD COLUMN `email` VARCHAR(255) NULL,
    ADD COLUMN `facebook` VARCHAR(255) NULL,
    ADD COLUMN `instagram` VARCHAR(255) NULL,
    ADD COLUMN `linkedin` VARCHAR(255) NULL,
    ADD COLUMN `twitter` VARCHAR(255) NULL,
    ADD COLUMN `webPage` VARCHAR(255) NULL,
    ADD COLUMN `youtube` VARCHAR(255) NULL,
    MODIFY `isActive` BIT(1) NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Post` MODIFY `isActive` BIT(1) NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Product` MODIFY `install` BIT(1) NULL DEFAULT true,
    MODIFY `warranty` BIT(1) NULL DEFAULT true,
    MODIFY `isActive` BIT(1) NULL DEFAULT true;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `image`,
    ADD COLUMN `profileImage` VARCHAR(255) NULL,
    ADD COLUMN `profileKey` VARCHAR(255) NULL,
    MODIFY `isActive` BIT(1) NULL DEFAULT true;
