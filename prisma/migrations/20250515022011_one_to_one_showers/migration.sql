/*
  Warnings:

  - A unique constraint covering the columns `[constellationId]` on the table `MeteorShower` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MeteorShower_constellationId_key" ON "MeteorShower"("constellationId");
