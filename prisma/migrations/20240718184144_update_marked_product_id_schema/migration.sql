/*
  Warnings:

  - The primary key for the `MarkedProductId` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `MarkedProductId` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MarkedProductId" DROP CONSTRAINT "MarkedProductId_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "MarkedProductId_pkey" PRIMARY KEY ("productId", "userId");
