/*
  Warnings:

  - Made the column `type` on table `Asteroid` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Asteroid" ALTER COLUMN "type" SET NOT NULL;
