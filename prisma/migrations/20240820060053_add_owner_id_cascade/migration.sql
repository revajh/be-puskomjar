-- DropForeignKey
ALTER TABLE "Website" DROP CONSTRAINT "Website_ownerId_fkey";

-- AddForeignKey
ALTER TABLE "Website" ADD CONSTRAINT "Website_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
