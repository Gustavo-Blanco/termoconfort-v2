/*
  Warnings:

  - You are about to alter the column `capacity` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - You are about to alter the column `energyConsume` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Comment` MODIFY `isActive` BIT(1) NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Enterprise` MODIFY `isActive` BIT(1) NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Post` MODIFY `isActive` BIT(1) NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Product` MODIFY `capacity` INTEGER NULL,
    MODIFY `energyConsume` INTEGER NULL,
    MODIFY `install` BIT(1) NULL DEFAULT true,
    MODIFY `warranty` BIT(1) NULL DEFAULT true,
    MODIFY `isActive` BIT(1) NULL DEFAULT true;

-- AlterTable
ALTER TABLE `User` MODIFY `isActive` BIT(1) NULL DEFAULT true;
