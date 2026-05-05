import { revokeCurrentSession } from "@/lib/auth";
import { ok } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    await revokeCurrentSession();
  } catch {
    // The cookie is cleared in revokeCurrentSession even if the backing store is unavailable.
  }

  return ok({ signedOut: true });
}
