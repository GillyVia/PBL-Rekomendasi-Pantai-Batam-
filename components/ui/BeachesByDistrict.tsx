"use client";

import { useState } from "react";
import {
  Heart, Star, MapPin, Clock, Waves, ChevronRight, Navigation,
  ChevronDown, Sparkles, ArrowRight, TrendingUp,
} from "lucide-react";
import { useBeachesContext } from "@/context/BeachesContext";
import type { BeachData } from "@/types/beach";
import { BeachDetail } from "@/components/ui/BeachDetail";

/* ─── Theme per kecamatan ─────────────────────────────────────────── */
const KECAMATAN_THEME: Record<string, {
  hex: string; bgPill: string; textPill: string;
  chevronActive: string; filterActive: string; filterText: string;
}> = {
  Nongsa:           { hex: "#3B82F6", bgPill: "bg-blue-50",    textPill: "text-blue-600",    chevronActive: "text-blue-500",    filterActive: "bg-blue-600",    filterText: "text-blue-600"    },
  "Batam Kota":     { hex: "#F97316", bgPill: "bg-orange-50",  textPill: "text-orange-600",  chevronActive: "text-orange-500",  filterActive: "bg-orange-500",  filterText: "text-orange-600"  },
  Galang:           { hex: "#06B6D4", bgPill: "bg-cyan-50",    textPill: "text-cyan-600",    chevronActive: "text-cyan-500",    filterActive: "bg-cyan-600",    filterText: "text-cyan-600"    },
  Sekupang:         { hex: "#10B981", bgPill: "bg-emerald-50", textPill: "text-emerald-600", chevronActive: "text-emerald-500", filterActive: "bg-emerald-600", filterText: "text-emerald-600" },
  Bengkong:         { hex: "#8B5CF6", bgPill: "bg-purple-50",  textPill: "text-purple-600",  chevronActive: "text-purple-500",  filterActive: "bg-purple-600",  filterText: "text-purple-600"  },
  "Belakang Padang":{ hex: "#F59E0B", bgPill: "bg-amber-50",   textPill: "text-amber-600",   chevronActive: "text-amber-500",   filterActive: "bg-amber-500",   filterText: "text-amber-600"   },
  Bulang:           { hex: "#F43F5E", bgPill: "bg-rose-50",    textPill: "text-rose-600",    chevronActive: "text-rose-500",    filterActive: "bg-rose-500",    filterText: "text-rose-600"    },
};

const defaultTheme = {
  hex: "#3B82F6", bgPill: "bg-blue-50", textPill: "text-blue-600",
  chevronActive: "text-blue-500", filterActive: "bg-blue-600", filterText: "text-blue-600",
};

const KECAMATAN_EMOJI: Record<string, string> = {
  Nongsa: "🌊", "Batam Kota": "🏙️", Galang: "🐠",
  Sekupang: "🌿", Bengkong: "🌅", "Belakang Padang": "⛵", Bulang: "🏝️",
};

const getBadgeClass = (color: string) => {
  const map: Record<string, string> = {
    "#F59E0B": "bg-amber-500", "#10B981": "bg-emerald-500", "#3B82F6": "bg-blue-500",
    "#F97316": "bg-orange-500", "#06B6D4": "bg-cyan-500",   "#8B5CF6": "bg-purple-500",
    "#EC4899": "bg-pink-500",  "#1D4ED8": "bg-blue-700",   "#0EA5E9": "bg-sky-500",
    "#065F46": "bg-emerald-800","#64748B": "bg-slate-500",  "#F43F5E": "bg-rose-500",
  };
  return map[color] ?? "bg-blue-500";
};

/* ─── StarRating ──────────────────────────────────────────────────── */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`h-2.5 w-2.5 ${s <= Math.floor(rating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`}
        />
      ))}
    </div>
  );
}

/* ─── BeachCard ───────────────────────────────────────────────────── */
function BeachCard({ beach, onClick }: { beach: BeachData; onClick: () => void }) {
  const [liked, setLiked] = useState(false);

  return (
    <div
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-900/8"
      onClick={onClick}
    >
      <div className="relative h-[116px] flex-shrink-0 overflow-hidden">
        <img
          src={beach.image}
          alt={beach.name}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-900/10 to-transparent" />

        <span className={`absolute top-2 left-2 rounded-lg px-2 py-0.5 text-[8px] leading-tight font-black text-white shadow-sm ${getBadgeClass(beach.badgeColor)}`}>
          {beach.badge}
        </span>

        <button
          onClick={(e) => { e.stopPropagation(); setLiked((v) => !v); }}
          className={`absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-lg shadow-sm transition-all active:scale-90 ${liked ? "bg-rose-500 text-white" : "bg-white/85 text-slate-400 hover:bg-white hover:text-slate-600"}`}
        >
          <Heart className={`h-3 w-3 ${liked ? "fill-white" : ""}`} />
        </button>

        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
          <div className="flex items-center gap-0.5 rounded-lg bg-black/45 px-1.5 py-0.5 backdrop-blur-sm">
            <Navigation className="h-2.5 w-2.5 flex-shrink-0 text-white/70" />
            <span className="text-[9px] font-semibold text-white">{beach.jarakDariKota} km</span>
          </div>
          <span className={`rounded-lg px-2 py-0.5 text-[9px] font-bold ${beach.tiketMasukRp === 0 ? "bg-emerald-500 text-white" : "bg-white/90 text-blue-700"}`}>
            {beach.tiketMasuk}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-2.5">
        <div className="mb-1 flex items-center gap-1.5">
          <StarRating rating={beach.rating} />
          <span className="text-[11px] font-black text-slate-700">{beach.rating}</span>
          <span className="text-[9px] text-slate-400">({beach.reviews.toLocaleString("id-ID")})</span>
        </div>
        <h3 className="mb-1 line-clamp-1 text-[13px] leading-tight font-black text-slate-900 transition-colors group-hover:text-blue-700">
          {beach.name}
        </h3>
        <div className="mb-2 flex items-center gap-1">
          <MapPin className="h-2.5 w-2.5 flex-shrink-0 text-blue-400" />
          <span className="truncate text-[10px] text-slate-400">{beach.kelurahan}</span>
        </div>
        <div className="mb-2.5 flex flex-wrap gap-1">
          {beach.aktivitas.slice(0, 2).map((a) => (
            <span key={a} className="rounded-md border border-blue-100 bg-blue-50 px-1.5 py-0.5 text-[9px] leading-tight font-semibold text-blue-700">
              {a}
            </span>
          ))}
          {beach.aktivitas.length > 2 && (
            <span className="rounded-md border border-slate-100 bg-slate-50 px-1.5 py-0.5 text-[9px] leading-tight font-semibold text-slate-400">
              +{beach.aktivitas.length - 2}
            </span>
          )}
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-2">
          <div className="flex items-center gap-1">
            <Clock className="h-2.5 w-2.5 flex-shrink-0 text-slate-300" />
            <span className="truncate text-[9px] text-slate-400">{beach.jamBuka}</span>
          </div>
          <button className="group/btn flex flex-shrink-0 items-center gap-0.5 rounded-lg border border-blue-100 bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-600 transition-all duration-200 hover:border-blue-600 hover:bg-blue-600 hover:text-white active:scale-95">
            Detail<ChevronRight className="h-2.5 w-2.5 transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── DistrictSection ─────────────────────────────────────────────── */
function DistrictSection({ kecamatan, beaches }: { kecamatan: string; beaches: BeachData[] }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedBeach, setSelectedBeach] = useState<BeachData | null>(null);

  const theme = KECAMATAN_THEME[kecamatan] ?? defaultTheme;
  const avgRating = (beaches.reduce((s, b) => s + b.rating, 0) / beaches.length).toFixed(1);
  const gratisPantai = beaches.filter((b) => b.tiketMasukRp === 0).length;
  const trendingCount = beaches.filter((b) => b.trending).length;

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="group w-full text-left"
          aria-expanded={isExpanded}
        >
          <div
            className="flex items-center justify-between px-5 py-4 transition-colors duration-150 hover:bg-slate-50/60"
            style={{ borderLeft: `4px solid ${theme.hex}` }}
          >
            <div className="flex min-w-0 items-center gap-3">
              <div
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-lg shadow-sm"
                style={{ background: `${theme.hex}15` }}
              >
                {KECAMATAN_EMOJI[kecamatan] ?? "🌊"}
              </div>
              <div className="min-w-0">
                <div className="mb-0.5 flex flex-wrap items-center gap-2">
                  <h3 className="whitespace-nowrap text-[14px] leading-tight font-black text-slate-900">
                    Kecamatan {kecamatan}
                  </h3>
                  <span className={`${theme.bgPill} ${theme.textPill} flex-shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold`}>
                    {beaches.length} pantai
                  </span>
                  {trendingCount > 0 && (
                    <span className="flex flex-shrink-0 items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-600">
                      <TrendingUp className="h-2.5 w-2.5" />{trendingCount} trending
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Star className="h-2.5 w-2.5 flex-shrink-0 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-slate-600">{avgRating}</span>
                    <span>rata-rata</span>
                  </span>
                  <span className="text-slate-200">·</span>
                  <span>
                    <span className="font-semibold text-emerald-600">{gratisPantai}</span> pantai gratis
                  </span>
                </div>
              </div>
            </div>
            <ChevronDown
              className={`ml-3 h-4 w-4 flex-shrink-0 transition-all duration-300 ${isExpanded ? `${theme.chevronActive} -rotate-180` : "text-slate-300 group-hover:text-slate-500"}`}
            />
          </div>
        </button>

        {isExpanded && (
          <div className="animate-slideDown border-t border-slate-50 p-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {beaches.map((beach) => (
                <BeachCard key={beach.id} beach={beach} onClick={() => setSelectedBeach(beach)} />
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedBeach && <BeachDetail beach={selectedBeach} onClose={() => setSelectedBeach(null)} />}
    </>
  );
}

/* ─── LoadingSkeleton ─────────────────────────────────────────────── */
function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="flex items-center justify-between px-5 py-4" style={{ borderLeft: "4px solid #E2E8F0" }}>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-slate-200" />
              <div className="space-y-1.5">
                <div className="h-4 w-36 rounded-full bg-slate-200" />
                <div className="h-3 w-28 rounded-full bg-slate-200" />
              </div>
            </div>
            <div className="h-4 w-4 rounded-full bg-slate-200" />
          </div>
          <div className="border-t border-slate-50 p-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {[...Array(4)].map((__, j) => (
                <div key={j} className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
                  <div className="h-[116px] bg-slate-200" />
                  <div className="space-y-2 p-2.5">
                    <div className="h-3 w-2/3 rounded-full bg-slate-200" />
                    <div className="h-4 w-full rounded-full bg-slate-200" />
                    <div className="h-3 w-1/2 rounded-full bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── BeachesByDistrict (main export) ────────────────────────────── */
export function BeachesByDistrict() {
  const { beaches, beachesByDistrict, kecamatanList, loading, selectedDetailBeach, setSelectedDetailBeach } = useBeachesContext();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const avgRating = beaches.length > 0
    ? (beaches.reduce((s, b) => s + b.rating, 0) / beaches.length).toFixed(1)
    : "4.6";

  const displayList = activeFilter
    ? kecamatanList.filter((k) => k === activeFilter)
    : kecamatanList;

  return (
    <section
      id="destinasi"
      className="relative overflow-hidden py-20 lg:py-28"
      style={{ background: "linear-gradient(160deg, #F8FAFF 0%, #FFFFFF 40%, #FFFBEB 80%, #F0F9FF 100%)" }}
    >
      {/* Decorative orbs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-amber-100/40 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 right-1/3 h-56 w-56 rounded-full bg-cyan-100/25 blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 xl:px-8">

        {/* ── Header ───────────────────────────────────────────────── */}
        <div className="mb-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="h-[3px] w-7 rounded-full bg-blue-600" />
                <div className="h-[3px] w-3.5 rounded-full bg-amber-400" />
                <div className="h-[3px] w-2 rounded-full bg-blue-200" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
                Daftar Pantai Lengkap
              </span>
            </div>

            <h2 className="mb-4 text-3xl leading-[1.1] font-black tracking-tight text-slate-900 sm:text-4xl lg:text-[2.6rem]">
              Pantai Batam{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Per Kecamatan
                </span>
                <svg
                  className="absolute left-0 -bottom-1 w-full overflow-visible"
                  viewBox="0 0 260 8"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 6 Q65 1 130 6 Q195 11 258 6"
                    stroke="url(#districtGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <defs>
                    <linearGradient id="districtGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop stopColor="#3B82F6" />
                      <stop offset="1" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h2>

            <p className="text-base leading-relaxed text-slate-500">
              {loading
                ? "Memuat data pantai…"
                : `Jelajahi ${beaches.length}+ pantai di ${kecamatanList.length} kecamatan yang tersebar di Batam — lengkap dengan detail alamat, peta interaktif, dan tips kunjungan.`}
            </p>
          </div>

          {/* Stats + CTA */}
          <div className="flex flex-shrink-0 flex-col items-start gap-6 sm:flex-row sm:items-center lg:flex-col xl:flex-row">
            <div className="flex items-center gap-5">
              <div className="text-center">
                <p className="text-2xl leading-none font-black text-blue-600">
                  {loading ? "—" : `${beaches.length}+`}
                </p>
                <p className="mt-0.5 text-[11px] font-medium text-slate-400">Destinasi</p>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <p className="text-2xl leading-none font-black text-slate-900">{avgRating}</p>
                </div>
                <p className="mt-0.5 text-[11px] font-medium text-slate-400">Rata-rata</p>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="text-center">
                <p className="text-2xl leading-none font-black text-slate-900">
                  {loading ? "—" : kecamatanList.length}
                </p>
                <p className="mt-0.5 text-[11px] font-medium text-slate-400">Kecamatan</p>
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

        {/* ── Filter tabs ──────────────────────────────────────────── */}
        {!loading && kecamatanList.length > 0 && (
          <div className="scrollbar-hide mb-8 flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveFilter(null)}
              className={`flex flex-shrink-0 items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold transition-all duration-200 ${
                !activeFilter
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-300/50"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              <Waves className="h-3.5 w-3.5" />
              Semua
            </button>
            {kecamatanList.map((k) => {
              const t = KECAMATAN_THEME[k] ?? defaultTheme;
              const isActive = activeFilter === k;
              return (
                <button
                  key={k}
                  onClick={() => setActiveFilter(isActive ? null : k)}
                  className={`flex flex-shrink-0 items-center gap-1.5 rounded-2xl px-5 py-2.5 text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? "text-white shadow-lg"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                  style={isActive ? { background: t.hex, boxShadow: `0 4px 14px ${t.hex}40` } : undefined}
                >
                  <span className="text-sm leading-none">{KECAMATAN_EMOJI[k] ?? "📍"}</span>
                  {k}
                  {!isActive && (
                    <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-black ${t.bgPill} ${t.textPill}`}>
                      {beachesByDistrict[k]?.length ?? 0}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* ── Content ──────────────────────────────────────────────── */}
        <div className="space-y-4">
          {loading ? (
            <LoadingSkeleton />
          ) : (
            displayList.map((kecamatan) => {
              const districtBeaches = beachesByDistrict[kecamatan];
              if (!districtBeaches || districtBeaches.length === 0) return null;
              return (
                <DistrictSection key={kecamatan} kecamatan={kecamatan} beaches={districtBeaches} />
              );
            })
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.22s ease-out; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {selectedDetailBeach && (
        <BeachDetail beach={selectedDetailBeach} onClose={() => setSelectedDetailBeach(null)} />
      )}
    </section>
  );
}
