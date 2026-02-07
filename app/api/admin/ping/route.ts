import { NextRequest, NextResponse } from "next/server";

import { requireAdminToken } from "@/lib/server/admin";

export async function GET(req: NextRequest) {
  const authError = requireAdminToken(req);
  if (authError) return authError;

  return NextResponse.json({ ok: true, now: new Date().toISOString() });
}

