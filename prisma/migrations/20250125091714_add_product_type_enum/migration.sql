/*
  Warnings:

  - Added the required column `type` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('Digital', 'Physical');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "dimensions" TEXT,
ADD COLUMN     "type" "ProductType" NOT NULL,
ADD COLUMN     "weight" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "refreshToken" TEXT;
