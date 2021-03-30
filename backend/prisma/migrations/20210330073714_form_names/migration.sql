/*
  Warnings:

  - You are about to drop the column `handsomeRating` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `hairDesc` on the `Form` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Form" DROP COLUMN "handsomeRating",
DROP COLUMN "hairDesc",
ADD COLUMN     "handsome" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "hair" TEXT NOT NULL DEFAULT E'Soooo nice!';
