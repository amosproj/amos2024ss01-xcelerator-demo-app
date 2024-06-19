/*
  Warnings:

  - Added the required column `assetAssetId` to the `Case` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Case" ADD COLUMN     "assetAssetId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_assetAssetId_fkey" FOREIGN KEY ("assetAssetId") REFERENCES "Asset"("assetId") ON DELETE RESTRICT ON UPDATE CASCADE;
