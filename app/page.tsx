"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RatingPill, ratingLabel } from "@/components/rating-pill";
import { Pin, ForkKnife, ChevronRight } from "@/components/icons";

type Restaurant = {
  id: number;
  name: string;
  cuisine: string;
  area: string;
  image: string;
  averageRating: number | null;
  totalReviews: number;
};

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[] | null>(null);

  useEffect(() => {
    fetch("/api/restaurants")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => json && setRestaurants(json.restaurants as Restaurant[]))
      .catch(() => {});
  }, []);

  return (
    <main className="mx-auto w-full max-w-[560px] px-4 py-4 sm:px-6">
      <section className="mb-4 mt-2 flex items-center gap-2 text-sm text-[#4F4F4F]">
        <Pin className="h-4 w-4 text-[#E23744]" />
        <span>Ludhiana, Punjab</span>
        <ChevronRight className="h-4 w-4 text-[#B8B8B8]" />
      </section>

      <h1 className="text-lg font-semibold text-[#1C1C1C]">
        {restaurants ? "Restaurants near you" : "Loading places…"}
      </h1>
      <p className="mb-4 mt-0.5 text-sm text-[#828282]">
        Write a review. See what people really think.
      </p>

      {!restaurants ? (
        <p className="text-sm text-[#B8B8B8]">Fetching restaurants…</p>
      ) : (
        <div className="space-y-4">
          {restaurants.map((r) => (
            <Link
              key={r.id}
              href={`/restaurant/${r.id}`}
              className="block overflow-hidden rounded-2xl border border-[#EBEBEB] bg-white transition-shadow hover:shadow-md"
            >
              <div className="relative">
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={r.image}
                    alt={`Food at ${r.name}`}
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, 560px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                </div>
                {r.averageRating !== null && r.averageRating !== undefined && (
                  <div className="absolute right-3 top-3">
                    <RatingPill value={r.averageRating} />
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg font-semibold text-[#1C1C1C]">
                    {r.name}
                  </h2>
                  <div className="text-right">
                    {r.averageRating !== null &&
                      r.averageRating !== undefined && (
                        <p className="text-sm font-medium text-[#24963F]">
                          {ratingLabel(r.averageRating)}
                        </p>
                      )}
                    <p className="text-xs text-[#828282]">
                      {r.totalReviews === 1
                        ? "1 review"
                        : `${r.totalReviews} reviews`}
                    </p>
                  </div>
                </div>

                <p className="mt-1 flex items-center gap-1 text-sm text-[#4F4F4F]">
                  <ForkKnife className="h-3.5 w-3.5 text-[#E23744]" />
                  {r.cuisine} · {r.area}
                </p>

                <div className="mt-3 flex items-center justify-end gap-2">
                  <span className="rounded-lg px-3 py-1.5 text-sm font-medium text-[#E23744] transition-colors hover:bg-[#FFF1F2]">
                    View restaurant
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <p className="mt-8 text-center text-xs text-[#B8B8B8]">
        Real places · real reviews · no ads
      </p>
    </main>
  );
}