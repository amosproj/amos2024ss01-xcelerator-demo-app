-- CreateEnum
CREATE TYPE "CaseStatus" AS ENUM ('OPEN', 'INPROGRESS', 'ONHOLD', 'DONE', 'OVERDUE', 'CANCELLED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "CasePriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'EMERGENCY');

-- CreateEnum
CREATE TYPE "CaseType" AS ENUM ('PLANNED', 'INCIDENT', 'ANNOTATION');

-- CreateTable
CREATE TABLE "TimeSeriesItem" (
    "propertySetName" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "Variables" JSONB,

    CONSTRAINT "TimeSeriesItem_pkey" PRIMARY KEY ("assetId","propertySetName")
);

-- CreateTable
CREATE TABLE "TimeSeriesDataItem" (
    "time" TIMESTAMP(3) NOT NULL,
    "data" JSONB,
    "name" TEXT,
    "location" JSONB,
    "timeSeriesItemAssetId" TEXT NOT NULL,
    "timeSeriesItemPropertySetName" TEXT NOT NULL,

    CONSTRAINT "TimeSeriesDataItem_pkey" PRIMARY KEY ("timeSeriesItemAssetId","timeSeriesItemPropertySetName","time")
);

-- CreateTable
CREATE TABLE "Asset" (
    "assetId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "typeId" TEXT NOT NULL,
    "Variables" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("assetId")
);

-- CreateTable
CREATE TABLE "AssetLocation" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "locality" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "Assetid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssetLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Case" (
    "id" SERIAL NOT NULL,
    "handle" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "type" "CaseType" NOT NULL DEFAULT 'PLANNED',
    "status" "CaseStatus" NOT NULL DEFAULT 'OPEN',
    "description" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "priority" "CasePriority" NOT NULL,
    "createdBy" TEXT NOT NULL,
    "eTag" TEXT NOT NULL,
    "modifiedBy" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TimeSeriesItem_assetId_propertySetName_key" ON "TimeSeriesItem"("assetId", "propertySetName");

-- CreateIndex
CREATE UNIQUE INDEX "AssetLocation_Assetid_key" ON "AssetLocation"("Assetid");

-- AddForeignKey
ALTER TABLE "TimeSeriesItem" ADD CONSTRAINT "TimeSeriesItem_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("assetId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeSeriesDataItem" ADD CONSTRAINT "TimeSeriesDataItem_timeSeriesItemAssetId_timeSeriesItemPro_fkey" FOREIGN KEY ("timeSeriesItemAssetId", "timeSeriesItemPropertySetName") REFERENCES "TimeSeriesItem"("assetId", "propertySetName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetLocation" ADD CONSTRAINT "AssetLocation_Assetid_fkey" FOREIGN KEY ("Assetid") REFERENCES "Asset"("assetId") ON DELETE RESTRICT ON UPDATE CASCADE;
