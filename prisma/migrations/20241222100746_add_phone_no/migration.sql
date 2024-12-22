/*
  Warnings:

  - Added the required column `phoneNo` to the `Profession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profession" ADD COLUMN     "phoneNo" TEXT NOT NULL;
