-- CreateEnum
CREATE TYPE "FacilityStatus" AS ENUM ('REGULAR', 'SUSPICIOUS', 'FAULTY');

-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "status" "FacilityStatus" NOT NULL DEFAULT 'REGULAR';
