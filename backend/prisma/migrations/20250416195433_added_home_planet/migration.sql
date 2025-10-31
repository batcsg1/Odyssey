/*
  Warnings:

  - Added the required column `homePlanet` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "homePlanet" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_homePlanet_fkey" FOREIGN KEY ("homePlanet") REFERENCES "Planet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
