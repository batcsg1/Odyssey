/*
  Warnings:

  - The `atmosphere` column on the `Planet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `atmosphere` column on the `Satellite` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Location" AS ENUM ('INNER_SOLAR_SYSTEM', 'ASTEROID_BELT', 'OUTER_SOLAR_SYSTEM', 'KUIPER_BELT', 'OUTSIDE_SOLAR_SYSTEM');

-- CreateEnum
CREATE TYPE "StarType" AS ENUM ('WHITE_DWARF', 'YELLOW_DWARF', 'RED_DWARF', 'BLUE_GIANT', 'RED_GIANT', 'RED_SUPERGIANT', 'NEUTRON_STAR');

-- CreateEnum
CREATE TYPE "PlanetType" AS ENUM ('GAS_PLANET', 'ROCKY_PLANET', 'DWARF_PLANET', 'EXO_PLANET');

-- CreateEnum
CREATE TYPE "SatelliteType" AS ENUM ('MOON', 'SATELLITE');

-- CreateEnum
CREATE TYPE "AsteroidType" AS ENUM ('CHONDRITE', 'STONY', 'METALLIC');

-- CreateEnum
CREATE TYPE "CometType" AS ENUM ('SHORT_PERIOD', 'LONG_PERIOD');

-- AlterTable
ALTER TABLE "Planet" DROP COLUMN "atmosphere",
ADD COLUMN     "atmosphere" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Satellite" DROP COLUMN "atmosphere",
ADD COLUMN     "atmosphere" BOOLEAN NOT NULL DEFAULT false;
