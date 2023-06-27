-- CreateTable
CREATE TABLE `Server` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `ip` VARCHAR(191) NOT NULL,
    `login` VARCHAR(191) NOT NULL,
    `sshkeyId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Server` ADD CONSTRAINT `Server_sshkeyId_fkey` FOREIGN KEY (`sshkeyId`) REFERENCES `SshKey`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
