/*
  Warnings:

  - You are about to drop the column `asteroidId` on the `MeteorShower` table. All the data in the column will be lost.
  - You are about to drop the column `cometId` on the `MeteorShower` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "MeteorShower" DROP CONSTRAINT "MeteorShower_asteroidId_fkey";

-- DropForeignKey
ALTER TABLE "MeteorShower" DROP CONSTRAINT "MeteorShower_cometId_fkey";

-- AlterTable
ALTER TABLE "MeteorShower" DROP COLUMN "asteroidId",
DROP COLUMN "cometId";

-- CreateTable
CREATE TABLE "_AsteroidToMeteorShower" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AsteroidToMeteorShower_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CometToMeteorShower" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CometToMeteorShower_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AsteroidToMeteorShower_B_index" ON "_AsteroidToMeteorShower"("B");

-- CreateIndex
CREATE INDEX "_CometToMeteorShower_B_index" ON "_CometToMeteorShower"("B");

-- AddForeignKey
ALTER TABLE "_AsteroidToMeteorShower" ADD CONSTRAINT "_AsteroidToMeteorShower_A_fkey" FOREIGN KEY ("A") REFERENCES "Asteroid"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AsteroidToMeteorShower" ADD CONSTRAINT "_AsteroidToMeteorShower_B_fkey" FOREIGN KEY ("B") REFERENCES "MeteorShower"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CometToMeteorShower" ADD CONSTRAINT "_CometToMeteorShower_A_fkey" FOREIGN KEY ("A") REFERENCES "Comet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CometToMeteorShower" ADD CONSTRAINT "_CometToMeteorShower_B_fkey" FOREIGN KEY ("B") REFERENCES "MeteorShower"("id") ON DELETE CASCADE ON UPDATE CASCADE;
