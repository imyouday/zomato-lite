import { Pool, neon } from "@neondatabase/serverless";

export type ReviewRow = {
  id: number;
  restaurant_id: number;
  rating: number;
  comment: string;
  created_at: string;
};

export type QueryResult = {
  rows: Record<string, unknown>[];
  rowCount: number;
};

let databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL is missing. Add it to .env.local locally and to Vercel project settings."
  );
}
const resolvedDatabaseUrl = databaseUrl;
if (!resolvedDatabaseUrl.includes("?sslmode=require")) {
  databaseUrl =
    resolvedDatabaseUrl +
    (resolvedDatabaseUrl.includes("?") ? "&sslmode=require" : "?sslmode=require");
}
const finalDatabaseUrl = databaseUrl;

const isServerless = process.env.VERCEL_ENV !== undefined;

export async function query(
  sqlText: string,
  params: unknown[] = []
): Promise<QueryResult> {
  if (isServerless) {
    // Neon HTTP driver: one stateless fetch per call. No connection survives a
    // run and gets frozen or leaked between Vercel function invocations.
    const sql = neon(finalDatabaseUrl, { fullResults: true });
    const result = await sql.query(sqlText, params);
    return { rows: result.rows, rowCount: result.rowCount };
  }

  const pool = new Pool({ connectionString: finalDatabaseUrl });
  try {
    const result = await pool.query(sqlText, params);
    return { rows: result.rows, rowCount: result.rowCount ?? 0 };
  } finally {
    await pool.end();
  }
}