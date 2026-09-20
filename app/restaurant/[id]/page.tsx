"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { RatingStars, formatRating } from "@/components/rating";

type Review = {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
};

type RestaurantData = {
  name: string;
  cuisine: string;
  area: string;
  averageRating: number | null;
  totalReviews: number;
  latestReview: Review | null;
  reviews: Review[];
};

export default function RestaurantPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<RestaurantData | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/restaurants/${id}`)
      .then((res) => {
        if (res.status === 404) {
          setNotFound(true);
          return null;
        }
        return res.json();
      })
      .then((json) => json && setData(json as RestaurantData))
      .catch(() => {});
  }, [id]);

  if (notFound) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-[560px] flex-col items-start px-6 py-10">
        <p className="text-lg text-stone-700">
          That restaurant doesn&apos;t exist yet.
        </p>
        <Link href="/" className="mt-6 text-sm text-amber-700 hover:underline">
          ← Back to home
        </Link>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-[560px] px-6 py-10">
        <p className="text-stone-500">Loading…</p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[560px] flex-col px-6 py-10">
      <Link
        href="/"
        className="text-sm text-stone-500 hover:text-stone-800 transition-colors self-start"
      >
        ← Zomato Lite
      </Link>

      <header className="mt-10">
        <div className="text-xs font-medium uppercase tracking-widest text-amber-700">
          {data.cuisine} · {data.area}
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
          {data.name}
        </h1>
      </header>

      <div className="mt-8 flex items-end gap-3">
        <span
          aria-label="Average rating"
          className="text-6xl font-semibold leading-none tracking-tight text-stone-900"
        >
          {formatRating(data.averageRating)}
        </span>
        <span className="pb-1 text-sm text-stone-500">
          {data.totalReviews === 1
            ? "1 review"
            : `${data.totalReviews} reviews`}
        </span>
      </div>

      {data.latestReview ? (
        <section
          aria-label="Latest review"
          className="mt-8 rounded-2xl border border-amber-300/70 bg-amber-50 p-6"
        >
          <div className="flex items-center justify-between gap-2">
            <RatingStars rating={data.latestReview.rating} size="md" />
            <span className="text-xs text-amber-800/70">
              {data.latestReview.createdAt}
            </span>
          </div>
          <p className="mt-3 leading-relaxed text-stone-800">
            “{data.latestReview.comment}”
          </p>
          <p className="mt-3 text-xs font-medium uppercase tracking-wide text-amber-700">
            Latest review
          </p>
        </section>
      ) : (
        <section className="mt-8 rounded-2xl border border-stone-200 bg-white p-8 text-center">
          <p className="text-stone-700">No reviews yet.</p>
          <p className="mt-1 text-sm text-stone-500">
            Be the first to tell the world about {data.name}.
          </p>
        </section>
      )}

      <div className="mt-10">
        <h2 className="text-sm font-medium text-stone-500">All reviews</h2>
        <ul className="mt-4 divide-y divide-stone-200 border-t border-stone-200">
          {data.reviews.map((r) => (
            <li key={r.id} className="py-4">
              <div className="flex items-center justify-between gap-2">
                <RatingStars rating={r.rating} />
                <span className="text-xs text-stone-400">{r.createdAt}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-stone-700">
                {r.comment}
              </p>
            </li>
          ))}
          {data.totalReviews === 0 && (
            <li className="py-4 text-sm text-stone-400">
              Nothing here yet.
            </li>
          )}
        </ul>
      </div>

      <Link
        href={`/review/${id}`}
        className="mt-10 rounded-xl bg-amber-600 px-5 py-3 text-center font-medium text-white transition-colors hover:bg-amber-700"
      >
        Write a review
      </Link>
    </main>
  );
}