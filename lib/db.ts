import { Pool } from "@neondatabase/serverless";

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export type ReviewRow = {
  id: number;
  restaurant_id: number;
  rating: number;
  comment: string;
  created_at: string;
};