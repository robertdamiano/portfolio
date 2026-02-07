import "server-only";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function requireAdminToken(req: NextRequest): NextResponse | null {
  const token = process.env.ADMIN_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "ADMIN_TOKEN is not set" }, { status: 503 });
  }

  const provided = req.headers.get("x-admin-token");
  if (provided !== token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}

