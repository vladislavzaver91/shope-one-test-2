-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL,
    "font" TEXT NOT NULL,
    "fontColor" TEXT NOT NULL,
    "accentColor" TEXT NOT NULL,
    "accentColorDark" TEXT NOT NULL,
    "borderProductCard" TEXT NOT NULL,
    "borderInfoCard" TEXT NOT NULL,
    "borderBtn" TEXT NOT NULL,
    "borderHeaderInput" TEXT NOT NULL,
    "borderInput" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);
