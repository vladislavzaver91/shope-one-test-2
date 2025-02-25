/*
  Warnings:

  - You are about to drop the column `fontColor` on the `SiteSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SiteSettings" DROP COLUMN "fontColor",
ADD COLUMN     "arrowSliderColor" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "fontPrimeColor" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "fontSecondColor" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "titleColor" TEXT NOT NULL DEFAULT '';
