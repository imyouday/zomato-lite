import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json(
      { error: "Restaurant id must be a whole number." },
      { status: 400 }
    );
  }

  const restaurant = await query(
    "SELECT id, name, cuisine, area, image FROM restaurants WHERE id = $1",
    [id]
  );

  if (restaurant.rowCount === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const reviews = await query(
    `SELECT id, rating, comment, created_at,
            round(AVG(rating) OVER ()::numeric, 1)::float AS average_rating,
            COUNT(*) OVER ()::int AS total_reviews
     FROM reviews
     WHERE restaurant_id = $1
     ORDER BY created_at DESC, id DESC`,
    [id]
  );

  const rows = reviews.rows;
  const averageRating = rows.length > 0 ? rows[0].average_rating : null;
  const totalReviews = rows.length > 0 ? rows[0].total_reviews : 0;

  const latestReview =
    rows.length > 0
      ? {
          id: rows[0].id,
          rating: rows[0].rating,
          comment: rows[0].comment,
          createdAt: new Date(rows[0].created_at as string).toISOString(),
        }
      : null;

  const olderReviews = rows.slice(1).map((r) => ({
    id: r.id,
    rating: r.rating,
    comment: r.comment,
    createdAt: new Date(r.created_at as string).toISOString(),
  }));

  return NextResponse.json({
    name: restaurant.rows[0].name,
    cuisine: restaurant.rows[0].cuisine,
    area: restaurant.rows[0].area,
    image: restaurant.rows[0].image,
    averageRating,
    totalReviews,
    latestReview,
    reviews: olderReviews,
  });
}