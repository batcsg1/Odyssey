/*
  Warnings:

  - Added the required column `abbreviation` to the `Constellation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Constellation" ADD COLUMN     "abbreviation" TEXT NOT NULL;
