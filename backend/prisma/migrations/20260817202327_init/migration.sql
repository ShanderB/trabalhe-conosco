-- CreateTable
CREATE TABLE "producers" (
    "id" TEXT NOT NULL,
    "document" VARCHAR(14) NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "producers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "farms" (
    "id" TEXT NOT NULL,
    "producerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" VARCHAR(2) NOT NULL,
    "totalArea" DECIMAL(14,2) NOT NULL,
    "agricultableArea" DECIMAL(14,2) NOT NULL,
    "vegetationArea" DECIMAL(14,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "farms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "harvests" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "harvests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "planted_crops" (
    "id" TEXT NOT NULL,
    "farmId" TEXT NOT NULL,
    "harvestId" TEXT NOT NULL,
    "cropName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "planted_crops_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "producers_document_key" ON "producers"("document");

-- CreateIndex
CREATE INDEX "farms_producerId_idx" ON "farms"("producerId");

-- CreateIndex
CREATE INDEX "farms_state_idx" ON "farms"("state");

-- CreateIndex
CREATE UNIQUE INDEX "harvests_year_key" ON "harvests"("year");

-- CreateIndex
CREATE INDEX "planted_crops_farmId_idx" ON "planted_crops"("farmId");

-- CreateIndex
CREATE INDEX "planted_crops_harvestId_idx" ON "planted_crops"("harvestId");

-- CreateIndex
CREATE INDEX "planted_crops_cropName_idx" ON "planted_crops"("cropName");

-- AddForeignKey
ALTER TABLE "farms" ADD CONSTRAINT "farms_producerId_fkey" FOREIGN KEY ("producerId") REFERENCES "producers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planted_crops" ADD CONSTRAINT "planted_crops_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planted_crops" ADD CONSTRAINT "planted_crops_harvestId_fkey" FOREIGN KEY ("harvestId") REFERENCES "harvests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
