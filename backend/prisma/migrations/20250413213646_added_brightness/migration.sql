/*
  Warnings:

  - You are about to drop the column `location` on the `Galaxy` table. All the data in the column will be lost.
  - Added the required column `brightness` to the `Asteroid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brightness` to the `Comet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brightness` to the `Planet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brightness` to the `Satellite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "GalaxyType" ADD VALUE 'BARRED_SPIRAL';

-- AlterTable
ALTER TABLE "Asteroid" ADD COLUMN     "brightness" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Comet" ADD COLUMN     "brightness" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Galaxy" DROP COLUMN "location";

-- AlterTable
ALTER TABLE "Planet" ADD COLUMN     "brightness" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Satellite" ADD COLUMN     "brightness" DOUBLE PRECISION NOT NULL;
