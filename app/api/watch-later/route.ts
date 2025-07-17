import {
  fetchWatchLaters,
  insertWatchLater,
  deleteWatchLater,
} from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

/**
 * GET /api/watch-later
 */
export const GET = auth(async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;
  const page = params.get("page") ? Number(params.get("page")) : 1;
  const minYear = params.get("minYear") ? Number(params.get("minYear")) : 0;
  const maxYear = params.get("maxYear")
    ? Number(params.get("maxYear"))
    : new Date().getFullYear();
  const query = params.get("query") ?? "";

  //@ts-ignore
  if (!req.auth) {
    return NextResponse.json(
      { error: "Unauthorized - Not logged in" },
      { status: 401 }
    );
  }

  const {
    user: { email }, //@ts-ignore
  } = req.auth;

  const watchLater = await fetchWatchLaters(page, email);

  return NextResponse.json({ watchLater });
});

/**
 * POST /api/watch-later - Add to watch later
 */
export const POST = auth(async (req: NextRequest) => {
  try {
    //@ts-ignore
    if (!req.auth) {
      return NextResponse.json(
        { error: "Unauthorized - Not logged in" },
        { status: 401 }
      );
    }

    const {
      user: { email },
    } = req.auth; //@ts-ignore
    const { titleId } = await req.json();

    if (!titleId) {
      return NextResponse.json(
        { error: "Title ID is required" },
        { status: 400 }
      );
    }

    await insertWatchLater(titleId, email);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error adding to watch later:", error);
    return NextResponse.json(
      { error: "Failed to add to watch later" },
      { status: 500 }
    );
  }
});

/**
 * DELETE /api/watch-later - Remove from watch later
 */
export const DELETE = auth(async (req: NextRequest) => {
  try {
    //@ts-ignore
    if (!req.auth) {
      return NextResponse.json(
        { error: "Unauthorized - Not logged in" },
        { status: 401 }
      );
    }

    const {
      user: { email },
    } = req.auth; //@ts-ignore
    const { titleId } = await req.json();

    if (!titleId) {
      return NextResponse.json(
        { error: "Title ID is required" },
        { status: 400 }
      );
    }

    await deleteWatchLater(titleId, email);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing from watch later:", error);
    return NextResponse.json(
      { error: "Failed to remove from watch later" },
      { status: 500 }
    );
  }
});
