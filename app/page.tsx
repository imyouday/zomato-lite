"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HeroArt } from "@/components/hero-art";
import { RatingPill, ratingLabel } from "@/components/rating-pill";
import { Pin, ForkKnife, ChevronRight } from "@/components/icons";

type RestaurantData = {
  name: string;
  cuisine: string;
  area: string;
  averageRating: number | null;
  totalReviews: number;
};

export default function Home() {
  const [data, setData] = useState<RestaurantData | null>(null);

  useEffect(() => {
    fetch("/api/restaurants/1")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => json && setData(json as RestaurantData))
      .catch(() => {});
  }, []);

  return (
    <main className="mx-auto w-full max-w-[560px] px-4 py-4 sm:px-6">
      <section className="mb-4 mt-2 flex items-center gap-2 text-sm text-[#4F4F4F]">
        <Pin className="h-4 w-4 text-[#E23744]" />
        <span>Sector 32, Ludhiana</span>
        <ChevronRight className="h-4 w-4 text-[#B8B8B8]" />
      </section>

      <h1 className="text-lg font-semibold text-[#1C1C1C]">
        {data ? "Here's the one worth eating at" : "One restaurant. Zero spam."}
      </h1>
      <p className="mb-4 mt-0.5 text-sm text-[#828282]">
        Write a review. See what people really think.
      </p>

      <Link
        href="/restaurant/1"
        className="block overflow-hidden rounded-2xl border border-[#EBEBEB] bg-white transition-shadow hover:shadow-md"
      >
        <div className="relative">
          <HeroArt className="h-44 w-full" />
          {data?.averageRating !== null && data?.averageRating !== undefined && (
            <div className="absolute right-3 top-3">
              <RatingPill value={data.averageRating} />
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold text-[#1C1C1C]">
              {data ? data.name : "Ludhiana Burrito"}
            </h2>
            <div className="text-right">
              {data?.averageRating !== null &&
                data?.averageRating !== undefined && (
                  <p className="text-sm font-medium text-[#24963F]">
                    {ratingLabel(data.averageRating)}
                  </p>
                )}
              <p className="text-xs text-[#828282]">
                {data ? (data.totalReviews === 1 ? "1 review" : `${data.totalReviews} reviews`) : "…"}
              </p>
            </div>
          </div>

          <p className="mt-1 flex items-center gap-1 text-sm text-[#4F4F4F]">
            <ForkKnife className="h-3.5 w-3.5 text-[#E23744]" />
            {data ? `${data.cuisine} · ${data.area}` : "Indian · Sector 32"}
          </p>
        </div>
      </Link>

      <Link
        href="/review/1"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#E23744] px-5 py-3 font-medium text-white transition-colors hover:bg-[#C02432]"
      >
        Write a review
      </Link>

      <p className="mt-6 text-center text-xs text-[#B8B8B8]">
        One restaurant · real reviews · no ads
      </p>
    </main>
  );
}