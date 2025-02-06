/*
  Warnings:

  - You are about to drop the column `userAddressId` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userAddressId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "userAddressId";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "UserAddress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
