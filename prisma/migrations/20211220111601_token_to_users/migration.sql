-- AlterTable
ALTER TABLE `Comment` MODIFY `isActive` BIT(1) NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Enterprise` MODIFY `isActive` BIT(1) NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Post` MODIFY `isActive` BIT(1) NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Product` MODIFY `install` BIT(1) NULL DEFAULT true,
    MODIFY `warranty` BIT(1) NULL DEFAULT true,
    MODIFY `isActive` BIT(1) NULL DEFAULT true;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `token` TEXT NULL,
    MODIFY `isActive` BIT(1) NULL DEFAULT true;
