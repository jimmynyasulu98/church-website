import { z } from "zod";

import { fail, ok, parseJson } from "@/lib/api";
import { canManageContent, getCurrentUser } from "@/lib/auth";
import { defaultChurchSlug, getChurchOrThrow } from "@/lib/church";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const contentTypes = ["events", "news", "sermons", "mlaga", "vacancies"] as const;

const baseQuerySchema = z.object({
  churchSlug: z.string().min(1).default(defaultChurchSlug),
});

const eventSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(2),
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime().optional(),
  venue: z.string().min(2),
  audience: z.string().optional(),
  contact: z.string().optional(),
  imageUrl: z.string().url().optional(),
});

const newsSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  excerpt: z.string().min(2),
  body: z.string().min(2),
  imageUrl: z.string().url().optional(),
  publishedAt: z.string().datetime().optional(),
});

const sermonSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  passage: z.string().min(2),
  preacher: z.string().min(2),
  series: z.string().optional(),
  videoUrl: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
  preachedAt: z.string().datetime(),
});

const mlagaSchema = z.object({
  districtId: z.string().optional(),
  host: z.string().min(2),
  preacher: z.string().min(2),
  venue: z.string().min(2),
  startsAt: z.string().datetime(),
  notes: z.string().optional(),
});

const vacancySchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  type: z.string().min(2),
  department: z.string().min(2),
  summary: z.string().min(2),
  requirements: z.array(z.string().min(2)).default([]),
  closingAt: z.string().datetime().optional(),
});

function isContentType(type: string): type is (typeof contentTypes)[number] {
  return contentTypes.includes(type as (typeof contentTypes)[number]);
}

export async function GET(
  request: Request,
  { params }: { params: { type: string } },
) {
  if (!isContentType(params.type)) {
    return fail("Unsupported content type.", 404);
  }

  const searchParams = Object.fromEntries(new URL(request.url).searchParams);
  const query = baseQuerySchema.parse(searchParams);
  const church = await getChurchOrThrow(query.churchSlug);

  switch (params.type) {
    case "events":
      return ok(
        await prisma.event.findMany({
          where: { churchId: church.id, status: "PUBLISHED" },
          orderBy: { startsAt: "asc" },
        }),
      );
    case "news":
      return ok(
        await prisma.newsArticle.findMany({
          where: { churchId: church.id, status: "PUBLISHED" },
          orderBy: { publishedAt: "desc" },
        }),
      );
    case "sermons":
      return ok(
        await prisma.sermon.findMany({
          where: { churchId: church.id, status: "PUBLISHED" },
          orderBy: { preachedAt: "desc" },
        }),
      );
    case "mlaga":
      return ok(
        await prisma.mlagaSchedule.findMany({
          where: { churchId: church.id },
          include: { district: true },
          orderBy: { startsAt: "asc" },
        }),
      );
    case "vacancies":
      return ok(
        await prisma.vacancy.findMany({
          where: { churchId: church.id, status: "PUBLISHED" },
          orderBy: { closingAt: "asc" },
        }),
      );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { type: string } },
) {
  if (!isContentType(params.type)) {
    return fail("Unsupported content type.", 404);
  }

  const user = await getCurrentUser();

  if (!user || !canManageContent(user.role)) {
    return fail("Staff access required.", 403);
  }

  const rawBody = await request.json();
  const church = await getChurchOrThrow(rawBody.churchSlug ?? defaultChurchSlug);

  if (user.churchId !== church.id) {
    return fail("You cannot manage content for this church.", 403);
  }

  switch (params.type) {
    case "events": {
      const body = parseJson(eventSchema, rawBody);
      return ok(
        await prisma.event.create({
          data: {
            ...body,
            churchId: church.id,
            startsAt: new Date(body.startsAt),
            endsAt: body.endsAt ? new Date(body.endsAt) : undefined,
            createdById: user.id,
          },
        }),
        { status: 201 },
      );
    }
    case "news": {
      const body = parseJson(newsSchema, rawBody);
      return ok(
        await prisma.newsArticle.create({
          data: {
            ...body,
            churchId: church.id,
            publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
            authorId: user.id,
          },
        }),
        { status: 201 },
      );
    }
    case "sermons": {
      const body = parseJson(sermonSchema, rawBody);
      return ok(
        await prisma.sermon.create({
          data: {
            ...body,
            churchId: church.id,
            preachedAt: new Date(body.preachedAt),
            createdById: user.id,
          },
        }),
        { status: 201 },
      );
    }
    case "mlaga": {
      const body = parseJson(mlagaSchema, rawBody);
      return ok(
        await prisma.mlagaSchedule.create({
          data: {
            ...body,
            churchId: church.id,
            startsAt: new Date(body.startsAt),
          },
        }),
        { status: 201 },
      );
    }
    case "vacancies": {
      const body = parseJson(vacancySchema, rawBody);
      return ok(
        await prisma.vacancy.create({
          data: {
            ...body,
            churchId: church.id,
            closingAt: body.closingAt ? new Date(body.closingAt) : undefined,
            createdById: user.id,
          },
        }),
        { status: 201 },
      );
    }
  }
}
