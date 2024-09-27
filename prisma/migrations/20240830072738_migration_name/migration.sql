-- CreateTable
CREATE TABLE "Letter" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "date_of_letter" TIMESTAMP(3) NOT NULL,
    "link" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Letter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departement" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Departement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Letter" ADD CONSTRAINT "Letter_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
