/*
  Warnings:

  - Made the column `constellationId` on table `MeteorShower` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "MeteorShower" DROP CONSTRAINT "MeteorShower_constellationId_fkey";

-- AlterTable
ALTER TABLE "MeteorShower" ALTER COLUMN "constellationId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "MeteorShower" ADD CONSTRAINT "MeteorShower_constellationId_fkey" FOREIGN KEY ("constellationId") REFERENCES "Constellation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
