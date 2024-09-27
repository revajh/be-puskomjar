/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `Letter` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
CREATE SEQUENCE letter_number_seq;
ALTER TABLE "Letter" ALTER COLUMN "number" SET DEFAULT nextval('letter_number_seq');
ALTER SEQUENCE letter_number_seq OWNED BY "Letter"."number";

-- CreateIndex
CREATE UNIQUE INDEX "Letter_number_key" ON "Letter"("number");
