/*
  Warnings:

  - You are about to drop the column `homePlanet` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_homePlanet_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "homePlanet",
ADD COLUMN     "planetId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_planetId_fkey" FOREIGN KEY ("planetId") REFERENCES "Planet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
