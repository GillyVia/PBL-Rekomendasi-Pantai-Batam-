"use client";

import { useEffect, useMemo, useRef, useState, type ElementType } from "react";
import { ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, Tooltip } from "recharts";
import type { BeachData } from "@/types/beach";
import {
  Waves, Star, MapPin, TrendingUp, Shield, Clock, Award,
  BarChart3, Activity, ChevronRight, ArrowUpRight, Trophy, MessageCircle, Sun, Building2,
} from "lucide-react";
import { useBeachesContext } from "@/context/BeachesContext";

type KpiCardData = {
  icon: ElementType; value: number; suffix: string; decimals: number;
  label: string; sub: string; gradient: string; bg: string; iconColor: string;
  badgeColor: string; badge: string; progress: number;
};

function useCountUp(target: number, duration = 1800, trigger = false, decimals = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = eased * target;
      if (decimals > 0) setCount(Math.round(value * 10) / 10);
      else setCount(Math.floor(value));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setCount(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, trigger, decimals]);
  return count;
}

const KATEGORI_COLORS: Record<string, string> = {
  Keluarga: "#3B82F6", Sunset: "#F59E0B", Snorkeling: "#06B6D4",
  Tersembunyi: "#10B981", Camping: "#8B5CF6", Fotografi: "#EC4899",
};

const TRUST_ITEMS = [
  { icon: Shield, label: "Terverifikasi Tim Lokal", desc: "Setiap pantai dicek langsung oleh kurator.", color: "blue" },
  { icon: Clock, label: "Diperbarui Berkala", desc: "Informasi pantai, fasilitas, dan akses diperbarui.", color: "emerald" },
  { icon: Award, label: "Kurasi Destinasi", desc: "Pantai dipilih berdasarkan kualitas dan ulasan wisatawan.", color: "amber" },
  { icon: TrendingUp, label: "Data Semakin Bertambah", desc: "Jumlah data dan destinasi terus berkembang.", color: "violet" },
] as const;

const TRUST_COLORS: Record<string, { bg: string; icon: string; border: string }> = {
  blue: { bg: "bg-blue-50", icon: "text-blue-600", border: "border-blue-100" },
  emerald: { bg: "bg-emerald-50", icon: "text-emerald-600", border: "border-emerald-100" },
  amber: { bg: "bg-amber-50", icon: "text-amber-600", border: "border-amber-100" },
  violet: { bg: "bg-violet-50", icon: "text-violet-600", border: "border-violet-100" },
};

function KpiCard({ card, trigger }: { card: KpiCardData; trigger: boolean }) {
  const count = useCountUp(card.value, 1800, trigger, card.decimals);
  const display = card.decimals > 0 ? count.toFixed(1) : Math.floor(count).toLocaleString("id-ID");
  return (
    <div className="group relative bg-white rounded-[24px] p-5 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div className={`absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${card.gradient} opacity-[0.07]`} />
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-11 h-11 rounded-2xl ${card.bg} flex items-center justify-center`}>
            <card.icon className={`w-5 h-5 ${card.iconColor}`} />
          </div>
          <span className={`text-[10px] font-black px-2.5 py-1 rounded-xl ${card.badgeColor} flex items-center gap-1`}>
            <ArrowUpRight className="w-2.5 h-2.5" />{card.badge}
          </span>
        </div>
        <div className={`text-[2rem] font-black leading-none bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent mb-1 tracking-tight`}>
          {display}<span className="text-2xl">{card.suffix}</span>
        </div>
        <p className="text-slate-800 font-bold text-sm mb-0.5">{card.label}</p>
        <p className="text-slate-400 text-[11px] mb-4">{card.sub}</p>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className={`h-full rounded-full bg-gradient-to-r ${card.gradient} transition-all duration-[1200ms] ease-out`} style={{ width: trigger ? `${card.progress}%` : "0%" }} />
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-slate-300 text-[10px]">Capaian</span>
          <span className="text-slate-500 text-[10px] font-bold">{card.progress}%</span>
        </div>
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; payload: { fill: string } }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xl px-4 py-3 text-xs">
      <p className="text-slate-500 font-semibold mb-1">{label}</p>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full" style={{ background: payload[0].payload.fill }} />
        <span className="text-slate-600">Jumlah:</span>
        <span className="text-slate-900 font-black">{payload[0].value}</span>
      </div>
    </div>
  );
}

function RatingTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xl px-4 py-3 text-xs">
      <p className="text-slate-500 font-semibold mb-1">{label}</p>
      <div className="flex items-center gap-1.5">
        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
        <span className="text-slate-900 font-black">{payload[0].value} / 5</span>
      </div>
    </div>
  );
}

function DistBar({ label, count, total, color }: { label: string; count: number; total: number; color: string }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="mb-2.5 last:mb-0">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] text-slate-500">{label}</span>
        <span className="text-[10px] font-bold text-slate-600">{count}</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function RankItem({ rank, name, kecamatan, displayValue, value, maxValue, barColor }: { rank: number; name: string; kecamatan: string; displayValue: string; value: number; maxValue: number; barColor: string }) {
  const pct = maxValue > 0 ? Math.round((value / maxValue) * 100) : 0;
  const rankBg = rank === 1 ? "bg-amber-100 text-amber-700" : rank === 2 ? "bg-slate-100 text-slate-600" : rank === 3 ? "bg-orange-100 text-orange-600" : "bg-slate-50 text-slate-400";
  return (
    <div className="mb-3.5 last:mb-0">
      <div className="flex items-center gap-2.5 mb-1.5">
        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black flex-shrink-0 ${rankBg}`}>{rank}</span>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-slate-800 truncate">{name}</p>
          <p className="text-[9px] text-slate-400">{kecamatan}</p>
        </div>
        <span className="text-sm font-black text-slate-700 flex-shrink-0">{displayValue}</span>
      </div>
      <div className="ml-7 h-1 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${barColor} rounded-full`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function StatsSection() {
  const { beaches } = useBeachesContext();
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const stats = useMemo(() => {
    if (beaches.length === 0) return null;
    const totalBeaches = beaches.length;
    const avgRating = Math.round((beaches.reduce((s, b) => s + b.rating, 0) / totalBeaches) * 10) / 10;
    const totalKecamatan = new Set(beaches.map((b) => b.kecamatan)).size;

    const kategoriCount: Record<string, number> = {};
    beaches.forEach((b) => b.kategori.forEach((k) => { kategoriCount[k] = (kategoriCount[k] || 0) + 1; }));
    const barKategori = Object.entries(kategoriCount).map(([kategori, jumlah]) => ({ kategori, jumlah, fill: KATEGORI_COLORS[kategori] ?? "#94A3B8" })).sort((a, b) => b.jumlah - a.jumlah);

    const kecAcc: Record<string, { sum: number; count: number }> = {};
    beaches.forEach((b) => { if (!kecAcc[b.kecamatan]) kecAcc[b.kecamatan] = { sum: 0, count: 0 }; kecAcc[b.kecamatan].sum += b.rating; kecAcc[b.kecamatan].count++; });
    const ratingPerKecamatan = Object.entries(kecAcc).map(([kecamatan, { sum, count }]) => ({ kecamatan: kecamatan.replace(/^Kecamatan\s+/i, ""), avgRating: Math.round((sum / count) * 10) / 10 })).sort((a, b) => b.avgRating - a.avgRating);

    const top5Rating = [...beaches].sort((a, b) => b.rating - a.rating).slice(0, 5);
    const top5Reviews = [...beaches].sort((a, b) => b.reviews - a.reviews).slice(0, 5);

    const suasana = { rendah: 0, cukup: 0, tinggi: 0 };
    const fasilitas = { rendah: 0, sedang: 0, lengkap: 0 };
    const popularitas = { rendah: 0, sedang: 0, tinggi: 0 };
    const akses = { mudah: 0, sedang: 0, sulit: 0 };

    beaches.forEach((b) => {
      const s = b.rekomendasi?.suasanaScore ?? 1;
      if (s <= 1) suasana.rendah++; else if (s === 2) suasana.cukup++; else suasana.tinggi++;
      const f = b.rekomendasi?.fasilitasScore ?? 1;
      if (f <= 1) fasilitas.rendah++; else if (f === 2) fasilitas.sedang++; else fasilitas.lengkap++;
      const p = b.rekomendasi?.popularitasScore ?? 1;
      if (p <= 1) popularitas.rendah++; else if (p === 2) popularitas.sedang++; else popularitas.tinggi++;
      if (b.aksesJalan === "mudah") akses.mudah++; else if (b.aksesJalan === "sedang") akses.sedang++; else akses.sulit++;
    });

    return { totalBeaches, avgRating, totalKecamatan, barKategori, ratingPerKecamatan, top5Rating, top5Reviews, suasana, fasilitas, popularitas, akses };
  }, [beaches]);

  const kpiCards = useMemo((): KpiCardData[] => {
    const total = stats?.totalBeaches ?? 0;
    const avg = stats?.avgRating ?? 0;
    const kec = stats?.totalKecamatan ?? 0;
    return [
      { icon: Waves, value: total, suffix: "+", decimals: 0, label: "Destinasi Pantai", sub: "Terkurasi & terverifikasi", gradient: "from-blue-500 to-blue-600", bg: "bg-blue-50", iconColor: "text-blue-600", badgeColor: "bg-blue-100 text-blue-700", badge: "Terverifikasi", progress: Math.min(Math.round((total / 50) * 100), 100) },
      { icon: Star, value: avg, suffix: "/5", decimals: 1, label: "Rating Rata-rata", sub: "Dari seluruh ulasan wisatawan", gradient: "from-amber-400 to-orange-500", bg: "bg-amber-50", iconColor: "text-amber-600", badgeColor: "bg-amber-100 text-amber-700", badge: "Update terbaru", progress: Math.round((avg / 5) * 100) },
      { icon: MapPin, value: kec, suffix: " Wilayah", decimals: 0, label: "Jangkauan Kecamatan", sub: "Batam & sekitarnya", gradient: "from-violet-500 to-purple-600", bg: "bg-violet-50", iconColor: "text-violet-600", badgeColor: "bg-violet-100 text-violet-700", badge: "Cakupan luas", progress: Math.min(Math.round((kec / 12) * 100), 100) },
    ];
  }, [stats]);

  return (
    <section id="statistik" ref={ref} className="py-20 lg:py-28 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFF 45%, #FFFBEB 75%, #F0F9FF 100%)" }}>
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-blue-100/30 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-amber-100/35 blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 xl:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-[3px] rounded-full bg-blue-600" />
                <div className="w-3.5 h-[3px] rounded-full bg-amber-400" />
                <div className="w-2 h-[3px] rounded-full bg-blue-200" />
              </div>
              <span className="text-blue-600 text-xs font-black uppercase tracking-[0.18em]">Statistik Platform</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black text-slate-900 leading-[1.1] tracking-tight mb-4">
              Data yang <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">Berbicara</span> Nyata
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">Ringkasan statistik pantai, kategori destinasi, dan kualitas data wisata pantai Batam.</p>
          </div>
          <div className="flex-shrink-0 flex items-center gap-3 bg-white border border-slate-100 rounded-2xl px-4 py-3 shadow-sm">
            <div className="relative">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
            </div>
            <div>
              <p className="text-slate-700 font-bold text-sm">Data Aktif</p>
              <p className="text-slate-400 text-[11px]">Siap digunakan di sistem</p>
            </div>
            <div className="ml-2 w-px h-8 bg-slate-100" />
            <a href="#statistik" className="flex items-center gap-1 text-blue-600 text-[11px] font-bold hover:text-blue-800 transition-colors">
              Selengkapnya <ChevronRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {kpiCards.map((card) => <KpiCard key={card.label} card={card} trigger={visible} />)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-blue-50 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-blue-600" /></div>
                <div><p className="text-slate-800 font-black text-sm">Kategori Destinasi</p><p className="text-slate-400 text-[11px]">Jumlah pantai per kategori</p></div>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-blue-50 text-blue-700 text-[11px] font-bold px-3 py-1.5 rounded-xl"><Activity className="w-3.5 h-3.5" />Visual Statistik</div>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats?.barKategori ?? []} margin={{ top: 4, right: 4, left: -24, bottom: 0 }} barSize={28}>
                  <XAxis dataKey="kategori" tick={{ fontSize: 10, fill: "#94A3B8", fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 9, fill: "#CBD5E1" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F8FAFC" }} />
                  <Bar dataKey="jumlah" radius={[6, 6, 0, 0]}>
                    {(stats?.barKategori ?? []).map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Sun, title: "Suasana Pantai", sub: "Distribusi kualitas", bg: "bg-amber-50", iconColor: "text-amber-500", bars: [{ label: "Sederhana", count: stats?.suasana.rendah ?? 0, color: "bg-slate-400" }, { label: "Cukup Menarik", count: stats?.suasana.cukup ?? 0, color: "bg-blue-500" }, { label: "Sangat Menarik", count: stats?.suasana.tinggi ?? 0, color: "bg-amber-500" }] },
              { icon: Building2, title: "Fasilitas", sub: "Tingkat kelengkapan", bg: "bg-emerald-50", iconColor: "text-emerald-600", bars: [{ label: "Rendah", count: stats?.fasilitas.rendah ?? 0, color: "bg-rose-400" }, { label: "Sedang", count: stats?.fasilitas.sedang ?? 0, color: "bg-blue-500" }, { label: "Lengkap", count: stats?.fasilitas.lengkap ?? 0, color: "bg-emerald-500" }] },
              { icon: TrendingUp, title: "Popularitas", sub: "Tingkat kunjungan", bg: "bg-violet-50", iconColor: "text-violet-600", bars: [{ label: "Rendah", count: stats?.popularitas.rendah ?? 0, color: "bg-slate-400" }, { label: "Sedang", count: stats?.popularitas.sedang ?? 0, color: "bg-violet-500" }, { label: "Tinggi", count: stats?.popularitas.tinggi ?? 0, color: "bg-pink-500" }] },
              { icon: MapPin, title: "Kemudahan Akses", sub: "Distribusi jalur jalan", bg: "bg-blue-50", iconColor: "text-blue-600", bars: [{ label: "Mudah", count: stats?.akses.mudah ?? 0, color: "bg-emerald-500" }, { label: "Sedang", count: stats?.akses.sedang ?? 0, color: "bg-amber-500" }, { label: "Sulit", count: stats?.akses.sulit ?? 0, color: "bg-rose-500" }] },
            ].map((card) => (
              <div key={card.title} className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-8 h-8 rounded-xl ${card.bg} flex items-center justify-center flex-shrink-0`}><card.icon className={`w-4 h-4 ${card.iconColor}`} /></div>
                  <div className="min-w-0"><p className="text-slate-800 font-black text-[11px] truncate">{card.title}</p><p className="text-slate-400 text-[9px]">{card.sub}</p></div>
                </div>
                {card.bars.map((b) => <DistBar key={b.label} label={b.label} count={b.count} total={stats?.totalBeaches ?? 0} color={b.color} />)}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-amber-50 flex items-center justify-center"><Star className="w-4 h-4 text-amber-500" /></div>
              <div><p className="text-slate-800 font-black text-sm">Rata-rata Rating per Kecamatan</p><p className="text-slate-400 text-[11px]">Perbandingan kualitas antar wilayah</p></div>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-amber-50 text-amber-700 text-[11px] font-bold px-3 py-1.5 rounded-xl">
              <MapPin className="w-3.5 h-3.5" />{stats?.totalKecamatan ?? 0} Kecamatan
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.ratingPerKecamatan ?? []} margin={{ top: 4, right: 8, left: -16, bottom: 0 }} barSize={22}>
                <XAxis dataKey="kecamatan" tick={{ fontSize: 9, fill: "#94A3B8", fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 5]} tick={{ fontSize: 9, fill: "#CBD5E1" }} axisLine={false} tickLine={false} />
                <Tooltip content={<RatingTooltip />} cursor={{ fill: "#FFFBEB" }} />
                <Bar dataKey="avgRating" radius={[6, 6, 0, 0]} fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[
            { icon: Trophy, title: "Top 5 Rating Tertinggi", sub: "Pantai dengan rating terbaik", bg: "bg-amber-50", iconColor: "text-amber-500", items: stats?.top5Rating ?? [], getValue: (b: BeachData) => b.rating, getDisplay: (b: BeachData) => b.rating.toFixed(1) + "/5", maxVal: 5, barColor: "bg-amber-400" },
            { icon: MessageCircle, title: "Top 5 Ulasan Terbanyak", sub: "Pantai paling banyak diulas", bg: "bg-blue-50", iconColor: "text-blue-500", items: stats?.top5Reviews ?? [], getValue: (b: BeachData) => b.reviews, getDisplay: (b: BeachData) => b.reviews.toLocaleString("id-ID"), maxVal: stats?.top5Reviews?.[0]?.reviews ?? 1, barColor: "bg-blue-400" },
          ].map((panel) => (
            <div key={panel.title} className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <div className={`w-9 h-9 rounded-2xl ${panel.bg} flex items-center justify-center`}><panel.icon className={`w-4 h-4 ${panel.iconColor}`} /></div>
                <div><p className="text-slate-800 font-black text-sm">{panel.title}</p><p className="text-slate-400 text-[11px]">{panel.sub}</p></div>
              </div>
              {panel.items.length > 0 ? panel.items.map((beach, i) => (
                <RankItem key={beach.id} rank={i + 1} name={beach.name} kecamatan={beach.kecamatan} displayValue={panel.getDisplay(beach)} value={panel.getValue(beach)} maxValue={panel.maxVal} barColor={panel.barColor} />
              )) : <p className="text-slate-400 text-xs text-center py-8">Memuat data...</p>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TRUST_ITEMS.map((item, i) => {
            const color = TRUST_COLORS[item.color];
            return (
              <div key={i} className={`group flex items-start gap-4 bg-white border ${color.border} rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200`}>
                <div className={`w-10 h-10 rounded-xl ${color.bg} flex items-center justify-center flex-shrink-0`}>
                  <item.icon className={`w-5 h-5 ${color.icon}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-800 font-black text-[13px] leading-snug mb-1">{item.label}</p>
                  <p className="text-slate-400 text-[11px] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
