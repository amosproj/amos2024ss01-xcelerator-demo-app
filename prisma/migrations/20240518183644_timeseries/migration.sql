-- CreateTable
CREATE TABLE "TimeSeriesItem" (
    "entityId" TEXT NOT NULL,
    "propertySetName" TEXT NOT NULL,

    CONSTRAINT "TimeSeriesItem_pkey" PRIMARY KEY ("entityId","propertySetName")
);

-- CreateTable
CREATE TABLE "TimeSeriesDataItem" (
    "time" TIMESTAMP(3) NOT NULL,
    "data" JSONB,
    "timeSeriesItementityId" TEXT NOT NULL,
    "timeSeriesItempropertySetName" TEXT NOT NULL,

    CONSTRAINT "TimeSeriesDataItem_pkey" PRIMARY KEY ("time")
);

-- CreateIndex
CREATE UNIQUE INDEX "TimeSeriesItem_entityId_propertySetName_key" ON "TimeSeriesItem"("entityId", "propertySetName");

-- AddForeignKey
ALTER TABLE "TimeSeriesDataItem" ADD CONSTRAINT "TimeSeriesDataItem_timeSeriesItementityId_timeSeriesItempr_fkey" FOREIGN KEY ("timeSeriesItementityId", "timeSeriesItempropertySetName") REFERENCES "TimeSeriesItem"("entityId", "propertySetName") ON DELETE RESTRICT ON UPDATE CASCADE;
