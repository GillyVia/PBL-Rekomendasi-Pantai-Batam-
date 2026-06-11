"use client";

import Link from "next/link";
import {
  Umbrella,
  MapPin,
  BarChart3,
  Star,
  TrendingUp,
  Plus,
  ArrowRight,
  Waves,
} from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";

export default function DasborPage() {
  const { beaches, isLoading } = useAdminData();

  const totalBeaches = beaches.length;
  const kecamatanSet = new Set(beaches.map((b) => b.kecamatan));
  const totalKecamatan = kecamatanSet.size;
  const avgRating =
    totalBeaches > 0
      ? (
          beaches.reduce((sum, b) => sum + b.rating, 0) / totalBeaches
        ).toFixed(1)
      : "0.0";
  const trendingCount = beaches.filter((b) => b.trending).length;

  const statCards = [
    {
      label: "Total Pantai",
      value: isLoading ? "..." : String(totalBeaches),
      icon: Umbrella,
      color: "blue",
      href: "/admin/pantai",
    },
    {
      label: "Kecamatan",
      value: isLoading ? "..." : String(totalKecamatan),
      icon: MapPin,
      color: "emerald",
      href: "/admin/lokasi",
    },
    {
      label: "Rating Rata-rata",
      value: isLoading ? "..." : avgRating,
      icon: Star,
      color: "amber",
      href: "/admin/statistik",
    },
    {
      label: "Sedang Trending",
      value: isLoading ? "..." : String(trendingCount),
      icon: TrendingUp,
      color: "rose",
      href: "/admin/statistik",
    },
  ];

  const colorMap = {
    blue: {
      bg: "bg-blue-500/10",
      icon: "text-blue-400",
      border: "border-blue-500/20",
    },
    emerald: {
      bg: "bg-emerald-500/10",
      icon: "text-emerald-400",
      border: "border-emerald-500/20",
    },
    amber: {
      bg: "bg-amber-500/10",
      icon: "text-amber-400",
      border: "border-amber-500/20",
    },
    rose: {
      bg: "bg-rose-500/10",
      icon: "text-rose-400",
      border: "border-rose-500/20",
    },
  } as const;

  const quickLinks = [
    {
      href: "/admin/pantai",
      label: "Kelola Data Pantai",
      desc: "Lihat, edit, dan hapus data pantai",
      icon: Umbrella,
    },
    {
      href: "/admin/pantai/tambah",
      label: "Tambah Pantai Baru",
      desc: "Daftarkan destinasi pantai baru",
      icon: Plus,
    },
    {
      href: "/admin/lokasi",
      label: "Kelola Lokasi & Peta",
      desc: "Update koordinat dan akses jalan",
      icon: MapPin,
    },
    {
      href: "/admin/statistik",
      label: "Statistik & Skor",
      desc: "Rating, popularitas, dan fasilitas",
      icon: BarChart3,
    },
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2.5">
          <Waves className="h-6 w-6 text-blue-400" />
          <h1 className="text-2xl font-black text-white">Dasbor Admin</h1>
        </div>
        <p className="mt-1 text-sm text-slate-400">
          Selamat datang di panel admin BatamPantai.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          const c = colorMap[card.color];
          return (
            <Link
              key={card.label}
              href={card.href}
              className={`group rounded-2xl border ${c.border} bg-slate-900 p-5 transition-all hover:border-slate-600`}
            >
              <div
                className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${c.bg}`}
              >
                <Icon className={`h-5 w-5 ${c.icon}`} />
              </div>
              <p className="text-2xl font-black text-white">{card.value}</p>
              <p className="mt-0.5 text-xs text-slate-400">{card.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">
          Menu Cepat
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center gap-4 rounded-2xl border border-slate-700/50 bg-slate-900 p-5 transition-all hover:border-blue-500/40 hover:bg-slate-800"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
                  <Icon className="h-5 w-5 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white">{link.label}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{link.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 flex-shrink-0 text-slate-600 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-400" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
