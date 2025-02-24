/*
  Warnings:

  - Added the required column `borderHeroBtn` to the `SiteSettings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SiteSettings" ADD COLUMN     "borderHeroBtn" TEXT NOT NULL;
