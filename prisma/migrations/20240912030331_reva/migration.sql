/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Departements` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Departements` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Departements" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Letter" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
