-- CreateTable
CREATE TABLE "TimeSeriesItem" (
    "entityId" TEXT NOT NULL,
    "propertySetName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TimeSeriesDataItem" (
    "time" TIMESTAMP(3) NOT NULL,
    "data" JSONB,
    "timeSeriesEntityId" TEXT NOT NULL,
    "timeSeriesPropertySetName" TEXT NOT NULL,

    CONSTRAINT "TimeSeriesDataItem_pkey" PRIMARY KEY ("time")
);

-- CreateIndex
CREATE UNIQUE INDEX "TimeSeriesItem_entityId_propertySetName_key" ON "TimeSeriesItem"("entityId", "propertySetName");

-- AddForeignKey
ALTER TABLE "TimeSeriesDataItem" ADD CONSTRAINT "TimeSeriesDataItem_timeSeriesEntityId_timeSeriesPropertySe_fkey" FOREIGN KEY ("timeSeriesEntityId", "timeSeriesPropertySetName") REFERENCES "TimeSeriesItem"("entityId", "propertySetName") ON DELETE RESTRICT ON UPDATE CASCADE;
