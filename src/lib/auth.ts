import bcrypt from "bcryptjs";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

import { prisma } from "@/lib/db";

const cookieName = "ccap_session";

function jwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured.");
  }

  return new TextEncoder().encode(secret);
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createSessionToken(userId: string) {
  return new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(jwtSecret());
}

export async function getCurrentUser() {
  const token = cookies().get(cookieName)?.value;

  if (!token) {
    return null;
  }

  try {
    const verified = await jwtVerify(token, jwtSecret());
    const userId = verified.payload.sub;

    if (!userId) {
      return null;
    }

    return prisma.user.findUnique({
      where: { id: userId },
      include: { member: { include: { district: true } }, permissions: true },
    });
  } catch {
    return null;
  }
}

export function setSessionCookie(token: string) {
  cookies().set(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearSessionCookie() {
  cookies().delete(cookieName);
}

export function canManageContent(role: string) {
  return role === "ADMIN" || role === "STAFF";
}
