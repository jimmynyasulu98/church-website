import { z } from "zod";

import { fail, ok, parseJson } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";
import { defaultChurchSlug, getChurchOrThrow } from "@/lib/church";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const receiptSchema = z.object({
  churchSlug: z.string().default(defaultChurchSlug),
  fullName: z.string().min(2),
  phone: z.string().min(5),
  district: z.string().optional(),
  type: z.enum(["TITHE", "OFFERING", "PLEDGE", "THANKSGIVING", "OTHER"]),
  amount: z.coerce.number().positive(),
  receiptUrl: z.string().min(2),
});

export async function POST(request: Request) {
  try {
    const body = parseJson(receiptSchema, await request.json());
    const church = await getChurchOrThrow(body.churchSlug);
    const user = await getCurrentUser();

    return ok(
      await prisma.offeringReceipt.create({
        data: {
          churchId: church.id,
          userId: user?.id,
          fullName: body.fullName,
          phone: body.phone,
          district: body.district,
          type: body.type,
          amount: body.amount,
          receiptUrl: body.receiptUrl,
        },
      }),
      { status: 201 },
    );
  } catch (error) {
    return fail("Receipt submission failed.", 400, error);
  }
}
