import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";

const prisma = new PrismaClient();

const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(1, "Name is required"),
});

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = UserSchema.parse(await request.json());

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    await prisma.user.update({
      where: { id: user.id },
      data: { accessToken: accessToken, refreshToken: refreshToken },
    });

    return NextResponse.json(
      {
        user: { id: user.id, email: user.email, name: user.name },
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
