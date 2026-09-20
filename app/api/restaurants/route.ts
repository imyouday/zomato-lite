import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const result = await query(
    `SELECT r.id, r.name, r.cuisine, r.area, r.image,
            round(AVG(rev.rating)::numeric, 1)::float AS average_rating,
            COUNT(rev.id)::int AS total_reviews
     FROM restaurants r
     LEFT JOIN reviews rev ON rev.restaurant_id = r.id
     GROUP BY r.id
     ORDER BY r.id`
  );

  return NextResponse.json(
    {
      restaurants: result.rows.map((r) => ({
        id: r.id,
        name: r.name,
        cuisine: r.cuisine,
        area: r.area,
        image: r.image,
        averageRating: r.average_rating as number | null,
        totalReviews: r.total_reviews as number,
      })),
    },
    { status: 200 }
  );
}