/*
  Warnings:

  - Added the required column `userId` to the `Slot` table without a default value. This is not possible if the table is not empty.
  - Made the column `passwordHash` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Profession" ADD COLUMN     "workingDays" TEXT NOT NULL DEFAULT '111111';

-- AlterTable
ALTER TABLE "Slot" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "passwordHash" SET NOT NULL,
ALTER COLUMN "passwordHash" SET DEFAULT '';
