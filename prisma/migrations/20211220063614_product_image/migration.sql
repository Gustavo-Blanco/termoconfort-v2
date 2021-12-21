-- AlterTable
ALTER TABLE `Enterprise` MODIFY `isActive` BIT(1) NULL DEFAULT true;

-- AlterTable
ALTER TABLE `User` MODIFY `isActive` BIT(1) NULL DEFAULT true;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `enterpriseId` INTEGER NULL,
    `name` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `brand` VARCHAR(255) NULL,
    `capacity` VARCHAR(255) NULL,
    `model` VARCHAR(255) NULL,
    `type` VARCHAR(255) NULL,
    `energyConsume` VARCHAR(255) NULL,
    `install` BIT(1) NULL DEFAULT true,
    `warranty` BIT(1) NULL DEFAULT true,
    `stock` INTEGER NULL,
    `price` DECIMAL(8, 2) NULL,
    `isActive` BIT(1) NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NULL,
    `key` VARCHAR(255) NULL,
    `url` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_enterpriseId_fkey` FOREIGN KEY (`enterpriseId`) REFERENCES `Enterprise`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
