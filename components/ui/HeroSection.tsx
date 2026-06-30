"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  Search, MapPin, Sparkles, Star, ArrowRight, Play,
  Wind, Thermometer, Waves, ChevronDown, X, List,
} from "lucide-react";

import { useBeachesContext } from "@/context/BeachesContext";
import type { BeachData } from "@/types/beach";

const BG_MAIN = "https://images.unsplash.com/photo-1763425139544-301159dc4412?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBob3VyJTIwdHJvcGljYWwlMjBiZWFjaCUyMHN1bnNldCUyMHdhcm0lMjBvY2VhbnxlbnwxfHx8fDE3NzU4Mzk5NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080";

export function HeroSection() {
  const { beaches, loading: beachesLoading, setSelectedDetailBeach } = useBeachesContext();

  const sortedByRating = useMemo(
    () => [...beaches].sort((a, b) => b.rating - a.rating),
    [beaches],
  );
  const beachCard1 = sortedByRating[0] ?? null;
  const beachCard2 = sortedByRating[1] ?? null;
  const totalCount = beaches.length;
  const avgRating = useMemo(() => {
    if (beaches.length === 0) return "4.9";
    return (beaches.reduce((s, b) => s + b.rating, 0) / beaches.length).toFixed(1);
  }, [beaches]);

  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo<BeachData[]>(() => {
    const q = query.toLowerCase().trim();
    const pool = q
      ? beaches.filter(
          (b) =>
            b.name.toLowerCase().includes(q) ||
            b.kecamatan.toLowerCase().includes(q) ||
            b.deskripsiSingkat.toLowerCase().includes(q),
        )
      : [...beaches].sort((a, b) => b.rating - a.rating);
    return pool.slice(0, 6);
  }, [beaches, query]);

  const showDropdown = focused && (beachesLoading || filtered.length > 0 || (query.trim().length > 0 && filtered.length === 0));

  const handleSelect = (beach: BeachData) => {
    setQuery(beach.name);
    setFocused(false);
    const section = document.getElementById("destinasi");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      // buka detail setelah scroll selesai (~600ms)
      setTimeout(() => setSelectedDetailBeach(beach), 650);
    } else {
      setSelectedDetailBeach(beach);
    }
  };

  const handleSearch = () => {
    setFocused(false);
    document.getElementById("destinasi")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollBehavior = "smooth";
    return () => { html.style.scrollBehavior = "auto"; };
  }, []);

  return (
    <section id="beranda" className="relative flex min-h-screen flex-col overflow-hidden">
      <div className="absolute inset-0">
        <img src={BG_MAIN} alt="Pantai indah Batam saat golden hour" className="h-full w-full object-cover object-center" draggable={false} />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-900/50 to-slate-950/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/60 via-blue-900/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-amber-900/40 via-orange-900/20 to-transparent" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 120% 60% at 50% 80%, rgba(251,146,60,0.18) 0%, transparent 70%)" }} />
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute h-[600px] w-[600px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, #FBBF24 0%, #F97316 40%, transparent 70%)", top: "5%", right: "5%", filter: "blur(60px)" }} />
        <div className="absolute h-[500px] w-[500px] rounded-full opacity-15" style={{ background: "radial-gradient(circle, #3B82F6 0%, #1E40AF 50%, transparent 70%)", bottom: "10%", left: "-5%", filter: "blur(80px)" }} />
      </div>

      {/* Floating badges */}
      <div className="absolute top-28 left-5 z-20 hidden md:block xl:left-16" style={{ animation: "floatBadge 5s ease-in-out infinite" }}>
        <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3.5 shadow-2xl shadow-blue-950/30 backdrop-blur-xl">
          <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/50">Cuaca Hari Ini · Batam</p>
          <div className="flex items-center gap-3">
            <div className="text-2xl leading-none">☀️</div>
            <div>
              <p className="text-lg leading-none font-black text-white">31°C</p>
              <p className="mt-0.5 text-[11px] font-medium text-amber-300">Cerah Berawan</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-3 border-t border-white/10 pt-2.5">
            <div className="flex items-center gap-1 text-[10px] text-white/60"><Wind className="h-2.5 w-2.5" /><span>12 km/j</span></div>
            <div className="flex items-center gap-1 text-[10px] text-white/60"><Thermometer className="h-2.5 w-2.5" /><span>Kelembaban 78%</span></div>
          </div>
        </div>
      </div>

      {beachCard1 && (
        <div className="absolute bottom-[22%] left-5 z-20 hidden lg:block xl:left-16" style={{ animation: "floatBadge 6s ease-in-out infinite 1s" }}>
          <div className="w-48 overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl shadow-blue-950/30 backdrop-blur-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={beachCard1.image} alt={beachCard1.name} className="h-24 w-full object-cover" />
            <div className="px-3 py-2.5">
              <div className="flex items-center justify-between gap-1">
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-white">{beachCard1.name}</p>
                  <p className="text-[10px] text-white/50">{beachCard1.kecamatan}</p>
                </div>
                <div className="flex flex-shrink-0 items-center gap-0.5">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-white">{beachCard1.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-28 right-5 z-20 hidden md:block xl:right-16" style={{ animation: "floatBadge 4.5s ease-in-out infinite 0.3s" }}>
        <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3.5 shadow-2xl shadow-blue-950/30 backdrop-blur-xl">
          <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/50">Destinasi Tersedia</p>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg"><MapPin className="h-4 w-4 text-white" /></div>
            <div>
              <p className="text-xl leading-none font-black text-white">
                {totalCount > 0 ? `${totalCount}+` : "—"}
              </p>
              <p className="mt-0.5 text-[11px] font-medium text-blue-300">Pantai di Batam</p>
            </div>
          </div>
        </div>
      </div>

      {beachCard2 && (
        <div className="absolute bottom-[22%] right-5 z-20 hidden lg:block xl:right-16" style={{ animation: "floatBadge 5.5s ease-in-out infinite 0.8s" }}>
          <div className="w-52 overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl shadow-blue-950/30 backdrop-blur-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={beachCard2.image} alt={beachCard2.name} className="h-24 w-full object-cover" />
            <div className="px-3 py-2.5">
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-400/20">
                  <Waves className="h-2.5 w-2.5 text-amber-400" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-white">{beachCard2.name}</p>
                  <p className="truncate text-[10px] text-amber-300">
                    {beachCard2.kecamatan}
                    {beachCard2.jamBuka ? ` · ${beachCard2.jamBuka.split(" ")[0]}` : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 pt-32 pb-12 text-center sm:px-6">
        <div className="mb-8 inline-flex items-center gap-2.5" style={{ animation: "fadeSlideUp 0.6s ease both" }}>
          <div className="flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-5 py-2 shadow-xl backdrop-blur-md">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
            </span>
            <span className="text-sm font-medium tracking-wide text-white/90">Platform Wisata Pantai Terpercaya di Kepulauan Riau</span>
            <span className="hidden items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/20 px-2.5 py-0.5 sm:flex">
              <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
              <span className="text-[11px] font-bold text-amber-300">4.9</span>
            </span>
          </div>
        </div>

        <div style={{ animation: "fadeSlideUp 0.7s ease 0.1s both" }}>
          <h1 className="mb-0 text-[2.6rem] leading-[1.08] font-black tracking-tight text-white sm:text-[3.4rem] lg:text-[4.2rem] xl:text-[4.8rem]">Jelajahi Keajaiban</h1>
          <div className="relative my-1 inline-block">
            <h1 className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-[2.6rem] leading-[1.08] font-black tracking-tight text-transparent sm:text-[3.4rem] lg:text-[4.2rem] xl:text-[4.8rem]">Pantai Batam</h1>
            <svg className="absolute left-0 -bottom-1 w-full overflow-visible sm:-bottom-2" viewBox="0 0 380 14" fill="none" preserveAspectRatio="none">
              <path d="M4 10 Q95 2 190 10 Q285 18 376 10" stroke="url(#waveGold)" strokeWidth="3" strokeLinecap="round" fill="none" style={{ animation: "drawLine 1s ease 0.7s both" }} strokeDasharray="400" strokeDashoffset="400" />
              <defs>
                <linearGradient id="waveGold" x1="0" y1="0" x2="1" y2="0">
                  <stop stopColor="#FCD34D" /><stop offset="0.5" stopColor="#F59E0B" /><stop offset="1" stopColor="#F97316" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className="text-[2.6rem] leading-[1.08] font-black tracking-tight text-white/85 sm:text-[3.4rem] lg:text-[4.2rem] xl:text-[4.8rem]">yang Menakjubkan</h1>
        </div>

        <p className="mx-auto mt-6 mb-10 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg" style={{ animation: "fadeSlideUp 0.7s ease 0.2s both" }}>
          Dari pasir putih <span className="font-semibold text-amber-300">Nongsa</span>{" "}
          hingga keindahan bawah laut{" "}<span className="font-semibold text-amber-300">Melur</span> — temukan
          destinasi pantai terbaik di Batam dengan rekomendasi cerdas yang disesuaikan untukmu.
        </p>

        <div className="mx-auto w-full max-w-3xl" style={{ animation: "fadeSlideUp 0.7s ease 0.3s both" }}>
          <div className="overflow-visible rounded-3xl border border-white/60 bg-white/[0.97] shadow-[0_32px_80px_rgba(15,23,42,0.35)] backdrop-blur-2xl">
            <div className="p-3 sm:p-4">
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <div className="relative flex-1">
                  <div className="pointer-events-none absolute top-1/2 left-4 flex -translate-y-1/2 items-center gap-2.5">
                    <Search className="h-4 w-4 text-blue-500" />
                    <span className="h-4 w-px bg-slate-200" />
                  </div>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Cari pantai atau kawasan wisata di Batam..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setTimeout(() => setFocused(false), 180)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
                    className="w-full rounded-2xl border border-blue-100 bg-blue-50 py-3.5 pr-10 pl-14 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                  {query && (
                    <button onClick={() => { setQuery(""); inputRef.current?.focus(); }} className="absolute top-1/2 right-3 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-slate-200 text-slate-500 transition-colors hover:bg-slate-300">
                      <X className="h-3 w-3" />
                    </button>
                  )}
                  {showDropdown && (
                    <div className="absolute top-full left-0 right-0 z-50 mt-2 overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-2xl shadow-blue-900/15">
                      <div className="flex items-center justify-between px-4 pt-3 pb-1.5">
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                          {beachesLoading ? "Memuat..." : query.trim() ? "Hasil Pencarian" : "Pantai Terpopuler"}
                        </p>
                        {!beachesLoading && filtered.length > 0 && (
                          <p className="text-[10px] text-slate-400">{filtered.length} pantai</p>
                        )}
                      </div>

                      {beachesLoading && (
                        <div className="flex items-center justify-center gap-2 px-4 py-5 text-sm text-slate-400">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-200 border-t-blue-500" />
                          Memuat data pantai...
                        </div>
                      )}

                      {!beachesLoading && filtered.map((beach) => (
                        <button
                          key={beach.id}
                          onMouseDown={() => handleSelect(beach)}
                          className="group/sug flex w-full items-center gap-3 px-4 py-2.5 transition-colors hover:bg-blue-50"
                        >
                          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 transition-colors group-hover/sug:bg-blue-100">
                            <MapPin className="h-3.5 w-3.5 text-blue-500" />
                          </div>
                          <div className="min-w-0 flex-1 text-left">
                            <p className="truncate text-sm font-semibold text-slate-800 group-hover/sug:text-blue-700">
                              {beach.name}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              {beach.kecamatan}
                              {beach.rating > 0 && (
                                <> · <span className="text-amber-500">⭐ {beach.rating.toFixed(1)}</span></>
                              )}
                            </p>
                          </div>
                          <span className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            beach.rekomendasi?.labelJ48 === "sangat_direkomendasikan"
                              ? "bg-emerald-50 text-emerald-600"
                              : beach.rekomendasi?.labelJ48 === "direkomendasikan"
                              ? "bg-blue-50 text-blue-600"
                              : "bg-slate-100 text-slate-500"
                          }`}>
                            {beach.rekomendasi?.labelJ48 === "sangat_direkomendasikan"
                              ? "⭐ Top"
                              : beach.rekomendasi?.labelJ48 === "direkomendasikan"
                              ? "✓ Oke"
                              : "—"}
                          </span>
                          <ArrowRight className="ml-1 h-3.5 w-3.5 flex-shrink-0 text-slate-300 opacity-0 transition-all group-hover/sug:text-blue-400 group-hover/sug:opacity-100" />
                        </button>
                      ))}

                      {!beachesLoading && query.trim().length > 0 && filtered.length === 0 && (
                        <div className="px-4 py-5 text-center">
                          <p className="text-sm text-slate-500">Pantai &quot;{query}&quot; tidak ditemukan</p>
                          <p className="mt-1 text-xs text-slate-400">Coba kata kunci lain atau nama kecamatan</p>
                        </div>
                      )}

                      <div className="border-t border-slate-100 bg-slate-50 px-4 py-2.5">
                        <p className="text-xs text-slate-400">
                          Tekan{" "}
                          <kbd className="rounded bg-slate-200 px-1.5 py-0.5 font-mono text-[10px] text-slate-600">Enter</kbd>{" "}
                          untuk melihat semua rekomendasi
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <a href="#rekomendasi" className="group relative flex flex-shrink-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-2xl px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-amber-500/35 transition-all duration-200 active:scale-95 hover:shadow-amber-500/55" style={{ background: "linear-gradient(135deg, #F59E0B 0%, #F97316 55%, #FBBF24 100%)" }}>
                  <span className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <Sparkles className="relative z-10 h-4 w-4 flex-shrink-0" />
                  <span className="relative z-10">Mulai Rekomendasi</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-6" style={{ animation: "fadeSlideUp 0.7s ease 0.45s both" }}>
          <a href="#destinasi" className="group flex items-center gap-2.5 rounded-2xl border border-white/25 bg-white/12 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:border-white/40 hover:bg-white/20 hover:shadow-xl active:scale-95">
            <List className="h-4 w-4 transition-transform group-hover:scale-110" />
            Lihat Daftar Pantai
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <div className="hidden h-7 w-px bg-white/15 sm:block" />
          <button onClick={() => setVideoPlaying(true)} className="group flex items-center gap-3 text-white/80 transition-colors hover:text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/30 bg-transparent shadow-lg backdrop-blur-sm transition-all hover:border-white/60 group-hover:bg-white/10">
              <Play className="ml-0.5 h-3.5 w-3.5 fill-white text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold">Tonton Video</p>
              <p className="text-[11px] text-white/50">Keindahan Pantai Batam</p>
            </div>
          </button>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-8 sm:gap-12" style={{ animation: "fadeSlideUp 0.7s ease 0.55s both" }}>
          <div className="flex w-full items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/20" />
            <div className="h-px w-4 bg-white/10" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/20" />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              {totalCount > 0 ? `${totalCount}+` : "—"}
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/45">Destinasi Pantai</p>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-2xl font-black tracking-tight text-white sm:text-3xl">{avgRating}</span>
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/45">Rating Rata-rata</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-2 pb-8">
        <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/35">Gulir ke bawah</p>
        <div className="flex h-9 w-[22px] cursor-pointer items-start justify-center rounded-full border-2 border-white/20 pt-1.5 transition-colors hover:border-white/40">
          <div className="h-2.5 w-1 rounded-full bg-white/50" style={{ animation: "scrollPill 1.8s ease-in-out infinite" }} />
        </div>
        <ChevronDown className="h-4 w-4 text-white/25" style={{ animation: "bounceY 1.8s ease-in-out infinite" }} />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10">
        <div className="absolute bottom-8 left-0 right-0 h-20 bg-gradient-to-t from-white/5 to-transparent" />
        <svg viewBox="0 0 1440 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="block w-full" preserveAspectRatio="none">
          <path d="M0 96V60 Q180 18 360 56 Q540 94 720 52 Q900 10 1080 50 Q1260 90 1440 54 V96 Z" fill="white" />
        </svg>
      </div>

      {videoPlaying && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm" onClick={() => setVideoPlaying(false)}>
          <div className="relative aspect-video w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/20 bg-white/10"><Waves className="h-7 w-7 text-white/50" /></div>
              <p className="px-8 text-center text-sm text-white/50">Video keindahan pantai Batam akan tersedia segera.<br /><span className="text-xs text-white/30">(Fitur ini sedang dalam pengembangan)</span></p>
            </div>
            <button onClick={() => setVideoPlaying(false)} className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"><X className="h-4 w-4" /></button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes floatBadge { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes scrollPill { 0% { transform: translateY(0); opacity: 1; } 80% { transform: translateY(14px); opacity: 0; } 81% { transform: translateY(0); opacity: 0; } 100% { opacity: 1; } }
        @keyframes bounceY { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(4px); } }
        @keyframes drawLine { to { stroke-dashoffset: 0; } }
      `}</style>
    </section>
  );
}
