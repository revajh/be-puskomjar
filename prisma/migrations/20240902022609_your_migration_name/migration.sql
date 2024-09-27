/*
  Warnings:

  - You are about to drop the column `payment_lastest` on the `Website` table. All the data in the column will be lost.
  - You are about to drop the `Departement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Owner` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `due date` to the `Website` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Letter" DROP CONSTRAINT "Letter_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Website" DROP CONSTRAINT "Website_ownerId_fkey";

-- AlterTable
ALTER TABLE "Website" DROP COLUMN "payment_lastest",
ADD COLUMN     "due date" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Departement";

-- DropTable
DROP TABLE "Owner";

-- CreateTable
CREATE TABLE "Departements" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Departements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Website" ADD CONSTRAINT "Website_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Departements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Letter" ADD CONSTRAINT "Letter_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Departements"("id") ON DELETE CASCADE ON UPDATE CASCADE;
