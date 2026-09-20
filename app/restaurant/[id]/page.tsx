"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { RatingPill, ratingLabel } from "@/components/rating-pill";
import { Pin, ForkKnife, Share, StarFilled } from "@/components/icons";

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

const PASTELS = ["#FDECEE", "#FDEBF4", "#E9F8EE", "#FEF6E3", "#EAF3F5"];

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "1 day ago";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} w ago`;
  return `${Math.floor(days / 30)} mo ago`;
}

function Avatar({ index }: { index: number }) {
  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
      style={{ background: PASTELS[index % PASTELS.length] }}
    >
      <ForkKnife className="h-4 w-4 text-[#C02432]" />
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 py-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF1F2] text-[#E23744]">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm text-[#828282]">{label}</p>
        <p className="truncate font-medium text-[#1C1C1C]">{value}</p>
      </div>
    </div>
  );
}

export default function RestaurantPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<RestaurantData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);

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

  async function shareRestaurant() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: data?.name ?? "Restaurant",
          text: `Check out ${data?.name ?? "this place"} on Zomato Lite`,
          url,
        });
        return;
      }
    } catch {
      // user cancelled — fall through to copy
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  if (notFound) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-[560px] flex-col items-start px-6 py-10">
        <p className="text-lg text-[#4F4F4F]">That restaurant doesn&apos;t exist yet.</p>
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
    <main className="mx-auto flex min-h-screen w-full max-w-[560px] flex-col px-4 py-4 sm:px-6">
      <div className="relative">
        <div className="relative h-48 w-full overflow-hidden rounded-2xl">
          <Image
            src="/burrito.jpg"
            alt={`Burritos at ${data.name}`}
            fill
            priority
            sizes="(max-width: 640px) 100vw, 560px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>
        <button
          type="button"
          onClick={shareRestaurant}
          className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-sm font-medium text-[#1C1C1C] shadow-sm backdrop-blur transition-colors hover:bg-white"
        >
          <Share className="h-3.5 w-3.5" />
          {copied ? "Copied" : "Share"}
        </button>
      </div>

      <header className="mt-4">
        <h1 className="text-2xl font-semibold tracking-tight text-[#1C1C1C]">
          {data.name}
        </h1>
        <p className="mt-1 flex items-center gap-2 text-sm text-[#4F4F4F]">
          <ForkKnife className="h-3.5 w-3.5 text-[#E23744]" />
          {data.cuisine}
          <span className="text-[#B8B8B8]">·</span>
          <Pin className="h-3.5 w-3.5 text-[#E23744]" />
          {data.area}
        </p>
      </header>

      <section aria-label="Rating" className="mt-4 flex items-center gap-3 rounded-2xl border border-[#EBEBEB] bg-white p-4">
        <RatingPill value={data.averageRating} size="lg" />
        <div>
          <p className="text-lg font-semibold leading-tight text-[#1C1C1C]">
            {ratingLabel(data.averageRating)}
          </p>
          <p className="text-xs text-[#828282]">
            {data.totalReviews === 1 ? "1 review" : `${data.totalReviews} reviews`}
          </p>
        </div>
      </section>

      <section aria-label="Overview" className="mt-4 rounded-2xl border border-[#EBEBEB] bg-white px-4 py-2">
        <h2 className="pt-2 text-base font-semibold text-[#1C1C1C]">Overview</h2>
        <div className="mt-1 divide-y divide-[#EBEBEB]">
          <InfoRow
            icon={<ForkKnife className="h-5 w-5" />}
            label="Cuisine"
            value={data.cuisine}
          />
          <InfoRow
            icon={<Pin className="h-5 w-5" />}
            label="Area"
            value={data.area}
          />
          <InfoRow
            icon={<StarFilled className="h-5 w-5" />}
            label="Ratings"
            value={data.totalReviews === 1 ? "1 rating" : `${data.totalReviews} ratings`}
          />
        </div>
      </section>

      {data.latestReview && (
        <section
          aria-label="Latest review"
          className="mt-6 rounded-2xl border border-[#FFD6D9] bg-[#FFF1F2] p-4"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-[#1C1C1C]">Latest review</p>
            <span className="text-xs text-[#B8B8B8]">{timeAgo(data.latestReview.createdAt)}</span>
          </div>
          <RatingPill value={data.latestReview.rating} />
          <p className="mt-3 leading-relaxed text-[#4F4F4F]">
            “{data.latestReview.comment}”
          </p>
        </section>
      )}

      <div className="mt-8">
        <h2 className="text-base font-semibold text-[#1C1C1C]">
          What people think
        </h2>
        {data.totalReviews === 0 ? (
          <section className="mt-3 rounded-2xl border border-[#EBEBEB] bg-white p-8 text-center">
            <p className="text-[#4F4F4F]">No reviews yet.</p>
            <p className="mt-1 text-sm text-[#828282]">
              Be the first to tell the world about {data.name}.
            </p>
          </section>
        ) : (
          <ul className="mt-3 space-y-3">
            {data.reviews.map((r, i) => (
              <li
                key={r.id}
                className="rounded-2xl p-4"
                style={{ background: PASTELS[i % PASTELS.length] }}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <Avatar index={i} />
                    <div>
                      <p className="text-sm font-semibold text-[#1C1C1C]">Anonymous</p>
                      <p className="text-xs text-[#828282]">{timeAgo(r.createdAt)}</p>
                    </div>
                  </div>
                  <RatingPill value={r.rating} />
                </div>
                <p className="mt-3 leading-relaxed text-[#4F4F4F]">{r.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Link
        href={`/review/${id}`}
        className="mt-8 rounded-xl bg-[#E23744] px-5 py-3 text-center font-medium text-white transition-colors hover:bg-[#C02432]"
      >
        Write a review
      </Link>
    </main>
  );
}