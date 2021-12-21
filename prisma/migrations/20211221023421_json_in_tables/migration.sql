/*
  Warnings:

  - You are about to drop the column `email` on the `Enterprise` table. All the data in the column will be lost.
  - You are about to drop the column `facebook` on the `Enterprise` table. All the data in the column will be lost.
  - You are about to drop the column `instagram` on the `Enterprise` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin` on the `Enterprise` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `Enterprise` table. All the data in the column will be lost.
  - You are about to drop the column `webPage` on the `Enterprise` table. All the data in the column will be lost.
  - You are about to drop the column `youtube` on the `Enterprise` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profileKey` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Comment` MODIFY `isActive` BIT(1) NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Enterprise` DROP COLUMN `email`,
    DROP COLUMN `facebook`,
    DROP COLUMN `instagram`,
    DROP COLUMN `linkedin`,
    DROP COLUMN `twitter`,
    DROP COLUMN `webPage`,
    DROP COLUMN `youtube`,
    ADD COLUMN `social` JSON NULL,
    MODIFY `isActive` BIT(1) NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Post` MODIFY `isActive` BIT(1) NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Product` MODIFY `install` BIT(1) NULL DEFAULT true,
    MODIFY `warranty` BIT(1) NULL DEFAULT true,
    MODIFY `isActive` BIT(1) NULL DEFAULT true;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `profileImage`,
    DROP COLUMN `profileKey`,
    ADD COLUMN `image` JSON NULL,
    MODIFY `isActive` BIT(1) NULL DEFAULT true;
