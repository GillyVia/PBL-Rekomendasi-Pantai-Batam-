"use client";

import { useEffect, useState } from "react";
import {
    Sparkles,
    Star,
    MapPin,
    ArrowRight,
    RefreshCw,
    CheckCircle2,
    Sliders,
    Zap,
    Navigation,
    TrendingUp,
    ShieldCheck,
    Coffee,
    Car,
    Waves,
    Tent,
    Users,
    Camera,
    Heart,
    Wifi,
    ChevronRight,
    Info,
    BarChart3,
    Building2,
    Umbrella,
    Shield,
} from "lucide-react";
import { useBeachesContext } from "@/context/BeachesContext";
import type { BeachData, BeachFacility } from "@/types/beach";

type BeachResult = BeachData & { matchScore: number };

const SUASANA_OPTIONS = [
    {
        id: "rendah",
        label: "Suasana Sederhana",
        emoji: "🏖️",
        desc: "Pantai alami, tenang, belum ramai",
        color: "slate",
    },
    {
        id: "cukup",
        label: "Cukup Menarik",
        emoji: "🌊",
        desc: "Pemandangan bagus, nyaman dikunjungi",
        color: "blue",
    },
    {
        id: "tinggi",
        label: "Sangat Menarik",
        emoji: "🌟",
        desc: "Panorama indah, pemandangan terbaik",
        color: "amber",
    },
] as const;

const FASILITAS_OPTIONS = [
    { id: "toilet", label: "Toilet Bersih", icon: ShieldCheck },
    { id: "mushola", label: "Mushola", icon: Building2 },
    { id: "warung", label: "Warung Makan", icon: Coffee },
    { id: "parkir", label: "Parkir Motor", icon: Car },
    { id: "parkirMobil", label: "Parkir Mobil", icon: Car },
    { id: "gazebo", label: "Gazebo", icon: Umbrella },
    { id: "sewa", label: "Sewa Alat", icon: Waves },
    { id: "penginapan", label: "Penginapan", icon: Tent },
    { id: "wifi", label: "WiFi", icon: Wifi },
    { id: "penjagaPantai", label: "Penjaga Pantai", icon: Shield },
] as const;

const AKSES_OPTIONS = [
    { id: "mudah", label: "Mudah Dijangkau", desc: "Jalan aspal, parkir luas", icon: "🛣️" },
    { id: "sedang", label: "Perlu Usaha Sedikit", desc: "Jalan berbatu, perlu kendaraan", icon: "🚗" },
    { id: "terpencil", label: "Petualangan Ekstra", desc: "Jalur alam, perahu, trekking", icon: "🚤" },
] as const;

const POPULARITAS_OPTIONS = [
    { id: "viral", label: "Sangat Populer", desc: "Ramai dikunjungi, banyak ulasan", icon: TrendingUp, color: "rose" },
    { id: "sedang", label: "Cukup Dikenal", desc: "Seimbang antara ramai & tenang", icon: BarChart3, color: "blue" },
    { id: "tersembunyi", label: "Tersembunyi", desc: "Masih sepi, nuansa alami asli", icon: Camera, color: "emerald" },
] as const;

const SUASANA_ACTIVE: Record<string, string> = {
    slate: "border-slate-400 bg-slate-50 shadow-slate-200/60",
    blue: "border-blue-500 bg-blue-50 shadow-blue-200/60",
    amber: "border-amber-400 bg-amber-50 shadow-amber-200/60",
};

const SUASANA_TEXT: Record<string, string> = {
    slate: "text-slate-700",
    blue: "text-blue-700",
    amber: "text-amber-700",
};

const POPULARITAS_COLORS: Record<
    string,
    { active: string; text: string; icon: string }
> = {
    rose: {
        active: "border-rose-400 bg-rose-50",
        text: "text-rose-700",
        icon: "bg-rose-100 text-rose-600",
    },
    blue: {
        active: "border-blue-500 bg-blue-50",
        text: "text-blue-700",
        icon: "bg-blue-100 text-blue-600",
    },
    emerald: {
        active: "border-emerald-500 bg-emerald-50",
        text: "text-emerald-700",
        icon: "bg-emerald-100 text-emerald-600",
    },
};

const fasilitasMap: Record<string, keyof BeachFacility> = {
    toilet: "toilet",
    mushola: "mushola",
    warung: "warungMakan",
    parkir: "parkirMotor",
    parkirMobil: "parkirMobil",
    gazebo: "gazebo",
    sewa: "sewaAlat",
    penginapan: "penginapan",
    wifi: "wifi",
    penjagaPantai: "penjagaPantai",
};

function filterBeaches(
    beaches: BeachData[],
    prefs: {
        suasana: string | null;
        fasilitas: string[];
        akses: string | null;
        popularitas: string | null;
    },
): BeachResult[] {
    return beaches
        .map((beach) => {
            let matched = 0;
            let total = 0;

            if (prefs.suasana) {
                total++;
                const suasanaScore = beach.rekomendasi?.suasanaScore ?? 1;
                const targetScore: Record<string, number> = { rendah: 1, cukup: 2, tinggi: 3 };
                if (suasanaScore === (targetScore[prefs.suasana] ?? 1)) matched++;
            }

            if (prefs.fasilitas.length > 0) {
                prefs.fasilitas.forEach((f) => {
                    total++;
                    const key = fasilitasMap[f];
                    if (key && beach.fasilitas[key]) matched++;
                });
            }

            if (prefs.akses) {
                total++;
                const aksesScoreMap: Record<string, number> = { mudah: 3, sedang: 2, terpencil: 1 };
                if ((beach.rekomendasi?.aksesScore ?? 2) === aksesScoreMap[prefs.akses]) matched++;
            }

            if (prefs.popularitas) {
                total++;
                const popMap: Record<string, number> = { viral: 3, sedang: 2, tersembunyi: 1 };
                if (beach.rekomendasi?.popularitasScore === popMap[prefs.popularitas]) matched++;
            }

            const raw = total > 0 ? Math.round((matched / total) * 100) : 0;
            const label = beach.rekomendasi?.labelJ48;
            let matchScore = raw;
            if (raw > 0) {
                if (label === "sangat_direkomendasikan") matchScore = Math.min(100, raw + 15);
                else if (label === "tidak_direkomendasikan") matchScore = Math.max(0, raw - 30);
            }
            return { ...beach, matchScore };
        })
        .filter((b) => b.matchScore > 0)
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 5);
}

function StepLabel({
    num,
    label,
    filled,
}: {
    num: number;
    label: string;
    filled: boolean;
}) {
    return (
        <div className="flex items-center gap-2.5 mb-3.5">
            <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black ${filled ? "bg-blue-600 text-white shadow-md shadow-blue-300/50" : "bg-slate-100 text-slate-500"
                    }`}
            >
                {filled ? <CheckCircle2 className="w-3.5 h-3.5" /> : num}
            </div>
            <p className="text-slate-700 text-sm font-bold">{label}</p>
        </div>
    );
}

function MatchRing({ score }: { score: number }) {
    const r = 16;
    const circumference = 2 * Math.PI * r;
    const dash = (score / 100) * circumference;

    return (
        <div className="relative flex-shrink-0 w-12 h-12">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r={r} fill="none" stroke="#EFF6FF" strokeWidth="4" />
                <circle
                    cx="20"
                    cy="20"
                    r={r}
                    fill="none"
                    stroke={score >= 90 ? "#16A34A" : score >= 75 ? "#2563EB" : "#F59E0B"}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${dash} ${circumference}`}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-black text-slate-800">{score}%</span>
            </div>
        </div>
    );
}

function FeaturedResultCard({ result }: { result: BeachResult }) {
    const [liked, setLiked] = useState(false);

    return (
        <div className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl shadow-blue-900/8 hover:shadow-2xl hover:shadow-blue-900/12 transition-all duration-300">
            <div className="relative h-44 overflow-hidden">
                <img
                    src={result.image}
                    alt={result.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
                <div className="absolute top-3 left-3">
                    <span className="flex items-center gap-1 bg-amber-400 text-slate-900 text-[10px] font-black px-2.5 py-1 rounded-xl shadow-lg">
                        🏆 Rekomendasi Terbaik
                    </span>
                </div>

                <button
                    onClick={() => setLiked((v) => !v)}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-xl backdrop-blur-md flex items-center justify-center shadow-lg transition-all ${liked ? "bg-rose-500 text-white" : "bg-white/85 text-slate-500 hover:bg-white"
                        }`}
                >
                    <Heart className={`w-3.5 h-3.5 ${liked ? "fill-white" : ""}`} />
                </button>

                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                        <p className="text-white font-black text-lg leading-tight">{result.name}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-blue-300" />
                            <span className="text-white/75 text-[11px]">{result.kecamatan}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <MatchRing score={result.matchScore} />
                        <span className="text-white/60 text-[9px] mt-0.5 font-semibold">
                            Kecocokan
                        </span>
                    </div>
                </div>
            </div>

            <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                        <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star
                                    key={s}
                                    className={`w-3 h-3 ${s <= Math.floor(result.rating)
                                            ? "text-amber-400 fill-amber-400"
                                            : "text-slate-200 fill-slate-200"
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-slate-800 font-black text-sm">{result.rating}</span>
                        <span className="text-slate-400 text-[11px]">
                            ({result.reviews.toLocaleString("id-ID")} ulasan)
                        </span>
                    </div>

                    <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-xl ${result.tiketMasukRp === 0
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                : "bg-blue-50 text-blue-700 border border-blue-100"
                            }`}
                    >
                        {result.tiketMasuk}
                    </span>
                </div>

                <div className="flex items-start gap-2 bg-blue-50 rounded-2xl p-3 mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <p className="text-blue-700 text-[12px] leading-relaxed font-medium">
                        {result.deskripsiSingkat}
                    </p>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                    {result.aktivitas.slice(0, 3).map((item) => (
                        <span
                            key={item}
                            className="text-[11px] font-semibold px-2.5 py-1 rounded-xl bg-amber-50 text-amber-700 border border-amber-100"
                        >
                            {item}
                        </span>
                    ))}
                </div>

                <a
                    href="#destinasi"
                    className="group/btn w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-black shadow-md shadow-blue-300/50 transition-all duration-200"
                >
                    Lihat Detail Pantai
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                </a>
            </div>
        </div>
    );
}

function CompactResultRow({
    result,
    rank,
}: {
    result: BeachResult;
    rank: number;
}) {
    return (
        <div className="group flex items-center gap-3 bg-white rounded-2xl border border-slate-100 hover:border-blue-100 p-3 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="w-7 h-7 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-black text-slate-400">#{rank}</span>
            </div>

            <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                <img
                    src={result.image}
                    alt={result.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-slate-800 font-bold text-[13px] truncate">
                    {result.name}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400 flex-shrink-0" />
                    <span className="text-slate-600 text-[11px] font-semibold">
                        {result.rating}
                    </span>
                    <span className="text-slate-300 text-[10px]">·</span>
                    <span
                        className={`text-[10px] font-semibold ${result.tiketMasukRp === 0 ? "text-emerald-600" : "text-blue-600"
                            }`}
                    >
                        {result.tiketMasuk}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
                <span
                    className={`text-[11px] font-black px-2 py-0.5 rounded-lg ${result.matchScore >= 90 ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"
                        }`}
                >
                    {result.matchScore}%
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-400 transition-colors" />
            </div>
        </div>
    );
}

function LoadingSkeleton() {
    return (
        <div className="space-y-4">
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl">
                <div className="h-44 bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse" />
                <div className="p-4 space-y-3">
                    <div className="h-3 bg-slate-100 animate-pulse rounded-full" />
                    <div className="h-12 bg-blue-50 animate-pulse rounded-2xl" />
                    <div className="flex gap-2">
                        <div className="h-6 bg-amber-50 animate-pulse rounded-xl flex-1" />
                        <div className="h-6 bg-amber-50 animate-pulse rounded-xl flex-1" />
                        <div className="h-6 bg-amber-50 animate-pulse rounded-xl flex-1" />
                    </div>
                    <div className="h-10 bg-slate-100 animate-pulse rounded-2xl" />
                </div>
            </div>
        </div>
    );
}

function EmptyState({ filled }: { filled: number }) {
    const steps = [
        "Pilih suasana yang kamu inginkan",
        "Tentukan fasilitas prioritas",
        "Atur kemudahan akses",
        "Pilih tingkat popularitas",
    ];

    return (
        <div className="bg-gradient-to-br from-blue-50/80 via-white to-amber-50/50 rounded-3xl border border-blue-100 p-7 flex flex-col h-full min-h-[480px]">
            <div className="flex items-center justify-center mb-6">
                <div className="relative">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-2xl shadow-blue-400/40">
                        <Sparkles className="w-9 h-9 text-white" />
                    </div>
                    <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-400 border-2 border-white shadow-md flex items-center justify-center">
                        <Zap className="w-2 h-2 text-white" />
                    </div>
                </div>
            </div>

            <div className="text-center mb-6">
                <h3 className="text-slate-800 font-black text-xl mb-2 leading-snug">
                    Hasil Rekomendasi Muncul di Sini
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
                    Lengkapi kriteria lalu klik{" "}
                    <span className="text-blue-600 font-semibold">Tampilkan Rekomendasi</span>.
                </p>
            </div>

            <div className="space-y-2 mb-6">
                {steps.map((step, i) => (
                    <div
                        key={i}
                        className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl ${i < filled ? "bg-blue-50 border border-blue-100" : "bg-white border border-slate-100"
                            }`}
                    >
                        <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${i < filled ? "bg-blue-600" : "bg-slate-100"
                                }`}
                        >
                            {i < filled ? (
                                <CheckCircle2 className="w-3 h-3 text-white" />
                            ) : (
                                <span className="text-[9px] font-black text-slate-400">{i + 1}</span>
                            )}
                        </div>
                        <span
                            className={`text-xs font-semibold ${i < filled ? "text-blue-700" : "text-slate-400"
                                }`}
                        >
                            {step}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-auto">
                <p className="text-slate-400 text-[10px] uppercase tracking-[0.12em] font-bold mb-2.5 text-center">
                    Destinasi yang Mungkin Untukmu
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                    {["🏖️ Pantai Nongsa", "🤿 Pantai Melur", "🌅 Pantai Melayu", "🏕️ Pantai Sekilak"].map(
                        (tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1.5 rounded-full bg-white border border-blue-100 text-blue-700 text-[11px] font-semibold shadow-sm"
                            >
                                {tag}
                            </span>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export function RecommendationPreview() {
    const { beaches } = useBeachesContext();

    const [suasana, setSuasana] = useState<string | null>(null);
    const [fasilitas, setFasilitas] = useState<string[]>([]);
    const [akses, setAkses] = useState<string | null>(null);
    const [popularitas, setPopularitas] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [loadingDots, setLoadingDots] = useState(0);
    const [results, setResults] = useState<BeachResult[]>([]);

    const filledCount = [!!suasana, fasilitas.length > 0, !!akses, !!popularitas].filter(Boolean).length;
    const canSubmit = filledCount >= 2;

    useEffect(() => {
        if (!loading) return;
        const timer = setInterval(() => {
            setLoadingDots((d) => (d + 1) % 4);
        }, 380);

        return () => clearInterval(timer);
    }, [loading]);

    const toggleFasilitas = (id: string) => {
        setFasilitas((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleGenerate = () => {
        if (!canSubmit) return;

        setLoading(true);
        setShowResults(false);

        setTimeout(() => {
            const filtered = filterBeaches(beaches, { suasana, fasilitas, akses, popularitas });
            setResults(filtered);
            setLoading(false);
            setShowResults(true);
        }, 600);
    };

    const handleReset = () => {
        setShowResults(false);
        setSuasana(null);
        setFasilitas([]);
        setAkses(null);
        setPopularitas(null);
        setResults([]);
    };

    return (
        <section
            id="rekomendasi"
            className="py-20 lg:py-28 relative overflow-hidden"
            style={{
                background:
                    "linear-gradient(160deg, #EFF6FF 0%, #F8FAFF 35%, #FFFBEB 75%, #F0F9FF 100%)",
            }}
        >
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-blue-200/25 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-amber-200/30 blur-3xl pointer-events-none" />

            <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 xl:px-8">
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2.5 bg-white border border-blue-100 rounded-full px-5 py-2 mb-5 shadow-sm">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                            <Sparkles className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-blue-700 text-sm font-bold">
                            Sistem Rekomendasi Pantai
                        </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-slate-900 leading-[1.1] tracking-tight mb-4">
                        Pantai yang{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">
                            Tepat
                        </span>{" "}
                        untuk{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                            Kamu
                        </span>
                    </h2>

                    <p className="text-slate-500 text-base max-w-xl mx-auto leading-relaxed">
                        Isi preferensimu, lalu tampilkan rekomendasi pantai yang paling cocok.
                    </p>
                </div>

                <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-8 items-start">
                    <div className="bg-white rounded-[28px] border border-slate-100 shadow-xl shadow-blue-900/6 overflow-hidden">
                        <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md shadow-blue-300/40">
                                    <Sliders className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-slate-900 font-black text-base">
                                        Preferensi Perjalananmu
                                    </p>
                                    <p className="text-slate-400 text-[11px]">
                                        {filledCount} dari 4 kriteria terisi
                                    </p>
                                </div>
                            </div>

                            {filledCount > 0 && (
                                <button
                                    onClick={handleReset}
                                    className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-slate-600 font-semibold transition-colors px-2.5 py-1.5 rounded-xl hover:bg-slate-50"
                                >
                                    <RefreshCw className="w-3 h-3" />
                                    Ulangi
                                </button>
                            )}
                        </div>

                        <div className="h-1 bg-slate-50">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-amber-400 transition-all duration-500 rounded-full"
                                style={{ width: `${(filledCount / 4) * 100}%` }}
                            />
                        </div>

                        <div className="p-6 space-y-7">
                            <div>
                                <StepLabel num={1} label="Suasana yang kamu inginkan" filled={!!suasana} />
                                <div className="grid grid-cols-3 gap-2.5">
                                    {SUASANA_OPTIONS.map((opt) => {
                                        const isActive = suasana === opt.id;
                                        return (
                                            <button
                                                key={opt.id}
                                                onClick={() => setSuasana(opt.id)}
                                                className={`relative p-3.5 rounded-2xl border-2 text-left transition-all duration-200 ${isActive
                                                        ? `${SUASANA_ACTIVE[opt.color]} shadow-md`
                                                        : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                                                    }`}
                                            >
                                                {isActive && (
                                                    <CheckCircle2
                                                        className={`absolute top-2.5 right-2.5 w-4 h-4 ${SUASANA_TEXT[opt.color]}`}
                                                    />
                                                )}
                                                <span className="text-2xl block mb-1.5 leading-none">{opt.emoji}</span>
                                                <p
                                                    className={`text-[12px] font-bold leading-snug mb-0.5 ${isActive ? SUASANA_TEXT[opt.color] : "text-slate-700"
                                                        }`}
                                                >
                                                    {opt.label}
                                                </p>
                                                <p className="text-[10px] text-slate-400 leading-tight">{opt.desc}</p>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <StepLabel num={2} label="Fasilitas yang kamu butuhkan" filled={fasilitas.length > 0} />
                                <p className="text-slate-400 text-[11px] mb-3 -mt-2">
                                    Pilih satu atau lebih fasilitas
                                </p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {FASILITAS_OPTIONS.map((opt) => {
                                        const Icon = opt.icon;
                                        const isActive = fasilitas.includes(opt.id);

                                        return (
                                            <button
                                                key={opt.id}
                                                onClick={() => toggleFasilitas(opt.id)}
                                                className={`flex items-center gap-2.5 px-3.5 py-3 rounded-2xl border-2 transition-all duration-200 ${isActive
                                                        ? "border-blue-500 bg-blue-50 shadow-sm shadow-blue-200/50"
                                                        : "border-slate-100 hover:border-blue-200 hover:bg-blue-50/40"
                                                    }`}
                                            >
                                                <div
                                                    className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 ${isActive ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                                                        }`}
                                                >
                                                    <Icon className="w-3.5 h-3.5" />
                                                </div>
                                                <span
                                                    className={`text-[12px] font-semibold ${isActive ? "text-blue-700" : "text-slate-600"
                                                        }`}
                                                >
                                                    {opt.label}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <StepLabel num={3} label="Kemudahan akses lokasi" filled={!!akses} />
                                <div className="grid grid-cols-3 gap-2.5">
                                    {AKSES_OPTIONS.map((opt) => {
                                        const isActive = akses === opt.id;

                                        return (
                                            <button
                                                key={opt.id}
                                                onClick={() => setAkses(opt.id)}
                                                className={`flex flex-col items-center text-center p-3.5 rounded-2xl border-2 transition-all duration-200 ${isActive
                                                        ? "border-blue-500 bg-blue-50 shadow-md shadow-blue-200/50"
                                                        : "border-slate-100 hover:border-blue-200 hover:bg-blue-50/40"
                                                    }`}
                                            >
                                                <span className="text-2xl mb-1.5 leading-none">{opt.icon}</span>
                                                <p
                                                    className={`text-[11px] font-bold leading-tight mb-0.5 ${isActive ? "text-blue-700" : "text-slate-700"
                                                        }`}
                                                >
                                                    {opt.label}
                                                </p>
                                                <p className="text-[9px] text-slate-400 leading-tight">{opt.desc}</p>
                                                {isActive && <Navigation className="w-3.5 h-3.5 text-blue-500 mt-1.5" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <StepLabel num={4} label="Tingkat popularitas pantai" filled={!!popularitas} />
                                <div className="space-y-2">
                                    {POPULARITAS_OPTIONS.map((opt) => {
                                        const Icon = opt.icon;
                                        const isActive = popularitas === opt.id;
                                        const col = POPULARITAS_COLORS[opt.color];

                                        return (
                                            <button
                                                key={opt.id}
                                                onClick={() => setPopularitas(opt.id)}
                                                className={`w-full flex items-center gap-3.5 p-3.5 rounded-2xl border-2 text-left transition-all duration-200 ${isActive
                                                        ? `${col.active} shadow-sm`
                                                        : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                                                    }`}
                                            >
                                                <div
                                                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${isActive ? col.icon : "bg-slate-100 text-slate-400"
                                                        }`}
                                                >
                                                    <Icon className="w-4 h-4" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className={`text-sm font-bold ${isActive ? col.text : "text-slate-700"}`}>
                                                        {opt.label}
                                                    </p>
                                                    <p className="text-[11px] text-slate-400 leading-snug">{opt.desc}</p>
                                                </div>
                                                {isActive && <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${col.text}`} />}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="pt-1">
                                {!canSubmit && (
                                    <div className="flex items-center gap-2 mb-3 px-1">
                                        <Info className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                                        <p className="text-amber-600 text-[11px] font-medium">
                                            Pilih minimal 2 kriteria untuk mendapatkan rekomendasi.
                                        </p>
                                    </div>
                                )}

                                <button
                                    onClick={handleGenerate}
                                    disabled={!canSubmit || loading}
                                    className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-sm font-black transition-all duration-300 ${canSubmit && !loading
                                            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl shadow-blue-400/35 hover:from-blue-700 hover:to-blue-800"
                                            : "bg-slate-100 text-slate-400 cursor-not-allowed"
                                        }`}
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                            <span>Mencari pantai terbaik{".".repeat(loadingDots + 1)}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-4 h-4" />
                                            Tampilkan Rekomendasi
                                            {filledCount > 0 && (
                                                <span className="bg-white/20 text-white text-[10px] font-black px-2 py-0.5 rounded-lg">
                                                    {filledCount}/4
                                                </span>
                                            )}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="lg:sticky lg:top-24">
                        {loading ? (
                            <LoadingSkeleton />
                        ) : showResults ? (
                            results.length === 0 ? (
                                <div className="bg-white rounded-3xl border border-slate-100 p-8 text-center shadow-sm">
                                    <p className="text-slate-700 font-bold mb-1">Tidak ada pantai yang cocok</p>
                                    <p className="text-slate-400 text-sm">
                                        Coba ubah beberapa kriteria preferensimu.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between px-1">
                                        <div>
                                            <p className="text-slate-900 font-black">Hasil Rekomendasi</p>
                                            <p className="text-slate-400 text-[11px] mt-0.5">
                                                Ditemukan{" "}
                                                <span className="text-blue-600 font-bold">{results.length} pantai</span>{" "}
                                                paling cocok
                                            </p>
                                        </div>
                                        <button
                                            onClick={handleReset}
                                            className="flex items-center gap-1.5 text-[11px] text-blue-600 font-bold hover:text-blue-800 transition-colors px-3 py-1.5 rounded-xl hover:bg-blue-50"
                                        >
                                            <RefreshCw className="w-3 h-3" />
                                            Cari Ulang
                                        </button>
                                    </div>

                                    <FeaturedResultCard result={results[0]} />

                                    {results.length > 1 && (
                                        <>
                                            <div className="flex items-center gap-2 px-1">
                                                <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                                <span className="text-slate-400 text-[10px] uppercase tracking-[0.12em] font-bold">
                                                    Rekomendasi Lainnya
                                                </span>
                                            </div>

                                            {results.slice(1).map((r, i) => (
                                                <CompactResultRow key={r.id} result={r} rank={i + 2} />
                                            ))}
                                        </>
                                    )}

                                    <a
                                        href="#destinasi"
                                        className="group w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-blue-100 hover:border-blue-200 hover:bg-blue-50 text-blue-700 text-sm font-bold transition-all duration-200"
                                    >
                                        <Users className="w-4 h-4" />
                                        Lihat Semua Rekomendasi
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                    </a>
                                </div>
                            )
                        ) : (
                            <EmptyState filled={filledCount} />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}