import { z } from "zod";

import { fail, ok, parseJson } from "@/lib/api";
import { defaultChurchSlug, getChurchOrThrow } from "@/lib/church";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const joinRequestSchema = z.object({
  churchSlug: z.string().default(defaultChurchSlug),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  gender: z.string().min(2),
  maritalStatus: z.string().min(2),
  primaryPhone: z.string().min(5),
  otherPhone: z.string().optional(),
  email: z.string().email().optional(),
  previousChurch: z.string().min(2),
  currentLocation: z.string().min(2),
  baptizedAt: z.string().optional(),
  currentWork: z.string().optional(),
  preferredService: z.string().min(2),
  transferType: z.enum(["PERMANENT", "TEMPORARY"]),
  transferLetterStatus: z.string().min(2),
  transferLetterUrl: z.string().optional(),
  familyMembers: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = parseJson(joinRequestSchema, await request.json());
    const { churchSlug, ...data } = body;
    const church = await getChurchOrThrow(churchSlug);

    return ok(
      await prisma.membershipRequest.create({
        data: {
          ...data,
          churchId: church.id,
        },
      }),
      { status: 201 },
    );
  } catch (error) {
    return fail("Join request submission failed.", 400, error);
  }
}
