import { revokeCurrentSession } from "@/lib/auth";
import { ok } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function POST() {
  await revokeCurrentSession();
  return ok({ signedOut: true });
}
