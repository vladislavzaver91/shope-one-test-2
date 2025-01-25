import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(request: NextRequest) {
  try {
    const { email, password } = UserSchema.parse(await request.json());

    // Проверка существования пользователя
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Генерация токенов
    const accessToken = jwt.sign(
      { userId: existingUser.id },
      process.env.JWT_SECRET!,
      {
        expiresIn: "15m",
      }
    );

    const refreshToken = jwt.sign(
      { userId: existingUser.id },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    // Обновление токенов в базе данных
    await prisma.user.update({
      where: { id: existingUser.id },
      data: { accessToken: accessToken, refreshToken: refreshToken },
    });

    // Успешный ответ
    return NextResponse.json(
      {
        user: {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
        },
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error logging in user:", error);
    return NextResponse.json(
      { error: "Failed to login user" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
