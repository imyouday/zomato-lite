"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { StarPicker } from "@/components/star-picker";
import { Pin, ForkKnife, ChevronRight } from "@/components/icons";

type RestaurantMeta = {
  name: string;
  cuisine: string;
  area: string;
};

export default function ReviewPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const router = useRouter();

  const [meta, setMeta] = useState<RestaurantMeta | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/restaurants/${restaurantId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setMeta({
            name: data.name,
            cuisine: data.cuisine,
            area: data.area,
          });
        }
      })
      .catch(() => {});
  }, [restaurantId]);

  const canSubmit = rating !== null && comment.trim().length > 0 && !submitting;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurantId: Number(restaurantId),
          rating,
          comment,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }

      router.push(`/restaurant/${restaurantId}`);
    } catch {
      setError("Could not reach the server. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[560px] flex-col px-4 py-4 sm:px-6">
      <nav className="flex items-center gap-1 text-sm text-[#828282]">
        <Link href="/" className="transition-colors hover:text-[#1C1C1C]">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-[#B8B8B8]" />
        <Link
          href={`/restaurant/${restaurantId}`}
          className="transition-colors hover:text-[#1C1C1C]"
        >
          Restaurant
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-[#B8B8B8]" />
        <span className="truncate text-[#1C1C1C]">Write review</span>
      </nav>

      <div className="mb-8">
        <p className="text-sm text-[#828282]">Reviewing</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#1C1C1C]">
          {meta ? meta.name : "Loading…"}
        </h1>
        {meta && (
          <p className="mt-1 flex items-center gap-2 text-sm text-[#4F4F4F]">
            <ForkKnife className="h-3.5 w-3.5 text-[#E23744]" />
            {meta.cuisine}
            <span className="text-[#B8B8B8]">·</span>
            <Pin className="h-3.5 w-3.5 text-[#E23744]" />
            {meta.area}
          </p>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 rounded-2xl border border-[#EBEBEB] bg-white p-6"
      >
        <div>
          <label className="text-sm font-medium text-[#4F4F4F]">
            Your rating
          </label>
          <div className="mt-2">
            <StarPicker value={rating} onChange={setRating} />
          </div>
        </div>

        <div>
          <label htmlFor="comment" className="text-sm font-medium text-[#4F4F4F]">
            Your review
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            maxLength={500}
            placeholder="How was the food?"
            className="mt-2 w-full resize-none rounded-xl border border-[#EBEBEB] bg-[#FAFAFA] px-3 py-2.5 text-[#1C1C1C] placeholder:text-[#B8B8B8] focus:border-[#E23744] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E23744]/30"
          />
        </div>

        {error && (
          <p className="rounded-xl bg-[#FDECEC] px-4 py-3 text-sm text-[#C02432]">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className="rounded-xl bg-[#E23744] px-5 py-3 font-medium text-white transition-colors hover:bg-[#C02432] disabled:cursor-not-allowed disabled:bg-[#EBEBEB] disabled:text-[#B8B8B8]"
        >
          {submitting ? "Submitting…" : "Submit review"}
        </button>
      </form>
    </main>
  );
}