import { z } from "zod";

import { fail, ok, parseJson } from "@/lib/api";
import { createSessionToken, setSessionCookie, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  try {
    const body = parseJson(loginSchema, await request.json());
    const user = await prisma.user.findUnique({
      where: { email: body.email.toLowerCase() },
      include: { member: { include: { district: true } } },
    });

    if (!user || user.status !== "ACTIVE") {
      return fail("Invalid email or password.", 401);
    }

    const validPassword = await verifyPassword(body.password, user.passwordHash);

    if (!validPassword) {
      return fail("Invalid email or password.", 401);
    }

    const token = await createSessionToken(user.id);
    setSessionCookie(token);

    return ok({
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      member: user.member,
    });
  } catch (error) {
    return fail("Login failed.", 400, error);
  }
}
