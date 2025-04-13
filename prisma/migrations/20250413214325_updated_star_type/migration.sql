/*
  Warnings:

  - The values [YELLOW_DWARF,BLUE_GIANT,RED_SUPERGIANT] on the enum `StarType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StarType_new" AS ENUM ('WHITE_DWARF', 'MAIN_SEQUENCE', 'RED_DWARF', 'RED_GIANT', 'SUPERGIANT', 'NEUTRON_STAR');
ALTER TABLE "Star" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Star" ALTER COLUMN "type" TYPE "StarType_new" USING ("type"::text::"StarType_new");
ALTER TYPE "StarType" RENAME TO "StarType_old";
ALTER TYPE "StarType_new" RENAME TO "StarType";
DROP TYPE "StarType_old";
ALTER TABLE "Star" ALTER COLUMN "type" SET DEFAULT 'MAIN_SEQUENCE';
COMMIT;

-- AlterTable
ALTER TABLE "Star" ALTER COLUMN "type" SET DEFAULT 'MAIN_SEQUENCE';
