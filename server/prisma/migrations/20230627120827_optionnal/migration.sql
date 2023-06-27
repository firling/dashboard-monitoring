-- DropForeignKey
ALTER TABLE `server` DROP FOREIGN KEY `Server_sshkeyId_fkey`;

-- DropForeignKey
ALTER TABLE `service` DROP FOREIGN KEY `Service_serverId_fkey`;

-- AlterTable
ALTER TABLE `server` MODIFY `sshkeyId` INTEGER NULL;

-- AlterTable
ALTER TABLE `service` MODIFY `serverId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Server` ADD CONSTRAINT `Server_sshkeyId_fkey` FOREIGN KEY (`sshkeyId`) REFERENCES `SshKey`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_serverId_fkey` FOREIGN KEY (`serverId`) REFERENCES `Server`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
