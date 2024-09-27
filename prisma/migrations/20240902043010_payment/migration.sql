/*
  Warnings:

  - You are about to drop the column `due date` on the `Website` table. All the data in the column will be lost.
  - Added the required column `payment_lastest` to the `Website` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Website" DROP COLUMN "due date",
ADD COLUMN     "payment_lastest" TIMESTAMP(3) NOT NULL;
