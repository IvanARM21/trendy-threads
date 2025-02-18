-- AlterEnum
ALTER TYPE "Gender" ADD VALUE 'UNISEX';

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "paymentId" DROP DEFAULT;
