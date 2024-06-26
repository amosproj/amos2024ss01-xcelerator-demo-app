/*
  Warnings:

  - You are about to drop the column `Assetid` on the `Metrics` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[assetId]` on the table `Metrics` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `assetId` to the `Metrics` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Metrics" DROP CONSTRAINT "Metrics_Assetid_fkey";

-- DropIndex
DROP INDEX "Metrics_Assetid_key";

-- AlterTable
ALTER TABLE "Metrics" DROP COLUMN "Assetid",
ADD COLUMN     "assetId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Metrics_assetId_key" ON "Metrics"("assetId");

-- AddForeignKey
ALTER TABLE "Metrics" ADD CONSTRAINT "Metrics_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("assetId") ON DELETE RESTRICT ON UPDATE CASCADE;
