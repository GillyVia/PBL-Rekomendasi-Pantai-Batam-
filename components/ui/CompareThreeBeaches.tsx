"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode, type RefObject } from "react";
import {
    Star,
    MapPin,
    Clock,
    ChevronDown,
    Award,
    Check,
    X,
    Waves,
    Shield,
    Coffee,
    Car,
    Users,
    Navigation,
    Ticket,
    Route,
    ShieldCheck,
    Umbrella,
    Wrench,
    Home,
    Wifi,
} from "lucide-react";
import { useBeachesContext } from "@/context/BeachesContext";
import type { BeachData } from "@/types/beach";

/* ═══════════════════════════════════════════════════════════════════
   TYPES & CONSTANTS
═══════════════════════════════════════════════════════════════════ */
type FacilityKey = keyof BeachData["fasilitas"];

const FASILITAS_META: Record<FacilityKey, { icon: ElementType; label: string }> = {
    toilet: { icon: ShieldCheck, label: "Toilet" },
    mushola: { icon: Users, label: "Mushola" },
    warungMakan: { icon: Coffee, label: "Warung Makan" },
    parkirMotor: { icon: Car, label: "Parkir Motor" },
    parkirMobil: { icon: Car, label: "Parkir Mobil" },
    gazebo: { icon: Umbrella, label: "Gazebo" },
    sewaAlat: { icon: Wrench, label: "Sewa Alat" },
    penginapan: { icon: Home, label: "Penginapan" },
    wifi: { icon: Wifi, label: "WiFi" },
    penjagaPantai: { icon: Shield, label: "Penjaga Pantai" },
};

const AKSES_LABEL: Record<BeachData["aksesJalan"], string> = {
    mudah: "Mudah",
    sedang: "Sedang",
    sulit: "Tantangan",
};

const AKSES_STYLE: Record<BeachData["aksesJalan"], string> = {
    mudah: "bg-emerald-50 text-emerald-700 border-emerald-200",
    sedang: "bg-amber-50 text-amber-700 border-amber-200",
    sulit: "bg-rose-50 text-rose-700 border-rose-200",
};

/* ═══════════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════════ */
function bestIdx(values: number[], lower = false): boolean[] {
    const best = lower ? Math.min(...values) : Math.max(...values);
    return values.map((value) => value === best);
}

/* ═══════════════════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════════════════ */
function useInView(ref: RefObject<HTMLElement | null>) {
    const [inView, setInView] = useState(false);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setInView(true);
            },
            { threshold: 0.08 },
        );

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [ref]);

    return inView;
}

/* ═══════════════════════════════════════════════════════════════════
   SCORE BAR
═══════════════════════════════════════════════════════════════════ */
function Bar({
    value,
    max,
    color,
    animate,
}: {
    value: number;
    max: number;
    color: string;
    animate: boolean;
}) {
    return (
        <div className="h-1.5 w-full max-w-[72px] rounded-full bg-slate-100 overflow-hidden">
            <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                    width: animate ? `${(value / max) * 100}%` : "0%",
                    background: color,
                }}
            />
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   BEACH SELECTOR
═══════════════════════════════════════════════════════════════════ */
function BeachSelector({
    value,
    onChange,
    exclude,
    allBeaches,
}: {
    value: BeachData | null;
    onChange: (beach: BeachData) => void;
    exclude: string[];
    allBeaches: BeachData[];
}) {
    const [open, setOpen] = useState(false);
    const available = allBeaches.filter((beach) => !exclude.includes(beach.id));

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-300 transition-all shadow-sm hover:shadow group"
            >
                {value ? (
                    <>
                        <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100">
                            <img src={value.image} alt={value.name} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1 text-left min-w-0">
                            <p className="text-slate-800 font-black text-[12px] truncate">{value.name}</p>
                            <div className="flex items-center gap-1 mt-0.5">
                                <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400 flex-shrink-0" />
                                <span className="text-slate-500 text-[10px]">
                                    {value.rating} · Kec. {value.kecamatan}
                                </span>
                            </div>
                        </div>
                    </>
                ) : (
                    <span className="flex-1 text-left text-slate-400 text-[12px]">Pilih pantai...</span>
                )}

                <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""
                        }`}
                />
            </button>

            {open && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                    <div className="absolute top-full mt-1.5 w-full bg-white rounded-xl shadow-2xl shadow-slate-900/10 border border-slate-100 overflow-hidden z-20 min-w-[200px]">
                        <div className="p-1.5 space-y-0.5 max-h-60 overflow-y-auto">
                            {available.map((beach) => (
                                <button
                                    key={beach.id}
                                    type="button"
                                    onClick={() => {
                                        onChange(beach);
                                        setOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left transition-colors hover:bg-blue-50 ${value?.id === beach.id ? "bg-blue-50" : ""
                                        }`}
                                >
                                    <div className="w-7 h-7 rounded-md overflow-hidden flex-shrink-0">
                                        <img src={beach.image} alt={beach.name} className="w-full h-full object-cover" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="text-slate-800 font-bold text-[11px] truncate">{beach.name}</p>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-2 h-2 text-amber-400 fill-amber-400" />
                                            <span className="text-slate-500 text-[9px]">{beach.rating}</span>
                                        </div>
                                    </div>

                                    {value?.id === beach.id && (
                                        <Check className="w-3 h-3 text-blue-500 flex-shrink-0" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION DIVIDER
═══════════════════════════════════════════════════════════════════ */
function SectionDivider({
    label,
    accentClass,
}: {
    label: string;
    accentClass: string;
}) {
    return (
        <div className="flex items-center gap-2 bg-slate-50 border-y border-slate-200 px-4 py-2">
            <div className={`w-1 h-3.5 rounded-full flex-shrink-0 ${accentClass}`} />
            <span className="text-slate-600 text-[10px] font-black uppercase tracking-widest">
                {label}
            </span>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   COMPARISON ROW
═══════════════════════════════════════════════════════════════════ */
interface CellData {
    content: ReactNode;
    highlighted: boolean;
}

function CompareRow({
    icon: Icon,
    label,
    iconBg = "bg-slate-50",
    iconColor = "text-slate-400",
    cells,
    last = false,
}: {
    icon: ElementType;
    label: string;
    iconBg?: string;
    iconColor?: string;
    cells: CellData[];
    last?: boolean;
}) {
    return (
        <div className={`grid grid-cols-[160px_1fr_1fr_1fr] ${last ? "" : "border-b border-slate-100"}`}>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white">
                <div className={`w-5 h-5 rounded-md ${iconBg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-3 h-3 ${iconColor}`} />
                </div>
                <span className="text-slate-600 text-[11px] font-medium leading-tight">{label}</span>
            </div>

            {cells.map((cell, index) => (
                <div
                    key={index}
                    className={`border-l border-slate-100 flex items-center justify-center py-2.5 px-2 ${cell.highlighted ? "bg-blue-50/50" : "bg-white"
                        }`}
                >
                    {cell.content}
                </div>
            ))}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   VERDICT BOX
═══════════════════════════════════════════════════════════════════ */
function Verdict({
    beaches,
    scores,
}: {
    beaches: [BeachData, BeachData, BeachData];
    scores: [number, number, number];
}) {
    const maxScore = Math.max(...scores);
    const winnerIdxs = scores.map((score) => score === maxScore);
    const winnerCount = winnerIdxs.filter(Boolean).length;

    if (winnerCount === 3) {
        return (
            <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="w-8 h-8 rounded-xl bg-slate-200 flex items-center justify-center flex-shrink-0">
                    <Award className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                    <p className="text-slate-700 font-black text-[13px]">Ketiga Pantai Sangat Seimbang</p>
                    <p className="text-slate-500 text-[12px] mt-0.5 leading-relaxed">
                        Semua pantai memiliki keunggulan masing-masing. Pilih sesuai prioritas kunjunganmu.
                    </p>
                </div>
            </div>
        );
    }

    if (winnerCount === 2) {
        const winners = beaches.filter((_, index) => winnerIdxs[index]);

        return (
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-2xl p-4">
                <div className="w-8 h-8 rounded-xl bg-blue-200 flex items-center justify-center flex-shrink-0">
                    <Award className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                    <p className="text-slate-700 font-black text-[13px]">Dua Pantai Sama-Sama Unggul</p>
                    <p className="text-slate-500 text-[12px] mt-0.5 leading-relaxed">
                        <strong className="text-slate-700">{winners[0].name}</strong> dan{" "}
                        <strong className="text-slate-700">{winners[1].name}</strong> unggul dalam{" "}
                        {maxScore} kategori yang sama.
                    </p>
                </div>
            </div>
        );
    }

    const winner = beaches[winnerIdxs.indexOf(true)];

    return (
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <div className="w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center flex-shrink-0 shadow-sm shadow-amber-300/40">
                <Award className="w-4 h-4 text-white" />
            </div>
            <div>
                <p className="text-slate-800 font-black text-[13px]">
                    Paling Unggul: <span className="text-amber-700">{winner.name}</span>
                </p>
                <p className="text-slate-500 text-[12px] mt-0.5 leading-relaxed">
                    Mengungguli dalam {maxScore} kategori. Cocok untuk{" "}
                    <span className="font-semibold text-slate-700">{winner.highlight.toLowerCase()}</span>.
                </p>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════════════ */
export function CompareThreeBeaches() {
    const { beaches: allBeaches, loading } = useBeachesContext();
    const [beachA, setBeachA] = useState<BeachData | null>(null);
    const [beachB, setBeachB] = useState<BeachData | null>(null);
    const [beachC, setBeachC] = useState<BeachData | null>(null);

    const sectionRef = useRef<HTMLElement | null>(null);
    const inView = useInView(sectionRef);

    useEffect(() => {
        if (allBeaches.length >= 3) {
            if (!beachA) setBeachA(allBeaches[0]);
            if (!beachB) setBeachB(allBeaches[1]);
            if (!beachC) setBeachC(allBeaches[2]);
        }
    }, [allBeaches]);

    if (loading || !beachA || !beachB || !beachC) {
        return (
            <section
                id="bandingkan"
                className="py-12 lg:py-16 flex items-center justify-center"
                style={{ background: "#F8FAFF" }}
            >
                <div className="text-center">
                    <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
                    <p className="text-sm font-semibold text-slate-600">Memuat data pantai...</p>
                </div>
            </section>
        );
    }

    const beaches = [beachA, beachB, beachC] as [BeachData, BeachData, BeachData];
    const facilityKeys = Object.keys(beachA.fasilitas) as FacilityKey[];

    const calcScores = (): [number, number, number] => {
        let scoreA = 0;
        let scoreB = 0;
        let scoreC = 0;

        const higherWins = (a: number, b: number, c: number) => {
            const max = Math.max(a, b, c);
            if (a === max) scoreA++;
            if (b === max) scoreB++;
            if (c === max) scoreC++;
        };

        const lowerWins = (a: number, b: number, c: number) => {
            const min = Math.min(a, b, c);
            if (a === min) scoreA++;
            if (b === min) scoreB++;
            if (c === min) scoreC++;
        };

        higherWins(beachA.rating, beachB.rating, beachC.rating);
        higherWins(beachA.reviews, beachB.reviews, beachC.reviews);
        lowerWins(beachA.tiketMasukRp, beachB.tiketMasukRp, beachC.tiketMasukRp);
        lowerWins(beachA.jarakDariKota, beachB.jarakDariKota, beachC.jarakDariKota);
        higherWins(beachA.aktivitas.length, beachB.aktivitas.length, beachC.aktivitas.length);

        facilityKeys.forEach((key) => {
            const values = [beachA.fasilitas[key], beachB.fasilitas[key], beachC.fasilitas[key]];
            const trueCount = values.filter(Boolean).length;

            if (trueCount > 0 && trueCount < 3) {
                if (beachA.fasilitas[key]) scoreA++;
                if (beachB.fasilitas[key]) scoreB++;
                if (beachC.fasilitas[key]) scoreC++;
            }
        });

        return [scoreA, scoreB, scoreC];
    };

    const [scoreA, scoreB, scoreC] = calcScores();
    const scores = [scoreA, scoreB, scoreC] as [number, number, number];
    const maxScore = Math.max(...scores);

    const textValue = (text: string, isWin: boolean) => (
        <span className={`text-[11px] font-bold ${isWin ? "text-blue-700" : "text-slate-500"}`}>
            {text}
            {isWin ? " ★" : ""}
        </span>
    );

    return (
        <section
            id="bandingkan"
            ref={sectionRef}
            className="py-12 lg:py-16"
            style={{ background: "#F8FAFF" }}
        >
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-8 max-w-xl mx-auto">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                            <div className="w-5 h-[2px] rounded-full bg-blue-600" />
                            <div className="w-2.5 h-[2px] rounded-full bg-amber-400" />
                        </div>
                        <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.18em]">
                            Bandingkan Pantai
                        </span>
                        <div className="flex items-center gap-1">
                            <div className="w-2.5 h-[2px] rounded-full bg-amber-400" />
                            <div className="w-5 h-[2px] rounded-full bg-blue-600" />
                        </div>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight mb-3">
                        Bandingkan{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                            Hingga 3 Pantai
                        </span>
                    </h2>

                    <p className="text-slate-500 text-sm leading-relaxed">
                        Pilih tiga pantai dan lihat semua metrik dalam satu tabel — mudah dibaca dan cepat
                        diputuskan.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    {[
                        {
                            label: "Pantai Pertama",
                            value: beachA,
                            onChange: setBeachA,
                            exclude: [beachB.id, beachC.id],
                        },
                        {
                            label: "Pantai Kedua",
                            value: beachB,
                            onChange: setBeachB,
                            exclude: [beachA.id, beachC.id],
                        },
                        {
                            label: "Pantai Ketiga",
                            value: beachC,
                            onChange: setBeachC,
                            exclude: [beachA.id, beachB.id],
                        },
                    ].map((selector) => (
                        <div key={selector.label}>
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1.5 ml-1">
                                {selector.label}
                            </p>
                            <BeachSelector
                                value={selector.value}
                                onChange={selector.onChange}
                                exclude={selector.exclude}
                                allBeaches={allBeaches}
                            />
                        </div>
                    ))}
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <div className="min-w-[540px]">
                            <div className="grid grid-cols-[160px_1fr_1fr_1fr] border-b border-slate-200">
                                <div className="bg-slate-50 border-r border-slate-200 flex items-end px-4 py-3">
                                    <span className="text-slate-400 text-[10px] font-semibold">Kriteria</span>
                                </div>

                                {beaches.map((beach, index) => {
                                    const isTop =
                                        scores[index] === maxScore && scores.filter((score) => score === maxScore).length === 1;

                                    return (
                                        <div
                                            key={beach.id}
                                            className={`border-l border-slate-200 ${isTop ? "bg-amber-50/30" : "bg-white"}`}
                                        >
                                            <div className="relative h-28 overflow-hidden">
                                                <img src={beach.image} alt={beach.name} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 to-transparent" />

                                                {isTop && (
                                                    <div className="absolute top-2 left-2 flex items-center gap-1 bg-amber-400 text-slate-900 text-[9px] font-black px-1.5 py-0.5 rounded-lg shadow-sm">
                                                        <Award className="w-2.5 h-2.5" />
                                                        Paling Unggul
                                                    </div>
                                                )}

                                                <div
                                                    className="absolute top-2 right-2 text-white text-[9px] font-black px-1.5 py-0.5 rounded-lg"
                                                    style={{ background: beach.badgeColor }}
                                                >
                                                    {beach.badge}
                                                </div>

                                                <div className="absolute bottom-2 left-2 right-2">
                                                    <p className="text-white font-black text-[12px] leading-tight line-clamp-1">
                                                        {beach.name}
                                                    </p>
                                                    <div className="flex items-center gap-0.5 mt-0.5">
                                                        <MapPin className="w-2 h-2 text-white/70 flex-shrink-0" />
                                                        <span className="text-white/70 text-[9px] truncate">
                                                            Kec. {beach.kecamatan}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-center gap-1.5 py-2.5 px-2">
                                                <Star className="w-3 h-3 text-amber-400 fill-amber-400 flex-shrink-0" />
                                                <span className="text-slate-800 font-black text-[12px]">{beach.rating}</span>
                                                <span className="text-slate-400 text-[9px]">
                                                    ({beach.reviews.toLocaleString("id-ID")})
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <SectionDivider label="Informasi Utama" accentClass="bg-blue-500" />

                            <CompareRow
                                icon={Ticket}
                                label="Tiket Masuk"
                                iconBg="bg-blue-50"
                                iconColor="text-blue-500"
                                cells={(() => {
                                    const priceValues = beaches.map((beach) => beach.tiketMasukRp);
                                    const wins = bestIdx(priceValues, true);

                                    return beaches.map((beach, index) => ({
                                        highlighted: wins[index] && beach.tiketMasukRp > 0,
                                        content: (
                                            <span
                                                className={`text-[11px] font-bold px-2 py-0.5 rounded-lg ${beach.tiketMasukRp === 0
                                                        ? "bg-emerald-50 text-emerald-700"
                                                        : wins[index]
                                                            ? "text-blue-700"
                                                            : "text-slate-500"
                                                    }`}
                                            >
                                                {beach.tiketMasuk}
                                                {wins[index] && beach.tiketMasukRp > 0 ? " ★" : ""}
                                            </span>
                                        ),
                                    }));
                                })()}
                            />

                            <CompareRow
                                icon={Navigation}
                                label="Jarak dari Kota"
                                iconBg="bg-blue-50"
                                iconColor="text-blue-500"
                                cells={(() => {
                                    const values = beaches.map((beach) => beach.jarakDariKota);
                                    const wins = bestIdx(values, true);

                                    return beaches.map((beach, index) => ({
                                        highlighted: wins[index],
                                        content: (
                                            <div className="flex flex-col items-center gap-1.5">
                                                <span
                                                    className={`text-[11px] font-bold ${wins[index] ? "text-blue-700" : "text-slate-500"
                                                        }`}
                                                >
                                                    {beach.jarakDariKota} km
                                                    {wins[index] ? " ★" : ""}
                                                </span>
                                                <Bar
                                                    value={50 - Math.min(beach.jarakDariKota, 50)}
                                                    max={50}
                                                    color={wins[index] ? "#3B82F6" : "#CBD5E1"}
                                                    animate={inView}
                                                />
                                            </div>
                                        ),
                                    }));
                                })()}
                            />

                            <CompareRow
                                icon={Clock}
                                label="Jam Buka"
                                iconBg="bg-amber-50"
                                iconColor="text-amber-500"
                                cells={beaches.map((beach) => ({
                                    highlighted: false,
                                    content: (
                                        <span className="text-slate-600 text-[11px] font-medium text-center leading-tight">
                                            {beach.jamBuka}
                                        </span>
                                    ),
                                }))}
                            />

                            <CompareRow
                                icon={Route}
                                label="Akses Jalan"
                                iconBg="bg-emerald-50"
                                iconColor="text-emerald-500"
                                cells={beaches.map((beach) => ({
                                    highlighted: false,
                                    content: (
                                        <span
                                            className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${AKSES_STYLE[beach.aksesJalan]}`}
                                        >
                                            {AKSES_LABEL[beach.aksesJalan]}
                                        </span>
                                    ),
                                }))}
                            />

                            <CompareRow
                                icon={Star}
                                label="Rating"
                                iconBg="bg-amber-50"
                                iconColor="text-amber-500"
                                cells={(() => {
                                    const values = beaches.map((beach) => beach.rating);
                                    const wins = bestIdx(values);

                                    return beaches.map((beach, index) => ({
                                        highlighted: wins[index],
                                        content: (
                                            <div className="flex flex-col items-center gap-1.5">
                                                <span
                                                    className={`text-[12px] font-black ${wins[index] ? "text-amber-600" : "text-slate-500"
                                                        }`}
                                                >
                                                    {beach.rating}
                                                    {wins[index] ? " ★" : ""}
                                                </span>
                                                <Bar
                                                    value={beach.rating}
                                                    max={5}
                                                    color={wins[index] ? "#F59E0B" : "#CBD5E1"}
                                                    animate={inView}
                                                />
                                            </div>
                                        ),
                                    }));
                                })()}
                            />

                            <CompareRow
                                icon={Users}
                                label="Jumlah Ulasan"
                                iconBg="bg-slate-50"
                                iconColor="text-slate-400"
                                cells={(() => {
                                    const values = beaches.map((beach) => beach.reviews);
                                    const wins = bestIdx(values);

                                    return beaches.map((beach, index) => ({
                                        highlighted: wins[index],
                                        content: textValue(beach.reviews.toLocaleString("id-ID"), wins[index]),
                                    }));
                                })()}
                            />

                            <SectionDivider label="Fasilitas" accentClass="bg-emerald-500" />

                            {facilityKeys.map((key, index) => {
                                const meta = FASILITAS_META[key];

                                return (
                                    <CompareRow
                                        key={key}
                                        icon={meta.icon}
                                        label={meta.label}
                                        iconBg="bg-slate-50"
                                        iconColor="text-slate-400"
                                        last={index === facilityKeys.length - 1}
                                        cells={beaches.map((beach) => ({
                                            highlighted: false,
                                            content: beach.fasilitas[key] ? (
                                                <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center">
                                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                                </div>
                                            ) : (
                                                <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center">
                                                    <X className="w-3.5 h-3.5 text-slate-300" />
                                                </div>
                                            ),
                                        }))}
                                    />
                                );
                            })}

                            <SectionDivider label="Aktivitas &amp; Cocok Untuk" accentClass="bg-purple-500" />

                            <CompareRow
                                icon={Waves}
                                label="Aktivitas"
                                iconBg="bg-blue-50"
                                iconColor="text-blue-500"
                                cells={beaches.map((beach) => ({
                                    highlighted: false,
                                    content: (
                                        <div className="flex flex-wrap gap-1 justify-center">
                                            {beach.aktivitas.slice(0, 3).map((aktivitas) => (
                                                <span
                                                    key={aktivitas}
                                                    className="text-[9px] font-semibold px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100 leading-tight"
                                                >
                                                    {aktivitas}
                                                </span>
                                            ))}
                                            {beach.aktivitas.length > 3 && (
                                                <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-md bg-slate-50 text-slate-500 border border-slate-100 leading-tight">
                                                    +{beach.aktivitas.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    ),
                                }))}
                            />

                            <CompareRow
                                icon={Users}
                                label="Cocok Untuk"
                                iconBg="bg-emerald-50"
                                iconColor="text-emerald-500"
                                last
                                cells={beaches.map((beach) => ({
                                    highlighted: false,
                                    content: (
                                        <div className="flex flex-wrap gap-1 justify-center">
                                            {beach.cocokUntuk.slice(0, 2).map((item) => (
                                                <span
                                                    key={item}
                                                    className="text-[9px] font-semibold px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100 leading-tight"
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                            {beach.cocokUntuk.length > 2 && (
                                                <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-md bg-slate-50 text-slate-500 border border-slate-100 leading-tight">
                                                    +{beach.cocokUntuk.length - 2}
                                                </span>
                                            )}
                                        </div>
                                    ),
                                }))}
                            />

                            <div className="grid grid-cols-[160px_1fr_1fr_1fr] border-t-2 border-slate-200 bg-slate-50">
                                <div className="flex items-center gap-2 px-4 py-3.5">
                                    <Award className="w-4 h-4 text-amber-500 flex-shrink-0" />
                                    <span className="text-slate-700 text-[11px] font-black">Skor Keunggulan</span>
                                </div>

                                {beaches.map((beach, index) => {
                                    const isTop = scores[index] === maxScore;

                                    return (
                                        <div
                                            key={beach.id}
                                            className={`border-l border-slate-200 flex flex-col items-center justify-center py-3.5 ${isTop ? "bg-amber-50" : ""
                                                }`}
                                        >
                                            <span
                                                className={`text-2xl font-black leading-none ${isTop ? "text-amber-500" : "text-slate-300"
                                                    }`}
                                            >
                                                {scores[index]}
                                            </span>
                                            {isTop && (
                                                <span className="mt-1 text-[9px] font-black text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded-full">
                                                    UNGGUL
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border-t border-slate-100">
                        <Verdict beaches={beaches} scores={scores} />
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-5 mt-5 pt-5 border-t border-slate-200/60">
                    <div className="flex items-center gap-2">
                        <span className="text-amber-500 font-black">★</span>
                        <span className="text-slate-400 text-[10px]">Nilai terbaik pada baris tersebut</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-lg bg-emerald-50 flex items-center justify-center">
                            <Check className="w-3 h-3 text-emerald-600" />
                        </div>
                        <span className="text-slate-400 text-[10px]">Fasilitas tersedia</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-lg bg-slate-100 flex items-center justify-center">
                            <X className="w-3 h-3 text-slate-300" />
                        </div>
                        <span className="text-slate-400 text-[10px]">Fasilitas tidak tersedia</span>
                    </div>
                </div>
            </div>
        </section>
    );
}