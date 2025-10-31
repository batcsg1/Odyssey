/*
  Warnings:

  - Added the required column `age` to the `Comet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comet" ADD COLUMN     "age" DOUBLE PRECISION NOT NULL;
