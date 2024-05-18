-- CreateTable
CREATE TABLE "TimeSeriesItem" (
    "id" SERIAL NOT NULL,
    "entityId" TEXT NOT NULL,
    "propertySetName" TEXT NOT NULL,

    CONSTRAINT "TimeSeriesItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeSeriesDataItem" (
    "time" TIMESTAMP(3) NOT NULL,
    "data" JSONB,
    "timeSeriesItemId" INTEGER NOT NULL,

    CONSTRAINT "TimeSeriesDataItem_pkey" PRIMARY KEY ("time")
);

-- CreateIndex
CREATE UNIQUE INDEX "TimeSeriesItem_entityId_propertySetName_key" ON "TimeSeriesItem"("entityId", "propertySetName");

-- AddForeignKey
ALTER TABLE "TimeSeriesDataItem" ADD CONSTRAINT "TimeSeriesDataItem_timeSeriesItemId_fkey" FOREIGN KEY ("timeSeriesItemId") REFERENCES "TimeSeriesItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
