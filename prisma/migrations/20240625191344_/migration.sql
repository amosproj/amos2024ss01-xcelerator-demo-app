/*
  Warnings:

  - You are about to drop the column `metrics` on the `Asset` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Assetid]` on the table `Metrics` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Assetid` to the `Metrics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "metrics";

-- AlterTable
ALTER TABLE "Metrics" ADD COLUMN     "Assetid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Metrics_Assetid_key" ON "Metrics"("Assetid");

-- AddForeignKey
ALTER TABLE "Metrics" ADD CONSTRAINT "Metrics_Assetid_fkey" FOREIGN KEY ("Assetid") REFERENCES "Asset"("assetId") ON DELETE RESTRICT ON UPDATE CASCADE;
