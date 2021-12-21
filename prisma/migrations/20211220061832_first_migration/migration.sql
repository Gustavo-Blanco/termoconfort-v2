-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `phoneNumber` VARCHAR(9) NULL,
    `profileImage` VARCHAR(255) NULL,
    `role` ENUM('CLIENT', 'ADMIN', 'ENTERPRISE') NULL DEFAULT 'CLIENT',
    `isActive` BIT(1) NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Enterprise` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `description` TEXT NULL,
    `imageUrl` VARCHAR(255) NULL,
    `imageKey` VARCHAR(255) NULL,
    `isActive` BIT(1) NULL DEFAULT true,
    `email` VARCHAR(255) NULL,
    `linkedin` VARCHAR(255) NULL,
    `facebook` VARCHAR(255) NULL,
    `twitter` VARCHAR(255) NULL,
    `youtube` VARCHAR(255) NULL,
    `instagram` VARCHAR(255) NULL,
    `webPage` VARCHAR(255) NULL,
    `workers` INTEGER NULL,
    `state` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Enterprise` ADD CONSTRAINT `Enterprise_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
