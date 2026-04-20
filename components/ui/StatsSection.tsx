"use client";

import { useEffect, useRef, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Waves,
  Star,
  MapPin,
  TrendingUp,
  Shield,
  Clock,
  Award,
  BarChart3,
  Activity,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

function useCountUp(
  target: number,
  duration = 1800,
  trigger = false,
  decimals = 0
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = eased * target;

      if (decimals > 0) {
        setCount(Math.round(value * 10) / 10);
      } else {
        setCount(Math.floor(value));
      }

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, trigger, decimals]);

  return count;
}

const KPI_CARDS = [
  {
    icon: Waves,
    value: 45,
    suffix: "+",
    decimals: 0,
    label: "Destinasi Pantai",
    sub: "Terkurasi & terverifikasi",
    gradient: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
    badgeColor: "bg-blue-100 text-blue-700",
    badge: "+8 bulan ini",
    progress: 90,
  },
  {
    icon: Star,
    value: 4.9,
    suffix: "/5",
    decimals: 1,
    label: "Rating Rata-rata",
    sub: "Dari 2.800+ ulasan nyata",
    gradient: "from-amber-400 to-orange-500",
    bg: "bg-amber-50",
    iconColor: "text-amber-600",
    badgeColor: "bg-amber-100 text-amber-700",
    badge: "Tertinggi 2025",
    progress: 98,
  },
  {
    icon: MapPin,
    value: 12,
    suffix: " Wilayah",
    decimals: 0,
    label: "Jangkauan Kecamatan",
    sub: "Batam & sekitarnya",
    gradient: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
    iconColor: "text-violet-600",
    badgeColor: "bg-violet-100 text-violet-700",
    badge: "+2 wilayah baru",
    progress: 60,
  },
] as const;

const BAR_KATEGORI = [
  { kategori: "Keluarga", jumlah: 18, fill: "#3B82F6" },
  { kategori: "Sunset", jumlah: 15, fill: "#F59E0B" },
  { kategori: "Snorkeling", jumlah: 12, fill: "#06B6D4" },
  { kategori: "Tersembunyi", jumlah: 9, fill: "#10B981" },
  { kategori: "Camping", jumlah: 7, fill: "#8B5CF6" },
  { kategori: "Fotografi", jumlah: 11, fill: "#EC4899" },
];

const TRUST_ITEMS = [
  {
    icon: Shield,
    label: "Terverifikasi Tim Lokal",
    desc: "Setiap pantai dicek langsung oleh kurator.",
    color: "blue",
  },
  {
    icon: Clock,
    label: "Diperbarui Berkala",
    desc: "Informasi pantai, fasilitas, dan akses diperbarui.",
    color: "emerald",
  },
  {
    icon: Award,
    label: "Kurasi Destinasi",
    desc: "Pantai dipilih berdasarkan kualitas dan ulasan wisatawan.",
    color: "amber",
  },
  {
    icon: TrendingUp,
    label: "Data Semakin Bertambah",
    desc: "Jumlah data dan destinasi terus berkembang.",
    color: "violet",
  },
] as const;

const TRUST_COLORS: Record<
  string,
  { bg: string; icon: string; border: string }
> = {
  blue: {
    bg: "bg-blue-50",
    icon: "text-blue-600",
    border: "border-blue-100",
  },
  emerald: {
    bg: "bg-emerald-50",
    icon: "text-emerald-600",
    border: "border-emerald-100",
  },
  amber: {
    bg: "bg-amber-50",
    icon: "text-amber-600",
    border: "border-amber-100",
  },
  violet: {
    bg: "bg-violet-50",
    icon: "text-violet-600",
    border: "border-violet-100",
  },
};

function KpiCard({
  card,
  trigger,
}: {
  card: (typeof KPI_CARDS)[number];
  trigger: boolean;
}) {
  const count = useCountUp(card.value, 1800, trigger, card.decimals);

  const display =
    card.decimals > 0 ? count.toFixed(1) : Math.floor(count).toLocaleString("id-ID");

  return (
    <div className="group relative bg-white rounded-[24px] p-5 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div
        className={`absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${card.gradient} opacity-[0.07]`}
      />
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-11 h-11 rounded-2xl ${card.bg} flex items-center justify-center`}
          >
            <card.icon className={`w-5 h-5 ${card.iconColor}`} />
          </div>
          <span
            className={`text-[10px] font-black px-2.5 py-1 rounded-xl ${card.badgeColor} flex items-center gap-1`}
          >
            <ArrowUpRight className="w-2.5 h-2.5" />
            {card.badge}
          </span>
        </div>

        <div
          className={`text-[2rem] font-black leading-none bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent mb-1 tracking-tight`}
        >
          {display}
          <span className="text-2xl">{card.suffix}</span>
        </div>

        <p className="text-slate-800 font-bold text-sm mb-0.5">{card.label}</p>
        <p className="text-slate-400 text-[11px] mb-4">{card.sub}</p>

        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${card.gradient} transition-all duration-[1200ms] ease-out`}
            style={{ width: trigger ? `${card.progress}%` : "0%" }}
          />
        </div>

        <div className="flex items-center justify-between mt-1.5">
          <span className="text-slate-300 text-[10px]">Capaian</span>
          <span className="text-slate-500 text-[10px] font-bold">
            {card.progress}%
          </span>
        </div>
      </div>
    </div>
  );
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; payload: { fill: string } }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xl px-4 py-3 text-xs">
      <p className="text-slate-500 font-semibold mb-1">{label}</p>
      <div className="flex items-center gap-2">
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: payload[0].payload.fill }}
        />
        <span className="text-slate-600">Jumlah:</span>
        <span className="text-slate-900 font-black">{payload[0].value}</span>
      </div>
    </div>
  );
}

export function StatsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="statistik"
      ref={ref}
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #FFFFFF 0%, #F8FAFF 45%, #FFFBEB 75%, #F0F9FF 100%)",
      }}
    >
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
              <span className="text-blue-600 text-xs font-black uppercase tracking-[0.18em]">
                Statistik Platform
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black text-slate-900 leading-[1.1] tracking-tight mb-4">
              Data yang{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">
                Berbicara
              </span>{" "}
              Nyata
            </h2>

            <p className="text-slate-500 text-base leading-relaxed">
              Ringkasan statistik pantai, kategori destinasi, dan kualitas data
              wisata pantai Batam.
            </p>
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
            <a
              href="#statistik"
              className="flex items-center gap-1 text-blue-600 text-[11px] font-bold hover:text-blue-800 transition-colors"
            >
              Selengkapnya <ChevronRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {KPI_CARDS.map((card) => (
            <KpiCard key={card.label} card={card} trigger={visible} />
          ))}
        </div>

        <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-blue-50 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-slate-800 font-black text-sm">
                  Kategori Destinasi
                </p>
                <p className="text-slate-400 text-[11px]">
                  Jumlah pantai berdasarkan kategori
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 bg-blue-50 text-blue-700 text-[11px] font-bold px-3 py-1.5 rounded-xl">
              <Activity className="w-3.5 h-3.5" />
              Visual Statistik
            </div>
          </div>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={BAR_KATEGORI}
                margin={{ top: 4, right: 4, left: -24, bottom: 0 }}
                barSize={28}
              >
                <XAxis
                  dataKey="kategori"
                  tick={{ fontSize: 10, fill: "#94A3B8", fontWeight: 600 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 9, fill: "#CBD5E1" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F8FAFC" }} />
                <Bar dataKey="jumlah" radius={[6, 6, 0, 0]}>
                  {BAR_KATEGORI.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TRUST_ITEMS.map((item, i) => {
            const color = TRUST_COLORS[item.color];
            return (
              <div
                key={i}
                className={`group flex items-start gap-4 bg-white border ${color.border} rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200`}
              >
                <div
                  className={`w-10 h-10 rounded-xl ${color.bg} flex items-center justify-center flex-shrink-0`}
                >
                  <item.icon className={`w-4.5 h-4.5 ${color.icon}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-800 font-black text-[13px] leading-snug mb-1">
                    {item.label}
                  </p>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}