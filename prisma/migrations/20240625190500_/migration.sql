/*
  Warnings:

  - You are about to drop the column `dataMetrics` on the `Asset` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "dataMetrics",
ADD COLUMN     "metrics" JSONB;
