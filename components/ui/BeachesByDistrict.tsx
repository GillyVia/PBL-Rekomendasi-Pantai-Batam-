"use client";

import { useState } from "react";
import { Heart, Star, MapPin, Clock, Waves, ChevronRight, Navigation, ChevronDown } from "lucide-react";
import { useBeachesContext } from "@/context/BeachesContext";
import type { BeachData } from "@/types/beach";
import { BeachDetail } from "@/components/ui/BeachDetail";

const KECAMATAN_THEME: Record<string, { hex: string; bgPill: string; textPill: string; chevronActive: string }> = {
  Nongsa: { hex: "#3B82F6", bgPill: "bg-blue-50", textPill: "text-blue-600", chevronActive: "text-blue-500" },
  "Batam Kota": { hex: "#F97316", bgPill: "bg-orange-50", textPill: "text-orange-600", chevronActive: "text-orange-500" },
  Galang: { hex: "#06B6D4", bgPill: "bg-cyan-50", textPill: "text-cyan-600", chevronActive: "text-cyan-500" },
  Sekupang: { hex: "#10B981", bgPill: "bg-emerald-50", textPill: "text-emerald-600", chevronActive: "text-emerald-500" },
  Bengkong: { hex: "#8B5CF6", bgPill: "bg-purple-50", textPill: "text-purple-600", chevronActive: "text-purple-500" },
  "Belakang Padang": { hex: "#F59E0B", bgPill: "bg-amber-50", textPill: "text-amber-600", chevronActive: "text-amber-500" },
  Bulang: { hex: "#F43F5E", bgPill: "bg-rose-50", textPill: "text-rose-600", chevronActive: "text-rose-500" },
};

const defaultTheme = { hex: "#3B82F6", bgPill: "bg-blue-50", textPill: "text-blue-600", chevronActive: "text-blue-500" };

const getBadgeClass = (color: string) => {
  const map: Record<string, string> = {
    "#F59E0B": "bg-amber-500", "#10B981": "bg-emerald-500", "#3B82F6": "bg-blue-500",
    "#F97316": "bg-orange-500", "#06B6D4": "bg-cyan-500", "#8B5CF6": "bg-purple-500",
    "#EC4899": "bg-pink-500", "#1D4ED8": "bg-blue-700", "#0EA5E9": "bg-sky-500",
    "#065F46": "bg-emerald-800", "#64748B": "bg-slate-500", "#F43F5E": "bg-rose-500",
  };
  return map[color] ?? "bg-blue-500";
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={`h-2.5 w-2.5 ${s <= Math.floor(rating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`} />
      ))}
    </div>
  );
}

function BeachCard({ beach, onClick }: { beach: BeachData; onClick: () => void }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-900/8" onClick={onClick}>
      <div className="relative h-[116px] flex-shrink-0 overflow-hidden">
        <img src={beach.image} alt={beach.name} className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-900/10 to-transparent" />

        <span className={`absolute top-2 left-2 rounded-lg px-2 py-0.5 text-[8px] leading-tight font-black text-white shadow-sm ${getBadgeClass(beach.badgeColor)}`}>{beach.badge}</span>

        <button onClick={(e) => { e.stopPropagation(); setLiked((v) => !v); }} className={`absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-lg shadow-sm transition-all active:scale-90 ${liked ? "bg-rose-500 text-white" : "bg-white/85 text-slate-400 hover:bg-white hover:text-slate-600"}`}>
          <Heart className={`h-3 w-3 ${liked ? "fill-white" : ""}`} />
        </button>

        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
          <div className="flex items-center gap-0.5 rounded-lg bg-black/45 px-1.5 py-0.5 backdrop-blur-sm">
            <Navigation className="h-2.5 w-2.5 flex-shrink-0 text-white/70" />
            <span className="text-[9px] font-semibold text-white">{beach.jarakDariKota} km</span>
          </div>
          <span className={`rounded-lg px-2 py-0.5 text-[9px] font-bold ${beach.tiketMasukRp === 0 ? "bg-emerald-500 text-white" : "bg-white/90 text-blue-700"}`}>{beach.tiketMasuk}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-2.5">
        <div className="mb-1 flex items-center gap-1.5">
          <StarRating rating={beach.rating} />
          <span className="text-[11px] font-black text-slate-700">{beach.rating}</span>
          <span className="text-[9px] text-slate-400">({beach.reviews.toLocaleString("id-ID")})</span>
        </div>
        <h3 className="mb-1 line-clamp-1 text-[13px] leading-tight font-black text-slate-900 transition-colors group-hover:text-blue-700">{beach.name}</h3>
        <div className="mb-2 flex items-center gap-1">
          <MapPin className="h-2.5 w-2.5 flex-shrink-0 text-blue-400" />
          <span className="truncate text-[10px] text-slate-400">{beach.kelurahan}</span>
        </div>
        <div className="mb-2.5 flex flex-wrap gap-1">
          {beach.aktivitas.slice(0, 2).map((a) => (
            <span key={a} className="rounded-md border border-blue-100 bg-blue-50 px-1.5 py-0.5 text-[9px] leading-tight font-semibold text-blue-700">{a}</span>
          ))}
          {beach.aktivitas.length > 2 && <span className="rounded-md border border-slate-100 bg-slate-50 px-1.5 py-0.5 text-[9px] leading-tight font-semibold text-slate-400">+{beach.aktivitas.length - 2}</span>}
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

function DistrictSection({ kecamatan, beaches }: { kecamatan: string; beaches: BeachData[] }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedBeach, setSelectedBeach] = useState<BeachData | null>(null);

  const theme = KECAMATAN_THEME[kecamatan] ?? defaultTheme;
  const avgRating = (beaches.reduce((s, b) => s + b.rating, 0) / beaches.length).toFixed(1);
  const gratisPantai = beaches.filter((b) => b.tiketMasukRp === 0).length;

  return (
    <>
      <div>
        <button onClick={() => setIsExpanded(!isExpanded)} className="group mb-2.5 w-full text-left" aria-expanded={isExpanded}>
          <div className={`flex items-center justify-between rounded-xl border border-slate-150 bg-white px-4 py-3 transition-all duration-200 hover:border-slate-200 ${isExpanded ? "shadow-sm" : "hover:shadow-sm"}`} style={{ borderLeft: `3px solid ${theme.hex}` }}>
            <div className="flex min-w-0 items-center gap-3">
              <div className="min-w-0">
                <div className="mb-0.5 flex flex-wrap items-center gap-2">
                  <h3 className="whitespace-nowrap text-[13px] leading-tight font-black text-slate-900">Kecamatan {kecamatan}</h3>
                  <span className={`${theme.bgPill} ${theme.textPill} flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold`}>{beaches.length} pantai</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Star className="h-2.5 w-2.5 flex-shrink-0 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-slate-600">{avgRating}</span>
                    <span>rata-rata</span>
                  </span>
                  <span className="text-slate-200">·</span>
                  <span><span className="font-semibold text-emerald-600">{gratisPantai}</span> pantai gratis</span>
                </div>
              </div>
            </div>
            <ChevronDown className={`ml-3 h-4 w-4 flex-shrink-0 transition-all duration-300 ${isExpanded ? `${theme.chevronActive} -rotate-180` : "text-slate-300 group-hover:text-slate-500"}`} />
          </div>
        </button>

        {isExpanded && (
          <div className="animate-slideDown grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {beaches.map((beach) => (
              <BeachCard key={beach.id} beach={beach} onClick={() => setSelectedBeach(beach)} />
            ))}
          </div>
        )}
      </div>

      {selectedBeach && <BeachDetail beach={selectedBeach} onClose={() => setSelectedBeach(null)} />}
    </>
  );
}

export function BeachesByDistrict() {
  const { beaches, beachesByDistrict, kecamatanList } = useBeachesContext();

  return (
    <section id="destinasi" className="bg-gradient-to-b from-white via-slate-50/30 to-white py-12 lg:py-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 xl:px-8">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <div className="flex items-center gap-1">
              <div className="h-[2px] w-5 rounded-full bg-blue-600" />
              <div className="h-[2px] w-2.5 rounded-full bg-amber-400" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-600">Daftar Pantai Lengkap</span>
            <div className="flex items-center gap-1">
              <div className="h-[2px] w-2.5 rounded-full bg-amber-400" />
              <div className="h-[2px] w-5 rounded-full bg-blue-600" />
            </div>
          </div>
          <h2 className="mb-3 text-2xl leading-tight font-black tracking-tight text-slate-900 sm:text-3xl">
            Pantai Batam <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Per Kecamatan</span>
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-slate-500">
            {beaches.length} pantai tersebar di {kecamatanList.length} kecamatan — dilengkapi deskripsi, alamat, peta, dan tips kunjungan untuk setiap destinasi.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { icon: Waves, value: `${beaches.length}`, label: "Pantai", bg: "bg-blue-50", text: "text-blue-600" },
              { icon: Star, value: "4.6", label: "Rating", bg: "bg-amber-50", text: "text-amber-500" },
              { icon: MapPin, value: `${kecamatanList.length}`, label: "Kecamatan", bg: "bg-emerald-50", text: "text-emerald-600" },
            ].map((s) => (
              <div key={s.label} className={`flex items-center gap-1.5 rounded-full border border-slate-100 px-3 py-1.5 ${s.bg}`}>
                <s.icon className={`h-3 w-3 flex-shrink-0 ${s.text} ${s.label === "Rating" ? "fill-amber-400" : ""}`} />
                <span className={`text-[12px] font-black ${s.text}`}>{s.value}</span>
                <span className="text-[10px] text-slate-400">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {kecamatanList.map((kecamatan) => {
            const districtBeaches = beachesByDistrict[kecamatan];
            if (!districtBeaches || districtBeaches.length === 0) return null;
            return <DistrictSection key={kecamatan} kecamatan={kecamatan} beaches={districtBeaches} />;
          })}
        </div>
      </div>

      <style>{`
        @keyframes slideDown { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slideDown { animation: slideDown 0.2s ease-out; }
      `}</style>
    </section>
  );
}
