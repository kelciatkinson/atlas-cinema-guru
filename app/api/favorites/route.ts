import { fetchFavorites, insertFavorite, deleteFavorite } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export const GET = auth(async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;
  const page = params.get("page") ? Number(params.get("page")) : 1;

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

  const favorites = await fetchFavorites(page, email);
  return NextResponse.json({ favorites });
});

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

    await insertFavorite(titleId, email);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error adding favorite:", error);
    return NextResponse.json(
      { error: "Failed to add favorite" },
      { status: 500 }
    );
  }
});

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

    await deleteFavorite(titleId, email);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing favorite:", error);
    return NextResponse.json(
      { error: "Failed to remove favorite" },
      { status: 500 }
    );
  }
});
