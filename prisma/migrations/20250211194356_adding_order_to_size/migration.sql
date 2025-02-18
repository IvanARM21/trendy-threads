/*
  Warnings:

  - Made the column `order` on table `Size` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Size" ALTER COLUMN "order" SET NOT NULL,
ALTER COLUMN "order" DROP DEFAULT;
