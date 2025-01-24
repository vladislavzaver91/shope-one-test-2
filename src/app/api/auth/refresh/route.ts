import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { refreshToken } = await request.json();

    if (!refreshToken) {
      return NextResponse.json({ error: "Refresh token is required" }, { status: 400 });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { userId: string };

    // Find the user
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    if (!user || user.refreshToken !== refreshToken) {
      return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 });
    }

    // Generate new tokens
    const newAccessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "15m" });
    const newRefreshToken = jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });

    // Update the user with the new refresh token
    await prisma.user.update({
      where: { id: user.id },
      data: { accessToken: newAccessToken, refreshToken: newRefreshToken },
    });

    return NextResponse.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.error("Error refreshing token:", error);
    return NextResponse.json({ error: "Failed to refresh token" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
