import { z } from "zod";

import { fail, ok, parseJson } from "@/lib/api";
import { defaultChurchSlug, getChurchOrThrow } from "@/lib/church";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const contactMessageSchema = z.object({
  churchSlug: z.string().default(defaultChurchSlug),
  name: z.string().min(2),
  phone: z.string().optional(),
  email: z.string().email(),
  subject: z.string().min(2),
  message: z.string().min(5),
});

export async function POST(request: Request) {
  try {
    const body = parseJson(contactMessageSchema, await request.json());
    const { churchSlug, ...data } = body;
    const church = await getChurchOrThrow(churchSlug);

    return ok(
      await prisma.contactMessage.create({
        data: {
          ...data,
          churchId: church.id,
        },
      }),
      { status: 201 },
    );
  } catch (error) {
    return fail("Contact message submission failed.", 400, error);
  }
}
