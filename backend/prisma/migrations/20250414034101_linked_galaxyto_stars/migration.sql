/*
  Warnings:

  - Added the required column `galaxyId` to the `Star` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Star" ADD COLUMN     "galaxyId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Star" ADD CONSTRAINT "Star_galaxyId_fkey" FOREIGN KEY ("galaxyId") REFERENCES "Galaxy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
