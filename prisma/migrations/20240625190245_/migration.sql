/*
  Warnings:

  - You are about to drop the column `Assetid` on the `Metrics` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Metrics" DROP CONSTRAINT "Metrics_Assetid_fkey";

-- DropIndex
DROP INDEX "Metrics_Assetid_key";

-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "dataMetrics" JSONB;

-- AlterTable
ALTER TABLE "Metrics" DROP COLUMN "Assetid";
