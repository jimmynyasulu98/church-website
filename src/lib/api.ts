import { NextResponse } from "next/server";
import { z } from "zod";

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ ok: true, data }, init);
}

export function fail(message: string, status = 400, details?: unknown) {
  return NextResponse.json(
    { ok: false, error: { message, details } },
    { status },
  );
}

export function parseJson<T extends z.ZodTypeAny>(
  schema: T,
  body: unknown,
): z.infer<T> {
  return schema.parse(body);
}
