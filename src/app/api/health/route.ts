import { ok, fail } from "@/lib/api";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return ok({ status: "healthy" });
  } catch (error) {
    return fail("Database health check failed.", 503, String(error));
  }
}
