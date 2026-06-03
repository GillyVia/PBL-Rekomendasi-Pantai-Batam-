"use client";

import { useState, type ElementType } from "react";
import {
  X,
  MapPin,
  Clock,
  Star,
  Navigation,
  Check,
  ExternalLink,
  Heart,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Award,
  Lightbulb,
  CheckCircle2,
  Ticket,
  Route,
  Waves,
  Coffee,
  Car,
  Shield,
  Users,
  Umbrella,
  Wrench,
  Home,
  Wifi,
  ShieldCheck,
} from "lucide-react";
import type { BeachData } from "@/types/beach";

interface BeachDetailProps {
  beach: BeachData;
  onClose: () => void;
}

const FASILITAS_ICONS: Record<keyof BeachData["fasilitas"], ElementType> = {
  toilet: ShieldCheck,
  mushola: Users,
  warungMakan: Coffee,
  parkirMotor: Car,
  parkirMobil: Car,
  gazebo: Umbrella,
  sewaAlat: Wrench,
  penginapan: Home,
  wifi: Wifi,
  penjagaPantai: Shield,
};

const FASILITAS_LABELS: Record<keyof BeachData["fasilitas"], string> = {
  toilet: "Toilet Bersih",
  mushola: "Mushola",
  warungMakan: "Warung Makan",
  parkirMotor: "Parkir Motor",
  parkirMobil: "Parkir Mobil",
  gazebo: "Gazebo",
  sewaAlat: "Sewa Alat",
  penginapan: "Penginapan",
  wifi: "WiFi",
  penjagaPantai: "Penjaga Pantai",
};

const AKSES_LABEL: Record<BeachData["aksesJalan"], string> = {
  mudah: "Mudah",
  sedang: "Sedang",
  sulit: "Tantangan",
};

const AKSES_STYLE: Record<BeachData["aksesJalan"], { text: string; bg: string; border: string }> = {
  mudah: { text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" },
  sedang: { text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" },
  sulit: { text: "text-rose-700", bg: "bg-rose-50", border: "border-rose-200" },
};

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`h-4 w-4 ${
            s <= Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : s - 0.5 <= rating
                ? "fill-amber-400 text-amber-400 opacity-50"
                : "fill-slate-200 text-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

function SectionLabel({ icon: Icon, label, accent = "blue" }: { icon: ElementType; label: string; accent?: "blue" | "amber" | "emerald" | "slate" }) {
  const styles = {
    blue: { box: "bg-blue-50", icon: "text-blue-600" },
    amber: { box: "bg-amber-50", icon: "text-amber-500" },
    emerald: { box: "bg-emerald-50", icon: "text-emerald-600" },
    slate: { box: "bg-slate-100", icon: "text-slate-500" },
  };
  const s = styles[accent];
  return (
    <div className="mb-3.5 flex items-center gap-2.5">
      <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl ${s.box}`}>
        <Icon className={`h-3.5 w-3.5 ${s.icon}`} />
      </div>
      <h3 className="text-[14px] font-black tracking-tight text-slate-800">{label}</h3>
    </div>
  );
}

function Divider() {
  return <div className="my-5 h-px bg-slate-100" />;
}

export function BeachDetail({ beach, onClose }: BeachDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const images = beach.imageGallery?.length ? beach.imageGallery : [beach.image];
  const facilityKeys = Object.keys(beach.fasilitas) as (keyof typeof beach.fasilitas)[];
  const aksesStyle = AKSES_STYLE[beach.aksesJalan];

  return (
    <>
      <div className="animate-fadeIn fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} />

      <div className="pointer-events-none fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-3 pt-6 sm:p-5 sm:pt-10">
        <div
          className="animate-slideUp pointer-events-auto relative mb-8 w-full max-w-[960px] overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-900/30"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-72 flex-shrink-0 overflow-hidden bg-slate-100 sm:h-[300px]">
            <img src={images[currentImageIndex]} alt={beach.name} className="h-full w-full object-cover transition-opacity duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-amber-900/20 to-transparent" />

            {images.length > 1 && (
              <>
                <button onClick={() => setCurrentImageIndex((p) => (p - 1 + images.length) % images.length)} className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl bg-white/90 text-slate-800 shadow-lg backdrop-blur-sm transition-all hover:bg-white" aria-label="Foto sebelumnya">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button onClick={() => setCurrentImageIndex((p) => (p + 1) % images.length)} className="absolute right-16 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl bg-white/90 text-slate-800 shadow-lg backdrop-blur-sm transition-all hover:bg-white" aria-label="Foto berikutnya">
                  <ChevronRight className="h-4 w-4" />
                </button>
                <div className="absolute bottom-14 left-1/2 flex -translate-x-1/2 gap-1.5">
                  {images.map((_, idx) => (
                    <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? "w-5 bg-white" : "w-1.5 bg-white/45 hover:bg-white/65"}`} />
                  ))}
                </div>
              </>
            )}

            <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-black text-white shadow-lg backdrop-blur-sm" style={{ background: beach.badgeColor }}>
              <Award className="h-3 w-3 flex-shrink-0" />
              {beach.badge}
            </div>

            <div className="absolute right-4 top-4 flex gap-1.5">
              <button onClick={() => setSaved(!saved)} className={`flex h-9 w-9 items-center justify-center rounded-xl shadow-lg backdrop-blur-md transition-all duration-200 active:scale-90 ${saved ? "bg-blue-500 text-white" : "bg-white/90 text-slate-600 hover:bg-white"}`} title="Simpan">
                <Bookmark className={`h-3.5 w-3.5 ${saved ? "fill-white" : ""}`} />
              </button>
              <button onClick={() => setLiked(!liked)} className={`flex h-9 w-9 items-center justify-center rounded-xl shadow-lg backdrop-blur-md transition-all duration-200 active:scale-90 ${liked ? "bg-rose-500 text-white" : "bg-white/90 text-slate-600 hover:bg-white"}`} title="Suka">
                <Heart className={`h-3.5 w-3.5 ${liked ? "fill-white" : ""}`} />
              </button>
              <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900/80 text-white shadow-lg backdrop-blur-md transition-all duration-200 active:scale-90 hover:bg-slate-900" title="Tutup">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/60 to-transparent px-6 pb-5 pt-8">
              <h2 className="mb-1.5 text-2xl font-black leading-tight text-white sm:text-[28px]">{beach.name}</h2>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-blue-300" />
                  <span className="text-[13px] text-white/80">Kec. {beach.kecamatan} · {beach.kelurahan}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <StarRow rating={beach.rating} />
                  <span className="text-[13px] font-black text-white">{beach.rating}</span>
                  <span className="text-[11px] text-white/55">({beach.reviews.toLocaleString("id-ID")} ulasan)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 border-b border-slate-100 bg-slate-50/60 sm:grid-cols-4">
            {[
              { icon: Ticket, label: "Tiket Masuk", value: beach.tiketMasuk, valueClass: beach.tiketMasukRp === 0 ? "text-emerald-600" : "text-blue-600", bgClass: beach.tiketMasukRp === 0 ? "bg-emerald-100/70" : "bg-blue-100/70", border: "border-r border-slate-100" },
              { icon: Navigation, label: "Jarak", value: `${beach.jarakDariKota} km`, valueClass: "text-blue-600", bgClass: "bg-blue-100/70", border: "border-r border-slate-100 sm:border-r" },
              { icon: Clock, label: "Jam Buka", value: beach.jamBuka, valueClass: "text-amber-600", bgClass: "bg-amber-100/70", border: "border-r border-slate-100" },
              { icon: Route, label: "Akses Jalan", value: AKSES_LABEL[beach.aksesJalan], valueClass: aksesStyle.text, bgClass: aksesStyle.bg, border: "" },
            ].map((item, i) => (
              <div key={i} className={`flex flex-col items-center justify-center gap-1.5 px-3 py-4 text-center ${item.border}`}>
                <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${item.bgClass}`}>
                  <item.icon className={`h-4 w-4 ${item.valueClass}`} />
                </div>
                <p className={`text-[13px] font-black leading-tight ${item.valueClass}`}>{item.value}</p>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="max-h-[65vh] overflow-y-auto overscroll-contain">
            <div className="grid divide-slate-100 lg:grid-cols-[1fr_340px] lg:divide-x">
              <div className="p-5 sm:p-6">
                <div className="mb-5 inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-amber-500" />
                  <span className="text-[13px] font-bold text-amber-800">{beach.highlight}</span>
                </div>

                <SectionLabel icon={Waves} label="Tentang Pantai Ini" accent="blue" />
                <p className="mb-3 text-[13.5px] font-semibold leading-[1.7] text-slate-800">{beach.deskripsiSingkat}</p>
                <div className="space-y-3">
                  {beach.deskripsiLengkap.split("\n\n").map((para, i) => (
                    <p key={i} className="text-[13px] leading-[1.75] text-slate-600">{para.trim()}</p>
                  ))}
                </div>

                <Divider />

                <SectionLabel icon={Award} label="Keunggulan Utama" accent="amber" />
                <div className="grid gap-2 sm:grid-cols-2">
                  {beach.kelebihanUtama.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 rounded-xl border border-blue-100 bg-blue-50/70 px-3 py-2.5">
                      <div className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                        <Check className="h-2.5 w-2.5 text-blue-600" />
                      </div>
                      <span className="text-[12.5px] font-medium leading-snug text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>

                <Divider />

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <SectionLabel icon={Star} label="Aktivitas" accent="blue" />
                    <div className="flex flex-wrap gap-1.5">
                      {beach.aktivitas.map((a) => (
                        <span key={a} className="rounded-lg bg-blue-600 px-2.5 py-1.5 text-[11px] font-bold text-white shadow-sm">{a}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <SectionLabel icon={Users} label="Cocok Untuk" accent="emerald" />
                    <div className="flex flex-wrap gap-1.5">
                      {beach.cocokUntuk.map((c) => (
                        <span key={c} className="rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-[11px] font-bold text-emerald-700">{c}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <Divider />

                <SectionLabel icon={Lightbulb} label="Tips Kunjungan" accent="amber" />
                <div className="space-y-2.5">
                  {beach.tipsKunjungan.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3">
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-400 text-[10px] font-black leading-none text-white">{idx + 1}</span>
                      <p className="flex-1 text-[12.5px] text-slate-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 sm:p-6 lg:p-5">
                <SectionLabel icon={MapPin} label="Lokasi & Alamat" accent="blue" />
                <div className="mb-3 space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                    <span className="text-[11px] font-semibold text-slate-500">Kec. {beach.kecamatan} · Kel. {beach.kelurahan}</span>
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-400">Alamat Lengkap</p>
                    <p className="text-[12.5px] font-medium leading-relaxed text-slate-800">{beach.alamatLengkap}</p>
                  </div>
                  <div className="h-px bg-slate-200" />
                  <div className="flex items-center gap-2">
                    <Navigation className="h-3 w-3 flex-shrink-0 text-blue-500" />
                    <span className="text-[12px] font-medium text-slate-600">{beach.jarakLabel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 flex-shrink-0 text-slate-400" />
                    <code className="font-mono text-[11px] text-slate-500">
                      {beach.koordinat.lat.toFixed(5)}, {beach.koordinat.lng.toFixed(5)}
                    </code>
                  </div>
                </div>

                <div className="relative mb-3 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100" style={{ height: 220 }}>
                  <iframe
                    src={`https://maps.google.com/maps?q=${beach.koordinat.lat},${beach.koordinat.lng}&z=15&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Peta ${beach.name}`}
                  />
                </div>

                <a href={beach.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="mb-1 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-[12.5px] font-black text-white shadow-md shadow-blue-300/35 transition-all duration-200 hover:bg-blue-700 active:scale-[0.98]">
                  <ExternalLink className="h-3.5 w-3.5" />
                  Buka di Google Maps
                </a>

                <Divider />

                <SectionLabel icon={Shield} label="Fasilitas" accent="emerald" />
                <div className="grid grid-cols-2 gap-1.5">
                  {facilityKeys.map((key) => {
                    const available = beach.fasilitas[key];
                    const Icon = FASILITAS_ICONS[key];
                    return (
                      <div key={key} className={`flex items-center gap-2 rounded-xl px-2.5 py-1.5 ${available ? "border border-emerald-100 bg-emerald-50" : "border border-slate-100 bg-slate-50"}`}>
                        <Icon className={`h-3 w-3 flex-shrink-0 ${available ? "text-emerald-500" : "text-slate-300"}`} />
                        <span className={`flex-1 text-[11px] font-medium leading-tight ${available ? "text-slate-700" : "text-slate-300"}`}>{FASILITAS_LABELS[key]}</span>
                        {available ? <Check className="h-2.5 w-2.5 flex-shrink-0 text-emerald-500" /> : <X className="h-2.5 w-2.5 flex-shrink-0 text-slate-300" />}
                      </div>
                    );
                  })}
                </div>

                <Divider />

                <p className="mb-2.5 text-[10px] font-black uppercase tracking-widest text-slate-400">Kategori</p>
                <div className="flex flex-wrap gap-1.5">
                  {beach.kategori.map((k) => (
                    <span key={k} className="rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">{k}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 border-t border-slate-100 bg-slate-50/40 p-5 sm:flex-row sm:p-6">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${beach.koordinat.lat},${beach.koordinat.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-3.5 text-[13px] font-black text-white shadow-lg shadow-blue-300/35 transition-all duration-200 hover:from-blue-700 hover:to-blue-800 active:scale-[0.98]"
              >
                <Navigation className="h-4 w-4 flex-shrink-0" />
                Petunjuk Rute ke Sini
              </a>
              <button onClick={onClose} className="rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-[13px] font-bold text-slate-700 transition-all duration-200 hover:bg-slate-50 active:scale-[0.98] sm:w-32">
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(28px) scale(0.99); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.18s ease-out; }
        .animate-slideUp { animation: slideUp 0.26s cubic-bezier(0.34, 1.1, 0.64, 1); }
      `}</style>
    </>
  );
}
