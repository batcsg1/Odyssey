/*
  Warnings:

  - Added the required column `updatedAt` to the `Asteroid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Comet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `MeteorShower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Meteorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Planet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Satellite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Star` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Asteroid" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Comet" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "MeteorShower" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Meteorite" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Planet" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Satellite" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Star" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
