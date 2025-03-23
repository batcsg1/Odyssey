/*
  Warnings:

  - You are about to drop the column `dwarfPlanetId` on the `Satellite` table. All the data in the column will be lost.
  - You are about to drop the `DwarfPlanet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DwarfPlanet" DROP CONSTRAINT "DwarfPlanet_starId_fkey";

-- DropForeignKey
ALTER TABLE "Satellite" DROP CONSTRAINT "Satellite_dwarfPlanetId_fkey";

-- AlterTable
ALTER TABLE "Satellite" DROP COLUMN "dwarfPlanetId";

-- DropTable
DROP TABLE "DwarfPlanet";
