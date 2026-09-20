import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export const dynamic = "force-dynamic";

const formatter = new Intl.DateTimeFormat(undefined, {
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "2-digit",
});

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

  const { rows: restaurants } = await pool.query(
    "SELECT id, name, cuisine, area FROM restaurants WHERE id = $1",
    [id]
  );

  if (restaurants.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const restaurant = restaurants[0];

  const { rows } = await pool.query(
    `SELECT id, rating, comment, created_at,
            round(AVG(rating) OVER ()::numeric, 1)::float AS average_rating,
            COUNT(*) OVER ()::int AS total_reviews
     FROM reviews
     WHERE restaurant_id = $1
     ORDER BY created_at DESC, id DESC`,
    [id]
  );

  const averageRating = rows.length > 0 ? rows[0].average_rating : null;
  const totalReviews = rows.length > 0 ? rows[0].total_reviews : 0;

  const latestReview =
    rows.length > 0
      ? {
          id: rows[0].id,
          rating: rows[0].rating,
          comment: rows[0].comment,
          createdAt: formatter.format(new Date(rows[0].created_at)),
        }
      : null;

  const olderReviews = rows.slice(1).map((r) => ({
    id: r.id,
    rating: r.rating,
    comment: r.comment,
    createdAt: formatter.format(new Date(r.created_at)),
  }));

  return NextResponse.json({
    name: restaurant.name,
    cuisine: restaurant.cuisine,
    area: restaurant.area,
    averageRating,
    totalReviews,
    latestReview,
    reviews: olderReviews,
  });
}