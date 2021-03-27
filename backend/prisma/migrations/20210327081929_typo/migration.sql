/*
  Warnings:

  - You are about to drop the column `HairDesc` on the `Form2` table. All the data in the column will be lost.
  - Added the required column `hairDesc` to the `Form2` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Form2" DROP COLUMN "HairDesc",
ADD COLUMN     "hairDesc" TEXT NOT NULL;
