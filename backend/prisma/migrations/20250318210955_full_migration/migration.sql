-- AlterTable
ALTER TABLE "Constellation" ALTER COLUMN "right_ascension" DROP NOT NULL,
ALTER COLUMN "declination" DROP NOT NULL,
ALTER COLUMN "shape" DROP NOT NULL,
ALTER COLUMN "area" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Star" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" DOUBLE PRECISION NOT NULL,
    "mass" DOUBLE PRECISION NOT NULL,
    "diameter" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "luminosity" DOUBLE PRECISION NOT NULL,
    "hasPlanets" BOOLEAN NOT NULL DEFAULT false,
    "brightness" DOUBLE PRECISION NOT NULL,
    "rightAscension" DOUBLE PRECISION,
    "declination" DOUBLE PRECISION,
    "constellationId" TEXT,

    CONSTRAINT "Star_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Planet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" DOUBLE PRECISION NOT NULL,
    "mass" DOUBLE PRECISION NOT NULL,
    "diameter" DOUBLE PRECISION NOT NULL,
    "density" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "atmosphere" TEXT NOT NULL,
    "year" DOUBLE PRECISION NOT NULL,
    "perigee" DOUBLE PRECISION NOT NULL,
    "apogee" DOUBLE PRECISION NOT NULL,
    "tilt" DOUBLE PRECISION,
    "hasSatellites" BOOLEAN NOT NULL DEFAULT false,
    "minTemp" DOUBLE PRECISION NOT NULL,
    "maxTemp" DOUBLE PRECISION NOT NULL,
    "gravity" DOUBLE PRECISION NOT NULL,
    "day" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "habitable" BOOLEAN NOT NULL DEFAULT false,
    "starId" TEXT NOT NULL,

    CONSTRAINT "Planet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DwarfPlanet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" DOUBLE PRECISION NOT NULL,
    "mass" DOUBLE PRECISION NOT NULL,
    "diameter" DOUBLE PRECISION NOT NULL,
    "density" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "atmosphere" TEXT NOT NULL,
    "year" DOUBLE PRECISION NOT NULL,
    "perigee" DOUBLE PRECISION NOT NULL,
    "apogee" DOUBLE PRECISION NOT NULL,
    "tilt" DOUBLE PRECISION,
    "hasSatellites" BOOLEAN NOT NULL DEFAULT false,
    "minTemp" DOUBLE PRECISION,
    "maxTemp" DOUBLE PRECISION,
    "gravity" DOUBLE PRECISION,
    "day" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "habitable" BOOLEAN NOT NULL DEFAULT false,
    "starId" TEXT NOT NULL,

    CONSTRAINT "DwarfPlanet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Satellite" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" DOUBLE PRECISION NOT NULL,
    "mass" DOUBLE PRECISION NOT NULL,
    "diameter" DOUBLE PRECISION NOT NULL,
    "density" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "atmosphere" TEXT NOT NULL,
    "year" DOUBLE PRECISION NOT NULL,
    "perigee" DOUBLE PRECISION NOT NULL,
    "apogee" DOUBLE PRECISION NOT NULL,
    "tilt" DOUBLE PRECISION,
    "minTemp" DOUBLE PRECISION,
    "maxTemp" DOUBLE PRECISION,
    "gravity" DOUBLE PRECISION NOT NULL,
    "day" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "habitable" BOOLEAN NOT NULL DEFAULT false,
    "planetId" TEXT NOT NULL,
    "dwarfPlanetId" TEXT NOT NULL,

    CONSTRAINT "Satellite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asteroid" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" DOUBLE PRECISION NOT NULL,
    "mass" DOUBLE PRECISION NOT NULL,
    "diameter" DOUBLE PRECISION NOT NULL,
    "density" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "year" DOUBLE PRECISION NOT NULL,
    "perigee" DOUBLE PRECISION NOT NULL,
    "apogee" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "starId" TEXT NOT NULL,

    CONSTRAINT "Asteroid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meteorite" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" DOUBLE PRECISION NOT NULL,
    "foundYear" INTEGER NOT NULL,
    "mass" DOUBLE PRECISION NOT NULL,
    "diameter" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "planetId" TEXT NOT NULL,

    CONSTRAINT "Meteorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mass" DOUBLE PRECISION NOT NULL,
    "diameter" DOUBLE PRECISION NOT NULL,
    "density" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "year" DOUBLE PRECISION NOT NULL,
    "perigee" DOUBLE PRECISION NOT NULL,
    "apogee" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "starId" TEXT NOT NULL,

    CONSTRAINT "Comet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeteorShower" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "previousYear" INTEGER NOT NULL,
    "nextYear" INTEGER NOT NULL,
    "initialDate" TIMESTAMP(3) NOT NULL,
    "finalDate" TIMESTAMP(3) NOT NULL,
    "frequency" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "meteorVelocity" DOUBLE PRECISION,
    "meteorsPerHour" INTEGER,
    "peakDate" TIMESTAMP(3),
    "cometId" TEXT,
    "asteroidId" TEXT,
    "constellationId" TEXT,

    CONSTRAINT "MeteorShower_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Star" ADD CONSTRAINT "Star_constellationId_fkey" FOREIGN KEY ("constellationId") REFERENCES "Constellation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Planet" ADD CONSTRAINT "Planet_starId_fkey" FOREIGN KEY ("starId") REFERENCES "Star"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DwarfPlanet" ADD CONSTRAINT "DwarfPlanet_starId_fkey" FOREIGN KEY ("starId") REFERENCES "Star"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Satellite" ADD CONSTRAINT "Satellite_planetId_fkey" FOREIGN KEY ("planetId") REFERENCES "Planet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Satellite" ADD CONSTRAINT "Satellite_dwarfPlanetId_fkey" FOREIGN KEY ("dwarfPlanetId") REFERENCES "DwarfPlanet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asteroid" ADD CONSTRAINT "Asteroid_starId_fkey" FOREIGN KEY ("starId") REFERENCES "Star"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meteorite" ADD CONSTRAINT "Meteorite_planetId_fkey" FOREIGN KEY ("planetId") REFERENCES "Planet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comet" ADD CONSTRAINT "Comet_starId_fkey" FOREIGN KEY ("starId") REFERENCES "Star"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeteorShower" ADD CONSTRAINT "MeteorShower_cometId_fkey" FOREIGN KEY ("cometId") REFERENCES "Comet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeteorShower" ADD CONSTRAINT "MeteorShower_asteroidId_fkey" FOREIGN KEY ("asteroidId") REFERENCES "Asteroid"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeteorShower" ADD CONSTRAINT "MeteorShower_constellationId_fkey" FOREIGN KEY ("constellationId") REFERENCES "Constellation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
