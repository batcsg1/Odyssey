/*
  Warnings:

  - You are about to drop the column `meteorVelocity` on the `MeteorShower` table. All the data in the column will be lost.
  - You are about to drop the column `meteorsPerHour` on the `MeteorShower` table. All the data in the column will be lost.
  - Added the required column `brightness` to the `Galaxy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Galaxy" ADD COLUMN     "brightness" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "MeteorShower" DROP COLUMN "meteorVelocity",
DROP COLUMN "meteorsPerHour",
ADD COLUMN     "perHour" INTEGER,
ADD COLUMN     "velocity" DOUBLE PRECISION;
