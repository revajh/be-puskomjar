-- AlterTable
ALTER TABLE "Owner" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Website" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;
