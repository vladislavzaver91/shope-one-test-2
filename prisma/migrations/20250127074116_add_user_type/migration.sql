-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('Admin', 'User');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'User';
