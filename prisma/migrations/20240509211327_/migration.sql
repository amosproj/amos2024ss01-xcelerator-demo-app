-- CreateTable
CREATE TABLE "Pump" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Pump_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Environment" (
    "id" SERIAL NOT NULL,
    "pressureQc" INTEGER NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "temperatureQc" INTEGER NOT NULL,
    "humidityQc" INTEGER NOT NULL,
    "humidity" INTEGER NOT NULL,
    "pressure" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "pumpId" INTEGER NOT NULL,

    CONSTRAINT "Environment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Data" (
    "id" SERIAL NOT NULL,
    "motorCurrent" INTEGER NOT NULL,
    "pressureOut" DOUBLE PRECISION NOT NULL,
    "stuffingBoxTemperature" INTEGER NOT NULL,
    "pressureIn" DOUBLE PRECISION NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "flow" DOUBLE PRECISION NOT NULL,
    "pumpId" INTEGER NOT NULL,

    CONSTRAINT "Data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pump_name_key" ON "Pump"("name");

-- AddForeignKey
ALTER TABLE "Environment" ADD CONSTRAINT "Environment_pumpId_fkey" FOREIGN KEY ("pumpId") REFERENCES "Pump"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_pumpId_fkey" FOREIGN KEY ("pumpId") REFERENCES "Pump"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
