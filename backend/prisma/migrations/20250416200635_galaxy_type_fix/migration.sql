/*
  Warnings:

  - The values [SPRIAL] on the enum `GalaxyType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "GalaxyType_new" AS ENUM ('SPIRAL', 'ELLIPTICAL', 'IRREGULAR', 'BARRED_SPIRAL');
ALTER TABLE "Galaxy" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Galaxy" ALTER COLUMN "type" TYPE "GalaxyType_new" USING ("type"::text::"GalaxyType_new");
ALTER TYPE "GalaxyType" RENAME TO "GalaxyType_old";
ALTER TYPE "GalaxyType_new" RENAME TO "GalaxyType";
DROP TYPE "GalaxyType_old";
ALTER TABLE "Galaxy" ALTER COLUMN "type" SET DEFAULT 'ELLIPTICAL';
COMMIT;
