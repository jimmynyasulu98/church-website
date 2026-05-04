import { prisma } from "@/lib/db";

export const defaultChurchSlug = "ccap-zomba";

export async function getChurchOrThrow(slug = defaultChurchSlug) {
  const church = await prisma.church.findUnique({ where: { slug } });

  if (!church) {
    throw new Error(`Church not found: ${slug}`);
  }

  return church;
}
