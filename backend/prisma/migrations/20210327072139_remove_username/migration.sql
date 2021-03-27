/*
  Warnings:

  - You are about to drop the column `userName` on the `Form1` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Form1.userName_unique";

-- AlterTable
ALTER TABLE "Form1" DROP COLUMN "userName";
