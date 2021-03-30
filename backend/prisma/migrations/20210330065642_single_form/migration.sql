/*
  Warnings:

  - You are about to drop the `Form1` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Form2` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Form1";

-- DropTable
DROP TABLE "Form2";

-- CreateTable
CREATE TABLE "Form" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "handsomeRating" INTEGER NOT NULL DEFAULT 10,
    "hairDesc" TEXT NOT NULL DEFAULT E'Soooo nice!',
    "email" TEXT NOT NULL DEFAULT E'',

    PRIMARY KEY ("id")
);
