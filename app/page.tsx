import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[560px] flex-col px-6 py-10">
      <span className="text-xs font-medium uppercase tracking-widest text-[#E23744]">
        Zomato Lite
      </span>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#1C1C1C]">
        Ludhiana Burrito
      </h1>
      <p className="mt-2 text-[#828282]">Indian · Sector 32</p>

      <div className="mt-10 flex flex-col gap-2 sm:flex-row sm:gap-3">
        <Link
          href="/restaurant/1"
          className="rounded-full border border-[#EBEBEB] px-5 py-2.5 text-center text-sm font-medium text-[#4F4F4F] transition-colors hover:border-[#C02432] hover:bg-white"
        >
          See the restaurant
        </Link>
        <Link
          href="/review/1"
          className="rounded-full bg-[#E23744] px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-[#C02432]"
        >
          Write a review
        </Link>
      </div>
    </main>
  );
}