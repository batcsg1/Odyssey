-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_homePlanet_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "homePlanet" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_homePlanet_fkey" FOREIGN KEY ("homePlanet") REFERENCES "Planet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
