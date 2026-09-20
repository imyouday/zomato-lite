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
        <p className="text-lg text-[#4F4F4F]">
          That restaurant doesn&apos;t exist yet.
        </p>
        <Link href="/" className="mt-6 text-sm text-[#E23744] hover:underline">
          ← Back to home
        </Link>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-[560px] px-6 py-10">
        <p className="text-[#828282]">Loading…</p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[560px] flex-col px-6 py-10">
      <Link
        href="/"
        className="self-start text-sm text-[#828282] transition-colors hover:text-[#1C1C1C]"
      >
        ← Zomato Lite
      </Link>

      <header className="mt-10">
        <div className="text-xs font-medium uppercase tracking-widest text-[#E23744]">
          {data.cuisine} · {data.area}
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#1C1C1C]">
          {data.name}
        </h1>
      </header>

      <div className="mt-8 flex items-end gap-3">
        <span
          aria-label="Average rating"
          className="text-6xl font-semibold leading-none tracking-tight text-[#1C1C1C]"
        >
          {formatRating(data.averageRating)}
        </span>
        <span className="pb-1 text-sm text-[#828282]">
          {data.totalReviews === 1
            ? "1 review"
            : `${data.totalReviews} reviews`}
        </span>
      </div>

      {data.latestReview ? (
        <section
          aria-label="Latest review"
          className="mt-8 rounded-2xl border border-[#FFD6D9] bg-[#FFF1F2] p-6"
        >
          <div className="flex items-center justify-between gap-2">
            <RatingStars rating={data.latestReview.rating} size="md" />
            <span className="text-xs text-[#C02432]/80">
              {data.latestReview.createdAt}
            </span>
          </div>
          <p className="mt-3 leading-relaxed text-[#4F4F4F]">
            “{data.latestReview.comment}”
          </p>
          <p className="mt-3 text-xs font-medium uppercase tracking-wide text-[#E23744]">
            Latest review
          </p>
        </section>
      ) : (
        <section className="mt-8 rounded-2xl border border-[#EBEBEB] bg-white p-8 text-center">
          <p className="text-[#4F4F4F]">No reviews yet.</p>
          <p className="mt-1 text-sm text-[#828282]">
            Be the first to tell the world about {data.name}.
          </p>
        </section>
      )}

      <div className="mt-10">
        <h2 className="text-sm font-medium text-[#828282]">All reviews</h2>
        <ul className="mt-4 divide-y divide-[#EBEBEB] border-t border-[#EBEBEB]">
          {data.reviews.map((r) => (
            <li key={r.id} className="py-4">
              <div className="flex items-center justify-between gap-2">
                <RatingStars rating={r.rating} />
                <span className="text-xs text-[#B8B8B8]">{r.createdAt}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#4F4F4F]">
                {r.comment}
              </p>
            </li>
          ))}
          {data.totalReviews === 0 && (
            <li className="py-4 text-sm text-[#B8B8B8]">
              Nothing here yet.
            </li>
          )}
        </ul>
      </div>

      <Link
        href={`/review/${id}`}
        className="mt-10 rounded-xl bg-[#E23744] px-5 py-3 text-center font-medium text-white transition-colors hover:bg-[#C02432]"
      >
        Write a review
      </Link>
    </main>
  );
}