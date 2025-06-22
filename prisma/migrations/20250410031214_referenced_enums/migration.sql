/*
  Warnings:

  - The `type` column on the `Asteroid` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `location` column on the `Asteroid` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type` column on the `Comet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `location` column on the `Comet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type` column on the `Planet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `location` column on the `Planet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type` column on the `Satellite` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `location` column on the `Satellite` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type` column on the `Star` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "GalaxyType" AS ENUM ('SPRIAL', 'ELLIPTICAL', 'IRREGULAR');

-- AlterTable
ALTER TABLE "Asteroid" DROP COLUMN "type",
ADD COLUMN     "type" "AsteroidType" NOT NULL DEFAULT 'METALLIC',
DROP COLUMN "location",
ADD COLUMN     "location" "Location" NOT NULL DEFAULT 'INNER_SOLAR_SYSTEM';

-- AlterTable
ALTER TABLE "Comet" DROP COLUMN "type",
ADD COLUMN     "type" "CometType" NOT NULL DEFAULT 'SHORT_PERIOD',
DROP COLUMN "location",
ADD COLUMN     "location" "Location" NOT NULL DEFAULT 'INNER_SOLAR_SYSTEM';

-- AlterTable
ALTER TABLE "Planet" DROP COLUMN "type",
ADD COLUMN     "type" "PlanetType" NOT NULL DEFAULT 'TERRESTIAL',
DROP COLUMN "location",
ADD COLUMN     "location" "Location" NOT NULL DEFAULT 'INNER_SOLAR_SYSTEM';

-- AlterTable
ALTER TABLE "Satellite" DROP COLUMN "type",
ADD COLUMN     "type" "SatelliteType" NOT NULL DEFAULT 'MOON',
DROP COLUMN "location",
ADD COLUMN     "location" "Location" NOT NULL DEFAULT 'INNER_SOLAR_SYSTEM';

-- AlterTable
ALTER TABLE "Star" DROP COLUMN "type",
ADD COLUMN     "type" "StarType" NOT NULL DEFAULT 'YELLOW_DWARF';

-- CreateTable
CREATE TABLE "Galaxy" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "GalaxyType" NOT NULL DEFAULT 'ELLIPTICAL',
    "distance" DOUBLE PRECISION NOT NULL,
    "size" DOUBLE PRECISION NOT NULL,
    "starCount" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "constellationId" TEXT,

    CONSTRAINT "Galaxy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Galaxy" ADD CONSTRAINT "Galaxy_constellationId_fkey" FOREIGN KEY ("constellationId") REFERENCES "Constellation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
