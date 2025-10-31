-- CreateTable
CREATE TABLE "Constellation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "right_ascension" DOUBLE PRECISION NOT NULL,
    "declination" DOUBLE PRECISION NOT NULL,
    "shape" TEXT NOT NULL,
    "area" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Constellation_pkey" PRIMARY KEY ("id")
);
