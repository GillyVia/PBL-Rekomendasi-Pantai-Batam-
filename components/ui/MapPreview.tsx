"use client";

import { useState } from "react";
import {
    MapPin,
    Navigation,
    ZoomIn,
    ZoomOut,
    Star,
    ArrowRight,
    Waves,
    Clock,
    Car,
    ChevronRight,
    Compass,
    Layers,
    X,
    ExternalLink,
    Sun,
    Anchor,
    TreePine,
    Camera,
} from "lucide-react";

const MAP_BG_1 =
    "https://images.unsplash.com/photo-1631255661378-4a070503e0b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080";
const MAP_BG_2 =
    "https://images.unsplash.com/photo-1662516705423-39f4b658eeb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080";

const BEACHES = [
    {
        id: 1,
        name: "Pantai Nongsa",
        kecamatan: "Nongsa, Batam Utara",
        x: 74,
        y: 16,
        rating: 4.9,
        reviews: 1240,
        category: "Keluarga",
        CategoryIcon: Waves,
        pinColor: "#3B82F6",
        pinGlow: "rgba(59,130,246,0.35)",
        price: "Gratis",
        priceType: "free",
        jam: "06.00 – 18.00",
        akses: "12 km dari pusat kota",
        aksesMode: "Kendaraan pribadi",
        fasilitas: ["Toilet", "Parkir", "Warung"],
        highlight: "Pasir putih, cocok untuk piknik keluarga & berenang aman.",
        image:
            "https://images.unsplash.com/photo-1544770287-32c1e06d9c8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
        open: true,
    },
    {
        id: 2,
        name: "Pantai Lagoi",
        kecamatan: "Batam",
        x: 54,
        y: 30,
        rating: 4.7,
        reviews: 650,
        category: "Resort",
        CategoryIcon: Anchor,
        pinColor: "#F59E0B",
        pinGlow: "rgba(245,158,11,0.35)",
        price: "Rp 50.000",
        priceType: "paid",
        jam: "07.00 – 20.00",
        akses: "22 km dari pusat kota",
        aksesMode: "Kendaraan pribadi",
        fasilitas: ["Hotel", "Kolam Renang", "Restoran"],
        highlight: "Resort premium dengan fasilitas lengkap.",
        image:
            "https://images.unsplash.com/photo-1660150658369-4583580ca659?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
        open: true,
    },
    {
        id: 3,
        name: "Pantai Melur",
        kecamatan: "Galang, Batam Selatan",
        x: 33,
        y: 62,
        rating: 4.8,
        reviews: 534,
        category: "Snorkeling",
        CategoryIcon: Camera,
        pinColor: "#06B6D4",
        pinGlow: "rgba(6,182,212,0.35)",
        price: "Rp 30.000",
        priceType: "paid",
        jam: "07.00 – 17.00",
        akses: "28 km dari pusat kota",
        aksesMode: "Perahu + kendaraan",
        fasilitas: ["Sewa Alat", "Warung", "Toilet"],
        highlight: "Air jernih emerald & terumbu karang.",
        image:
            "https://images.unsplash.com/photo-1771521414786-1dec542f67af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
        open: true,
    },
    {
        id: 4,
        name: "Pantai Melayu",
        kecamatan: "Batam Center",
        x: 56,
        y: 50,
        rating: 4.6,
        reviews: 980,
        category: "Sunset",
        CategoryIcon: Sun,
        pinColor: "#F97316",
        pinGlow: "rgba(249,115,22,0.35)",
        price: "Gratis",
        priceType: "free",
        jam: "Buka 24 jam",
        akses: "5 km dari pusat kota",
        aksesMode: "Mudah, angkutan umum",
        fasilitas: ["Kuliner", "Parkir", "Area Bermain"],
        highlight: "Lokasi strategis dengan pemandangan sunset ikonik.",
        image:
            "https://images.unsplash.com/photo-1762895619964-601c024165df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500",
        open: true,
    },
];

const MAP_LAYERS = [
    { id: "satelit", label: "Satelit", img: MAP_BG_1 },
    { id: "hybrid", label: "Hybrid", img: MAP_BG_2 },
] as const;

const CATEGORY_LEGEND = [
    { color: "#3B82F6", label: "Keluarga" },
    { color: "#06B6D4", label: "Snorkeling" },
    { color: "#F59E0B", label: "Resort" },
    { color: "#F97316", label: "Sunset" },
];

function QuickStat({
    icon: Icon,
    label,
    value,
    color,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
    color: string;
}) {
    return (
        <div className="flex items-center gap-2">
            <div
                className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${color}18` }}
            >
                <Icon className="w-3.5 h-3.5" style={{ color }} />
            </div>
            <div>
                <p className="text-[10px] text-slate-400 leading-none">{label}</p>
                <p className="text-slate-700 font-bold text-xs leading-snug">{value}</p>
            </div>
        </div>
    );
}

function MapPinBtn({
    pin,
    isActive,
    onClick,
}: {
    pin: (typeof BEACHES)[0];
    isActive: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="absolute z-20 transition-all duration-200"
            style={{
                left: `${pin.x}%`,
                top: `${pin.y}%`,
                transform: "translate(-50%, -100%)",
            }}
            title={pin.name}
        >
            <div className={`relative ${isActive ? "scale-125" : "hover:scale-110"} transition-transform duration-200`}>
                {isActive && (
                    <div
                        className="absolute inset-0 rounded-full animate-ping opacity-40"
                        style={{ background: pin.pinColor, transform: "scale(1.6)" }}
                    />
                )}

                <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                    style={{
                        background: pin.pinColor,
                        boxShadow: isActive
                            ? `0 0 0 4px ${pin.pinGlow}, 0 4px 16px ${pin.pinGlow}`
                            : "0 4px 12px rgba(0,0,0,0.2)",
                    }}
                >
                    <MapPin className="w-4 h-4 text-white fill-white/40" />
                </div>

                <div
                    className="w-2.5 h-2.5 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"
                    style={{ background: pin.pinColor }}
                />

                {isActive && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 pointer-events-none">
                        <div className="bg-white rounded-2xl px-3 py-2 shadow-2xl border border-slate-100 whitespace-nowrap min-w-[148px]">
                            <p className="text-slate-900 text-[12px] font-black leading-tight">
                                {pin.name}
                            </p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400 flex-shrink-0" />
                                <span className="text-slate-700 text-[11px] font-bold">{pin.rating}</span>
                                <span className="text-slate-300">·</span>
                                <span className="text-[11px] font-semibold" style={{ color: pin.pinColor }}>
                                    {pin.category}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </button>
    );
}

function BeachDetailCard({
    beach,
    onClose,
}: {
    beach: (typeof BEACHES)[0];
    onClose: () => void;
}) {
    return (
        <div className="bg-white rounded-[22px] border border-slate-100 shadow-xl shadow-blue-900/8 overflow-hidden flex flex-col">
            <div className="relative h-36 overflow-hidden flex-shrink-0">
                <img src={beach.image} alt={beach.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/65 via-slate-900/10 to-transparent" />

                <div
                    className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-white text-[10px] font-black shadow-md"
                    style={{ background: beach.pinColor }}
                >
                    <beach.CategoryIcon className="w-3 h-3" />
                    {beach.category}
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 w-7 h-7 rounded-xl bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition-colors"
                >
                    <X className="w-3.5 h-3.5" />
                </button>

                <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-black text-base leading-tight">{beach.name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                        <MapPin className="w-2.5 h-2.5 text-white/70" />
                        <span className="text-white/70 text-[10px]">{beach.kecamatan}</span>
                    </div>
                </div>
            </div>

            <div className="p-4 flex flex-col gap-3.5 flex-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star
                                    key={s}
                                    className={`w-3 h-3 ${s <= Math.floor(beach.rating)
                                            ? "text-amber-400 fill-amber-400"
                                            : "text-slate-200 fill-slate-200"
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-slate-800 font-black text-sm">{beach.rating}</span>
                        <span className="text-slate-400 text-[10px]">
                            ({beach.reviews.toLocaleString("id-ID")})
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${beach.open
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                    : "bg-slate-50 text-slate-500 border-slate-100"
                                }`}
                        >
                            {beach.open ? "● Buka" : "● Tutup"}
                        </span>

                        <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${beach.priceType === "free"
                                    ? "bg-blue-50 text-blue-700 border border-blue-100"
                                    : "bg-amber-50 text-amber-700 border border-amber-100"
                                }`}
                        >
                            {beach.price}
                        </span>
                    </div>
                </div>

                <p className="text-slate-500 text-[12px] leading-relaxed border-l-2 border-blue-200 pl-3 bg-blue-50/50 py-1.5 rounded-r-xl">
                    {beach.highlight}
                </p>

                <div className="grid grid-cols-2 gap-2.5">
                    <QuickStat icon={Clock} label="Jam Operasional" value={beach.jam} color="#3B82F6" />
                    <QuickStat icon={Car} label="Jarak" value={beach.akses} color="#F59E0B" />
                    <QuickStat icon={Navigation} label="Moda Akses" value={beach.aksesMode} color="#10B981" />
                    <QuickStat icon={Waves} label="Fasilitas" value={beach.fasilitas.slice(0, 2).join(", ")} color="#8B5CF6" />
                </div>

                <div className="flex flex-wrap gap-1.5">
                    {beach.fasilitas.map((f) => (
                        <span
                            key={f}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 border border-slate-200"
                        >
                            {f}
                        </span>
                    ))}
                </div>

                <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(beach.name + " Batam")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-black text-white shadow-lg transition-all duration-200"
                    style={{
                        background: `linear-gradient(135deg, ${beach.pinColor}, ${beach.pinColor}dd)`,
                        boxShadow: `0 8px 20px ${beach.pinGlow}`,
                    }}
                >
                    <ExternalLink className="w-4 h-4" />
                    Lihat Lokasi di Peta
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
            </div>
        </div>
    );
}

function BeachListRow({
    beach,
    isActive,
    onClick,
}: {
    beach: (typeof BEACHES)[0];
    isActive: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 p-3 rounded-2xl border-2 text-left transition-all duration-200 group ${isActive
                    ? "border-blue-200 bg-blue-50/60 shadow-sm"
                    : "border-transparent hover:border-slate-200 hover:bg-slate-50"
                }`}
        >
            <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                <img src={beach.image} alt={beach.name} className="w-full h-full object-cover" />
                <div
                    className="absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-white shadow-sm"
                    style={{ background: beach.pinColor }}
                />
            </div>

            <div className="flex-1 min-w-0">
                <p className={`text-[13px] font-bold truncate leading-tight ${isActive ? "text-blue-700" : "text-slate-800"}`}>
                    {beach.name}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                    <MapPin className="w-2.5 h-2.5 text-slate-400 flex-shrink-0" />
                    <span className="text-slate-400 text-[10px] truncate">
                        {beach.kecamatan.split(",")[0]}
                    </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                    <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400 flex-shrink-0" />
                    <span className="text-slate-600 text-[11px] font-bold">{beach.rating}</span>
                    <span className="text-slate-300 text-[10px]">·</span>
                    <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${beach.open ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
                            }`}
                    >
                        {beach.open ? "Buka" : "Tutup"}
                    </span>
                </div>
            </div>

            <ChevronRight
                className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-blue-500 translate-x-0.5" : "text-slate-300 group-hover:text-slate-400"
                    } transition-all duration-200`}
            />
        </button>
    );
}

export function MapPreview() {
    const [activeId, setActiveId] = useState<number>(1);
    const [mapLayer, setMapLayer] = useState<"satelit" | "hybrid">("satelit");
    const [zoom, setZoom] = useState(1);
    const [showLayerMenu, setShowLayerMenu] = useState(false);

    const activeBeach = BEACHES.find((b) => b.id === activeId) ?? BEACHES[0];
    const currentBg = MAP_LAYERS.find((l) => l.id === mapLayer)?.img ?? MAP_BG_1;

    return (
        <section
            id="peta"
            className="py-20 lg:py-28 relative overflow-hidden"
            style={{
                background:
                    "linear-gradient(160deg, #F0F9FF 0%, #FFFFFF 40%, #FFFBEB 80%, #F8FAFF 100%)",
            }}
        >
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-amber-100/30 blur-3xl pointer-events-none" />

            <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 xl:px-8">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex items-center gap-1.5">
                                <div className="w-7 h-[3px] rounded-full bg-blue-600" />
                                <div className="w-3.5 h-[3px] rounded-full bg-amber-400" />
                                <div className="w-2 h-[3px] rounded-full bg-blue-200" />
                            </div>
                            <span className="text-blue-600 text-xs font-black uppercase tracking-[0.18em]">
                                Peta Interaktif
                            </span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black text-slate-900 leading-[1.1] tracking-tight mb-4">
                            Jelajahi Pantai Batam{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                                dari Peta
                            </span>
                        </h2>

                        <p className="text-slate-500 text-base leading-relaxed">
                            Klik pin lokasi untuk melihat informasi singkat setiap pantai.
                        </p>
                    </div>

                    <div className="flex items-center gap-0 bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden flex-shrink-0">
                        {[
                            { value: `${BEACHES.length}`, label: "Lokasi Pantai", color: "#3B82F6" },
                            { value: "4", label: "Kategori", color: "#F59E0B" },
                            { value: "12+", label: "Area Wisata", color: "#10B981" },
                        ].map((s, i) => (
                            <div
                                key={i}
                                className={`flex flex-col items-center px-5 py-3 ${i < 2 ? "border-r border-slate-100" : ""}`}
                            >
                                <span className="font-black text-xl leading-none" style={{ color: s.color }}>
                                    {s.value}
                                </span>
                                <span className="text-slate-400 text-[10px] font-semibold mt-0.5 whitespace-nowrap">
                                    {s.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-6 items-start">
                    <div className="flex flex-col gap-4">
                        <div
                            className="relative rounded-[28px] overflow-hidden shadow-2xl shadow-blue-900/15 border border-white/80"
                            style={{ height: "500px" }}
                        >
                            <img
                                key={mapLayer}
                                src={currentBg}
                                alt="Peta Pantai Batam"
                                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                                style={{
                                    transform: `scale(${zoom})`,
                                    transformOrigin: "center",
                                    transition: "transform 0.3s ease",
                                }}
                            />

                            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-blue-900/30" />
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-amber-900/10" />

                            <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md border border-white flex items-center justify-center z-30">
                                <Compass className="w-5 h-5 text-blue-600" />
                            </div>

                            {BEACHES.map((pin) => (
                                <MapPinBtn
                                    key={pin.id}
                                    pin={pin}
                                    isActive={activeId === pin.id}
                                    onClick={() => setActiveId(pin.id)}
                                />
                            ))}

                            <div className="absolute top-4 right-4 flex flex-col gap-2 z-30">
                                <div className="relative">
                                    <button
                                        onClick={() => setShowLayerMenu((v) => !v)}
                                        className="w-10 h-10 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-white flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                    >
                                        <Layers className="w-4 h-4" />
                                    </button>

                                    {showLayerMenu && (
                                        <div className="absolute top-12 right-0 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden w-28 z-40">
                                            {MAP_LAYERS.map((layer) => (
                                                <button
                                                    key={layer.id}
                                                    onClick={() => {
                                                        setMapLayer(layer.id);
                                                        setShowLayerMenu(false);
                                                    }}
                                                    className={`w-full flex items-center gap-2 px-3 py-2.5 text-xs font-bold transition-colors ${mapLayer === layer.id
                                                            ? "bg-blue-600 text-white"
                                                            : "text-slate-600 hover:bg-slate-50"
                                                        }`}
                                                >
                                                    <div
                                                        className={`w-2 h-2 rounded-full ${mapLayer === layer.id ? "bg-white" : "bg-slate-300"
                                                            }`}
                                                    />
                                                    {layer.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-white overflow-hidden">
                                    <button
                                        onClick={() => setZoom((z) => Math.min(z + 0.15, 2))}
                                        className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-slate-100"
                                    >
                                        <ZoomIn className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setZoom((z) => Math.max(z - 0.15, 0.7))}
                                        className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                    >
                                        <ZoomOut className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="absolute bottom-4 left-4 right-16 z-20">
                                <div className="bg-white/92 backdrop-blur-md rounded-2xl px-4 py-3 shadow-xl border border-white/70">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                                            {CATEGORY_LEGEND.map((cat) => (
                                                <div key={cat.label} className="flex items-center gap-1.5">
                                                    <div
                                                        className="w-2 h-2 rounded-full flex-shrink-0"
                                                        style={{ background: cat.color }}
                                                    />
                                                    <span className="text-slate-600 text-[10px] font-semibold">
                                                        {cat.label}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        <span className="text-slate-400 text-[10px] font-semibold flex-shrink-0 whitespace-nowrap">
                                            {BEACHES.length} lokasi
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute bottom-4 right-4 z-20">
                                <div className="bg-white/90 backdrop-blur-sm rounded-xl px-2.5 py-1 shadow-md border border-white/70">
                                    <span className="text-[10px] font-black text-slate-500">
                                        ×{zoom.toFixed(1)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {BEACHES.map((b) => (
                                <button
                                    key={b.id}
                                    onClick={() => setActiveId(b.id)}
                                    className={`relative rounded-2xl overflow-hidden h-16 group transition-all duration-200 ${activeId === b.id ? "ring-2 shadow-lg" : "opacity-70 hover:opacity-90"
                                        }`}
                                >
                                    <img src={b.image} alt={b.name} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <p className="absolute bottom-1.5 left-1.5 right-1.5 text-white text-[9px] font-bold truncate leading-tight">
                                        {b.name.replace("Pantai ", "")}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 lg:sticky lg:top-24">
                        <BeachDetailCard beach={activeBeach} onClose={() => { }} />

                        <div className="bg-white rounded-[22px] border border-slate-100 shadow-sm overflow-hidden">
                            <div className="flex items-center justify-between px-4 pt-4 pb-2">
                                <p className="text-slate-800 font-black text-sm flex items-center gap-2">
                                    <Navigation className="w-4 h-4 text-blue-500" />
                                    Semua Destinasi
                                </p>
                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">
                                    {BEACHES.length} pantai
                                </span>
                            </div>

                            <div className="px-3 pb-3 space-y-1 max-h-64 overflow-y-auto">
                                {BEACHES.map((b) => (
                                    <BeachListRow
                                        key={b.id}
                                        beach={b}
                                        isActive={activeId === b.id}
                                        onClick={() => setActiveId(b.id)}
                                    />
                                ))}
                            </div>

                            <div className="px-4 pb-4 pt-1">
                                <a
                                    href="https://www.google.com/maps/search/pantai+batam"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-black shadow-lg shadow-blue-300/40 hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                                >
                                    <Navigation className="w-4 h-4" />
                                    Buka Peta Lengkap
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}