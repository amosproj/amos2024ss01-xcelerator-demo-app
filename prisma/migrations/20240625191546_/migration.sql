/*
  Warnings:

  - You are about to drop the column `flowId` on the `Metrics` table. All the data in the column will be lost.
  - You are about to drop the column `motorCurrentId` on the `Metrics` table. All the data in the column will be lost.
  - You are about to drop the column `pressureInId` on the `Metrics` table. All the data in the column will be lost.
  - You are about to drop the column `pressureOutId` on the `Metrics` table. All the data in the column will be lost.
  - You are about to drop the column `stuffingBoxTemperatureId` on the `Metrics` table. All the data in the column will be lost.
  - You are about to drop the `MetricStats` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `coefficientOfVariation` to the `Metrics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max` to the `Metrics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mean` to the `Metrics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `min` to the `Metrics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Metrics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `standardDeviation` to the `Metrics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variance` to the `Metrics` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Metrics" DROP CONSTRAINT "Flow_fkey";

-- DropForeignKey
ALTER TABLE "Metrics" DROP CONSTRAINT "MotorCurrent_fkey";

-- DropForeignKey
ALTER TABLE "Metrics" DROP CONSTRAINT "PressureIn_fkey";

-- DropForeignKey
ALTER TABLE "Metrics" DROP CONSTRAINT "PressureOut_fkey";

-- DropForeignKey
ALTER TABLE "Metrics" DROP CONSTRAINT "StuffingBoxTemperature_fkey";

-- DropIndex
DROP INDEX "Metrics_flowId_key";

-- DropIndex
DROP INDEX "Metrics_motorCurrentId_key";

-- DropIndex
DROP INDEX "Metrics_pressureInId_key";

-- DropIndex
DROP INDEX "Metrics_pressureOutId_key";

-- DropIndex
DROP INDEX "Metrics_stuffingBoxTemperatureId_key";

-- AlterTable
ALTER TABLE "Metrics" DROP COLUMN "flowId",
DROP COLUMN "motorCurrentId",
DROP COLUMN "pressureInId",
DROP COLUMN "pressureOutId",
DROP COLUMN "stuffingBoxTemperatureId",
ADD COLUMN     "coefficientOfVariation" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "max" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "mean" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "min" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "standardDeviation" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "variance" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "MetricStats";
