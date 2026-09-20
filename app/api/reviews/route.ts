import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Expected a JSON body." },
      { status: 400 }
    );
  }

  const { restaurantId, rating, comment } = (body ?? {}) as Record<
    string,
    unknown
  >;

  if (
    !Number.isInteger(rating) ||
    (rating as number) < 1 ||
    (rating as number) > 5
  ) {
    return NextResponse.json(
      { error: "Rating must be a whole number from 1 to 5." },
      { status: 400 }
    );
  }

  if (typeof comment !== "string" || comment.trim().length === 0) {
    return NextResponse.json(
      { error: "Comment cannot be empty." },
      { status: 400 }
    );
  }

  if (
    !Number.isInteger(restaurantId) ||
    (restaurantId as number) < 1
  ) {
    return NextResponse.json(
      { error: "restaurantId must be a whole number." },
      { status: 400 }
    );
  }

  const restaurant = await query("SELECT id FROM restaurants WHERE id = $1", [
    restaurantId,
  ]);

  if (restaurant.rowCount === 0) {
    return NextResponse.json(
      { error: "That restaurant does not exist." },
      { status: 400 }
    );
  }

  const insert = await query(
    "INSERT INTO reviews (restaurant_id, rating, comment) VALUES ($1, $2, $3) RETURNING id",
    [restaurantId, rating, comment.trim()]
  );

  return NextResponse.json(
    { success: true, reviewId: insert.rows[0].id },
    { status: 201 }
  );
}