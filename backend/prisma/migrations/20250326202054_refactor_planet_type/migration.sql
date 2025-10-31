/*
  Warnings:

  - The values [GAS_PLANET,ROCKY_PLANET] on the enum `PlanetType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PlanetType_new" AS ENUM ('GAS_GIANT', 'TERRESTIAL', 'DWARF_PLANET', 'EXO_PLANET');
ALTER TYPE "PlanetType" RENAME TO "PlanetType_old";
ALTER TYPE "PlanetType_new" RENAME TO "PlanetType";
DROP TYPE "PlanetType_old";
COMMIT;
