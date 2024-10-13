-- CreateTable
CREATE TABLE `patients` (
    `id` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(150) NOT NULL,
    `last_name` VARCHAR(150) NOT NULL,
    `card_id` CHAR(10) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` CHAR(12) NULL,
    `address` VARCHAR(80) NULL,
    `type_card` ENUM('DNI', 'CE', 'PASSPORT') NOT NULL DEFAULT 'DNI',

    UNIQUE INDEX `patients_card_id_key`(`card_id`),
    UNIQUE INDEX `patients_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `patient_id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(20) NOT NULL,
    `password` TEXT NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `users_patient_id_key`(`patient_id`),
    UNIQUE INDEX `users_username_key`(`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
