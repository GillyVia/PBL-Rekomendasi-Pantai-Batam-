"use client";

import { useMemo, useState } from "react";
import {
  Heart,
  Star,
  MapPin,
  Clock,
  ArrowRight,
  Waves,
  TrendingUp,
  Bookmark,
  Sparkles,
  ChevronRight,
  BadgeCheck,
  Navigation,
} from "lucide-react";
import {
  BEACHES_BY_DISTRICT,
  KECAMATAN_LIST,
  ALL_BEACHES,
  getTrendingBeaches,
} from "@/data/beaches";
import type { BeachData } from "@/types/beach";
import { BeachDetail } from "@/components/ui/BeachDetail";

const FILTERS = [
  { id: "semua", label: "Semua", emoji: "🌊" },
  { id: "trending", label: "Trending", emoji: "🔥" },
  { id: "gratis", label: "Gratis", emoji: "💚" },
  ...KECAMATAN_LIST.map((kecamatan) => ({
    id: kecamatan,
    label: kecamatan,
    emoji: "📍",
  })),
];

function getBadgeClass(color: string): string {
  const colorMap: Record<string, string> = {
    "#F59E0B": "bg-amber-500/95",
    "#10B981": "bg-emerald-500/95",
    "#3B82F6": "bg-blue-500/95",
    "#F97316": "bg-orange-500/95",
    "#06B6D4": "bg-cyan-500/95",
    "#8B5CF6": "bg-purple-500/95",
    "#EC4899": "bg-pink-500/95",
    "#F43F5E": "bg-rose-500/95",
  };

  return colorMap[color] ?? "bg-blue-500/95";
}

function StarRating({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "xs";
}) {
  const cls = size === "xs" ? "h-2.5 w-2.5" : "h-3 w-3";

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${cls} ${
            star <= Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-slate-200 text-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

function PriceBadge({
  price,
  isFree,
}: {
  price: string;
  isFree: boolean;
}) {
  return (
    <span
      className={`rounded-xl border px-2.5 py-1 text-[11px] font-bold ${
        isFree
          ? "border-emerald-100 bg-emerald-50 text-emerald-700"
          : "border-blue-100 bg-blue-50 text-blue-700"
      }`}
    >
      {price}
    </span>
  );
}

function BeachCard({
  beach,
  index,
  onClick,
}: {
  beach: BeachData;
  index: number;
  onClick: () => void;
}) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div
      className="group flex cursor-pointer flex-col overflow-hidden rounded-[24px] border border-slate-100 bg-white shadow-md shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-900/10"
      style={{ animationDelay: `${index * 80}ms` }}
      onClick={onClick}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
        <img
          src={beach.image}
          alt={beach.name}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-900/15 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-amber-900/25 to-transparent" />

        <div className="absolute left-3 top-3">
          <span
            className={`inline-flex items-center gap-1 rounded-xl px-2.5 py-1 text-[10px] font-black text-white shadow-md backdrop-blur-sm ${getBadgeClass(
              beach.badgeColor,
            )}`}
          >
            {beach.badge}
          </span>
        </div>

        <div className="absolute right-3 top-3 flex gap-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setSaved((prev) => !prev);
            }}
            className={`flex h-8 w-8 items-center justify-center rounded-xl shadow-lg backdrop-blur-md transition-all duration-200 active:scale-90 ${
              saved
                ? "bg-blue-500 text-white"
                : "bg-white/85 text-slate-600 hover:bg-white"
            }`}
            aria-label="Simpan pantai"
          >
            <Bookmark className={`h-3.5 w-3.5 ${saved ? "fill-white" : ""}`} />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setLiked((prev) => !prev);
            }}
            className={`flex h-8 w-8 items-center justify-center rounded-xl shadow-lg backdrop-blur-md transition-all duration-200 active:scale-90 ${
              liked
                ? "bg-rose-500 text-white"
                : "bg-white/85 text-slate-600 hover:bg-white"
            }`}
            aria-label="Sukai pantai"
          >
            <Heart className={`h-3.5 w-3.5 ${liked ? "fill-white" : ""}`} />
          </button>
        </div>

        {beach.trending && (
          <div className="absolute right-3 top-3 transition-opacity group-hover:opacity-0">
            <span className="flex items-center gap-1 rounded-xl bg-white/95 px-2 py-1 text-[10px] font-bold text-rose-600 shadow-md backdrop-blur-sm">
              <TrendingUp className="h-2.5 w-2.5" />
              Trending
            </span>
          </div>
        )}

        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div className="flex items-center gap-1 rounded-lg bg-black/35 px-2 py-1 backdrop-blur-sm">
            <MapPin className="h-3 w-3 text-white/75" />
            <span className="text-[10px] font-semibold text-white">
              {beach.kecamatan}
            </span>
          </div>

          <div className="flex items-center gap-1 rounded-lg bg-black/35 px-2 py-1 backdrop-blur-sm">
            <Navigation className="h-3 w-3 text-white/75" />
            <span className="text-[10px] font-semibold text-white">
              {beach.jarakDariKota} km
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <StarRating rating={beach.rating} size="xs" />
            <span className="text-sm font-black text-slate-800">
              {beach.rating}
            </span>
            <span className="text-[11px] text-slate-400">
              ({beach.reviews.toLocaleString("id-ID")})
            </span>
          </div>

          <PriceBadge
            price={beach.tiketMasuk}
            isFree={beach.tiketMasukRp === 0}
          />
        </div>

        <h3 className="mb-1.5 text-[17px] font-black leading-snug text-slate-900 transition-colors duration-200 group-hover:text-blue-700">
          {beach.name}
        </h3>

        <div className="mb-3 flex items-center gap-1 text-xs text-slate-400">
          <MapPin className="h-3 w-3 flex-shrink-0 text-blue-400" />
          <span>
            {beach.kelurahan}, {beach.kecamatan}
          </span>
        </div>

        <p className="mb-3.5 line-clamp-2 flex-1 text-xs leading-relaxed text-slate-500">
          {beach.deskripsiSingkat}
        </p>

        <div className="mb-3.5 flex w-fit items-center gap-1.5 rounded-xl border border-amber-100 bg-amber-50 px-2.5 py-1.5">
          <BadgeCheck className="h-3 w-3 flex-shrink-0 text-amber-500" />
          <span className="text-[10px] font-bold text-amber-700">
            {beach.highlight}
          </span>
        </div>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {beach.aktivitas.slice(0, 3).map((aktivitas) => (
            <span
              key={aktivitas}
              className="rounded-xl border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700"
            >
              {aktivitas}
            </span>
          ))}

          {beach.aktivitas.length > 3 && (
            <span className="rounded-xl border border-slate-100 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
              +{beach.aktivitas.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-slate-100/80 pt-3.5">
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <Clock className="h-3 w-3 text-slate-300" />
            <span>{beach.jamBuka}</span>
          </div>

          <button
            type="button"
            className="group/btn flex items-center gap-1.5 rounded-xl border border-blue-100 bg-blue-50 px-3.5 py-2 text-xs font-bold text-blue-700 shadow-sm transition-all duration-200 hover:border-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-md hover:shadow-blue-300/40 active:scale-95"
          >
            Lihat Detail
            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function FeaturedBeachesNew() {
  const [activeFilter, setActiveFilter] = useState("semua");
  const [selectedBeach, setSelectedBeach] = useState<BeachData | null>(null);

  const beaches = useMemo((): BeachData[] => {
    if (activeFilter === "semua") return ALL_BEACHES;
    if (activeFilter === "trending") return getTrendingBeaches();
    if (activeFilter === "gratis") {
      return ALL_BEACHES.filter((beach) => beach.tiketMasukRp === 0);
    }
    return BEACHES_BY_DISTRICT[activeFilter] ?? [];
  }, [activeFilter]);

  return (
    <>
      <section id="destinasi" className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 xl:px-8">
          <div className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="h-[3px] w-7 rounded-full bg-blue-600" />
                  <div className="h-[3px] w-3.5 rounded-full bg-amber-400" />
                  <div className="h-[3px] w-2 rounded-full bg-blue-200" />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
                  Destinasi Unggulan
                </span>
              </div>

              <h2 className="mb-4 text-3xl font-black leading-[1.1] tracking-tight text-slate-900 sm:text-4xl lg:text-[2.6rem]">
                Pantai Terbaik di{" "}
                <span className="relative inline-block">
                  <span className="text-blue-600">Batam</span>
                  <svg
                    className="absolute -bottom-1 left-0 w-full overflow-visible"
                    viewBox="0 0 220 8"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 6 Q55 1 110 6 Q165 11 218 6"
                      stroke="url(#sectionBlue)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <defs>
                      <linearGradient
                        id="sectionBlue"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="0"
                      >
                        <stop stopColor="#3B82F6" />
                        <stop offset="1" stopColor="#60A5FA" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>{" "}
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  Per Kecamatan
                </span>
              </h2>

              <p className="text-base leading-relaxed text-slate-500">
                Jelajahi {ALL_BEACHES.length}+ pantai di {KECAMATAN_LIST.length}{" "}
                kecamatan yang tersebar di Batam — lengkap dengan detail alamat,
                peta, dan tips kunjungan.
              </p>
            </div>

            <div className="flex flex-shrink-0 flex-col items-start gap-6 sm:flex-row sm:items-center lg:flex-col xl:flex-row">
              <div className="flex items-center gap-5">
                <div className="text-center">
                  <p className="text-2xl font-black leading-none text-blue-600">
                    {ALL_BEACHES.length}+
                  </p>
                  <p className="mt-0.5 text-[11px] font-medium text-slate-400">
                    Destinasi
                  </p>
                </div>

                <div className="h-8 w-px bg-slate-100" />

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <p className="text-2xl font-black leading-none text-slate-900">
                      4.6
                    </p>
                  </div>
                  <p className="mt-0.5 text-[11px] font-medium text-slate-400">
                    Rata-rata
                  </p>
                </div>

                <div className="h-8 w-px bg-slate-100" />

                <div className="text-center">
                  <p className="text-2xl font-black leading-none text-slate-900">
                    {KECAMATAN_LIST.length}
                  </p>
                  <p className="mt-0.5 text-[11px] font-medium text-slate-400">
                    Kecamatan
                  </p>
                </div>
              </div>

              <a
                href="#rekomendasi"
                className="group inline-flex flex-shrink-0 items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-300/40 transition-all duration-200 hover:from-blue-700 hover:to-blue-800 active:scale-95"
              >
                <Sparkles className="h-4 w-4" />
                Rekomendasi Pantai
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          <div className="scrollbar-hide mb-10 flex items-center gap-2 overflow-x-auto pb-2">
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`flex flex-shrink-0 items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold transition-all duration-200 ${
                  activeFilter === filter.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-300/50"
                    : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                <span className="text-base leading-none">{filter.emoji}</span>
                {filter.label}
              </button>
            ))}
          </div>

          {beaches.length > 0 ? (
            <>
              <div className="mb-6 flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                  {beaches.length} Pantai Ditemukan
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {beaches.map((beach, index) => (
                  <BeachCard
                    key={beach.id}
                    beach={beach}
                    index={index}
                    onClick={() => setSelectedBeach(beach)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="py-24 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50">
                <Waves className="h-8 w-8 text-blue-300" />
              </div>
              <p className="mb-1 font-semibold text-slate-500">
                Belum ada destinasi di kategori ini.
              </p>
              <p className="text-sm text-slate-400">
                Coba pilih kategori lain atau lihat semua pantai.
              </p>
            </div>
          )}
        </div>
      </section>

      {selectedBeach && (
        <BeachDetail
          beach={selectedBeach}
          onClose={() => setSelectedBeach(null)}
        />
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}