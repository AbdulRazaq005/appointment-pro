/*
  Warnings:

  - Added the required column `licenseNumber` to the `Profession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordHash` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profession" ADD COLUMN     "licenseNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "passwordHash" TEXT NOT NULL;
