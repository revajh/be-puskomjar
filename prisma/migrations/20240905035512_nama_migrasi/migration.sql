-- DropIndex
DROP INDEX "Letter_number_key";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Letter" ALTER COLUMN "number" DROP DEFAULT;
DROP SEQUENCE "letter_number_seq";
