/*
  Warnings:

  - You are about to drop the column `declination` on the `Constellation` table. All the data in the column will be lost.
  - You are about to drop the column `right_ascension` on the `Constellation` table. All the data in the column will be lost.
  - You are about to drop the column `starCount` on the `Galaxy` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Meteorite` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Meteorite` table. All the data in the column will be lost.
  - You are about to drop the column `declination` on the `Star` table. All the data in the column will be lost.
  - You are about to drop the column `rightAscension` on the `Star` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Constellation" DROP COLUMN "declination",
DROP COLUMN "right_ascension";

-- AlterTable
ALTER TABLE "Galaxy" DROP COLUMN "starCount";

-- AlterTable
ALTER TABLE "Meteorite" DROP COLUMN "latitude",
DROP COLUMN "longitude";

-- AlterTable
ALTER TABLE "Star" DROP COLUMN "declination",
DROP COLUMN "rightAscension";
