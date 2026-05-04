import { z } from "zod";

import { fail, ok, parseJson } from "@/lib/api";
import { defaultChurchSlug, getChurchOrThrow } from "@/lib/church";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const verificationSchema = z.object({
  churchSlug: z.string().min(1).default(defaultChurchSlug),
  memberNumber: z.string().min(1),
  requestingChurch: z.string().optional(),
  requestRef: z.string().optional(),
});

export async function POST(request: Request) {
  const expectedSecret = process.env.VERIFY_API_SECRET;
  const providedSecret = request.headers.get("x-verify-secret");

  if (expectedSecret && providedSecret !== expectedSecret) {
    return fail("Invalid verification credentials.", 401);
  }

  try {
    const body = parseJson(verificationSchema, await request.json());
    const church = await getChurchOrThrow(body.churchSlug);
    const member = await prisma.memberProfile.findUnique({
      where: {
        churchId_memberNumber: {
          churchId: church.id,
          memberNumber: body.memberNumber,
        },
      },
      include: {
        user: true,
        district: true,
      },
    });

    if (!member) {
      return ok({ verified: false, memberNumber: body.memberNumber });
    }

    await prisma.memberVerification.create({
      data: {
        memberProfileId: member.id,
        requestingChurch: body.requestingChurch,
        requestRef: body.requestRef,
        result: "VERIFIED",
      },
    });

    return ok({
      verified: true,
      memberNumber: member.memberNumber,
      firstName: member.user.firstName,
      lastName: member.user.lastName,
      district: member.district?.name ?? null,
      joinedAt: member.joinedAt,
      transferType: member.transferType,
    });
  } catch (error) {
    return fail("Member verification failed.", 400, error);
  }
}
