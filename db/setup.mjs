import { readFileSync } from "node:fs";
import { Pool } from "@neondatabase/serverless";

const env = readFileSync(".env.local", "utf8");
const match = env.match(/^DATABASE_URL\s*=\s*(.+)$/m);
if (!match) {
  console.error("DATABASE_URL not found in .env.local");
  process.exit(1);
}
const pool = new Pool({ connectionString: match[1].trim() });
const schema = readFileSync("db/schema.sql", "utf8");

try {
  await pool.query(schema);

  const {
    rows,
  } = await pool.query(
    "SELECT r.id, r.name, r.cuisine, r.area, COUNT(rev.id)::int AS review_count FROM restaurants r LEFT JOIN reviews rev ON rev.restaurant_id = r.id GROUP BY r.id ORDER BY r.id;"
  );

  console.log("\nseed applied. restaurants + review counts:");
  console.table(rows);

  const { rows: reviews } = await pool.query(
    "SELECT id, restaurant_id, rating, comment, created_at FROM reviews ORDER BY id;"
  );
  console.log("reviews:");
  console.table(reviews);
} catch (err) {
  console.error("db:setup failed:", err);
  process.exit(1);
} finally {
  await pool.end();
}