/*
  Warnings:

  - The primary key for the `type_users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `type_users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `typeUserId` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_typeUserId_fkey`;

-- AlterTable
ALTER TABLE `type_users` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `users` MODIFY `typeUserId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_typeUserId_fkey` FOREIGN KEY (`typeUserId`) REFERENCES `type_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
