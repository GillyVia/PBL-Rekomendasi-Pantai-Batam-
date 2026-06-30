"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
    Camera,
    Loader2,
    AlertCircle,
} from "lucide-react";
import dynamic from "next/dynamic";

// ================================================================
// 1. TIPE DATA
// ================================================================
export interface Beach {
    id: number;
    name: string;
    kecamatan: string;
    latitude: number;
    longitude: number;
    rating: number;
    reviews: number;
    category: "Keluarga" | "Resort" | "Snorkeling" | "Sunset";
    price: string;
    priceType: "free" | "paid";
    jam: string;
    akses: string;
    aksesMode: string;
    fasilitas: string[];
    highlight: string;
    image: string;
    open: boolean;
}

// ================================================================
// 2. KONFIGURASI KATEGORI
// ================================================================
const CATEGORY_CONFIG: Record<
    Beach["category"],
    { color: string; glow: string; Icon: React.ElementType }
> = {
    Keluarga: { color: "#3B82F6", glow: "rgba(59,130,246,0.35)", Icon: Waves },
    Resort: { color: "#F59E0B", glow: "rgba(245,158,11,0.35)", Icon: Anchor },
    Snorkeling: { color: "#06B6D4", glow: "rgba(6,182,212,0.35)", Icon: Camera },
    Sunset: { color: "#F97316", glow: "rgba(249,115,22,0.35)", Icon: Sun },
};

const CATEGORY_LEGEND = Object.entries(CATEGORY_CONFIG).map(([label, { color }]) => ({
    color,
    label,
}));

// ================================================================
// 3. MOCK DATA CADANGAN
// ================================================================
const MOCK_BEACHES: Beach[] = [
    {
        id: 1,
        name: "Pantai Nongsa",
        kecamatan: "Nongsa, Batam Utara",
        latitude: 1.0840,
        longitude: 104.0810,
        rating: 4.9,
        reviews: 1240,
        category: "Keluarga",
        price: "Gratis",
        priceType: "free",
        jam: "06.00 – 18.00",
        akses: "12 km dari pusat kota",
        aksesMode: "Kendaraan pribadi",
        fasilitas: ["Toilet", "Parkir", "Warung"],
        highlight: "Pasir putih, cocok untuk piknik keluarga & berenang aman.",
        image: "https://images.unsplash.com/photo-1544770287-32c1e06d9c8a?w=500",
        open: true,
    },
    {
        id: 2,
        name: "Pantai Lagoi",
        kecamatan: "Batam",
        latitude: 1.0520,
        longitude: 104.0530,
        rating: 4.7,
        reviews: 650,
        category: "Resort",
        price: "Rp 50.000",
        priceType: "paid",
        jam: "07.00 – 20.00",
        akses: "22 km dari pusat kota",
        aksesMode: "Kendaraan pribadi",
        fasilitas: ["Hotel", "Kolam Renang", "Restoran"],
        highlight: "Resort premium dengan fasilitas lengkap.",
        image: "https://images.unsplash.com/photo-1660150658369-4583580ca659?w=500",
        open: true,
    },
    {
        id: 3,
        name: "Pantai Melur",
        kecamatan: "Galang, Batam Selatan",
        latitude: 0.9740,
        longitude: 104.0270,
        rating: 4.8,
        reviews: 534,
        category: "Snorkeling",
        price: "Rp 30.000",
        priceType: "paid",
        jam: "07.00 – 17.00",
        akses: "28 km dari pusat kota",
        aksesMode: "Perahu + kendaraan",
        fasilitas: ["Sewa Alat", "Warung", "Toilet"],
        highlight: "Air jernih emerald & terumbu karang.",
        image: "https://images.unsplash.com/photo-1771521414786-1dec542f67af?w=500",
        open: true,
    },
    {
        id: 4,
        name: "Pantai Melayu",
        kecamatan: "Batam Center",
        latitude: 1.0220,
        longitude: 104.0310,
        rating: 4.6,
        reviews: 980,
        category: "Sunset",
        price: "Gratis",
        priceType: "free",
        jam: "Buka 24 jam",
        akses: "5 km dari pusat kota",
        aksesMode: "Mudah, angkutan umum",
        fasilitas: ["Kuliner", "Parkir", "Area Bermain"],
        highlight: "Lokasi strategis dengan pemandangan sunset ikonik.",
        image: "https://images.unsplash.com/photo-1762895619964-601c024165df?w=500",
        open: true,
    },
];

// ================================================================
// 4. HOOK UNTUK FETCH DATA (menggunakan /api/rekomendasi)
// ================================================================
function useBeaches() {
    const [beaches, setBeaches] = useState<Beach[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBeaches = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3000";
            const res = await fetch(`${API_BASE}/api/rekomendasi`);

            if (!res.ok) {
                throw new Error(`HTTP ${res.status} - ${res.statusText}`);
            }

            const result = await res.json();
            let rawData = result.data ?? result;

            if (!Array.isArray(rawData)) {
                throw new Error("Data dari API bukan array");
            }

            // Mapping ke format Beach
            const mapped: Beach[] = rawData.map((item: any) => {
                const badge = (item.badge || "").toLowerCase();
                let category: Beach["category"] = "Keluarga";
                if (badge.includes("resort")) category = "Resort";
                else if (badge.includes("snorkel")) category = "Snorkeling";
                else if (badge.includes("sunset")) category = "Sunset";

                const fasObj = item.fasilitas || {};
                const fasilitasList: string[] = [];
                if (fasObj.toilet) fasilitasList.push("Toilet");
                if (fasObj.mushola) fasilitasList.push("Mushola");
                if (fasObj.warungMakan) fasilitasList.push("Warung Makan");
                if (fasObj.parkirMotor || fasObj.parkirMobil) fasilitasList.push("Parkir");
                if (fasObj.gazebo) fasilitasList.push("Gazebo");
                if (fasObj.sewaAlat) fasilitasList.push("Sewa Alat");
                if (fasObj.penginapan) fasilitasList.push("Penginapan");
                if (fasObj.wifi) fasilitasList.push("WiFi");
                if (fasObj.penjagaPantai) fasilitasList.push("Penjaga Pantai");
                if (fasilitasList.length === 0) fasilitasList.push("Toilet", "Parkir");

                const price = item.tiketMasuk || "Gratis";
                const priceType: "free" | "paid" = price.toLowerCase() === "gratis" ? "free" : "paid";

                return {
                    id: Number(item.id) || 0,
                    name: item.name || "",
                    kecamatan: item.kecamatan || "",
                    latitude: item.koordinat?.lat || 0,
                    longitude: item.koordinat?.lng || 0,
                    rating: item.rating || 0,
                    reviews: item.reviews || 0,
                    category,
                    price,
                    priceType,
                    jam: item.jamBuka || "Buka 24 jam",
                    akses: item.jarakLabel || "0 km",
                    aksesMode: item.aksesJalan || "Kendaraan pribadi",
                    fasilitas: fasilitasList,
                    highlight: item.highlight || "",
                    image: item.image || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500",
                    open: true,
                };
            });

            // Filter yang memiliki koordinat valid
            const valid = mapped.filter(b => b.latitude !== 0 && b.longitude !== 0);
            setBeaches(valid.length > 0 ? valid : mapped);
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Gagal memuat data";
            setError(msg);
            if (process.env.NODE_ENV === "development") {
                console.warn("Gunakan mock data karena error:", msg);
                setBeaches(MOCK_BEACHES);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBeaches();
    }, [fetchBeaches]);

    return { beaches, loading, error, refetch: fetchBeaches };
}

// ================================================================
// 5. KOMPONEN UI: QuickStat, DetailCard, ListRow
// ================================================================
function QuickStat({ icon: Icon, label, value, color }: any) {
    return (
        <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}18` }}>
                <Icon className="w-3.5 h-3.5" style={{ color }} />
            </div>
            <div>
                <p className="text-[10px] text-slate-400 leading-none">{label}</p>
                <p className="text-slate-700 font-bold text-xs leading-snug">{value}</p>
            </div>
        </div>
    );
}

function BeachDetailCard({ beach, onClose }: { beach: Beach; onClose: () => void }) {
    const cat = CATEGORY_CONFIG[beach.category];
    const pinColor = cat.color;
    const pinGlow = cat.glow;
    const CategoryIcon = cat.Icon;
    return (
        <div className="bg-white rounded-[22px] border border-slate-100 shadow-xl shadow-blue-900/8 overflow-hidden flex flex-col">
            <div className="relative h-36 overflow-hidden flex-shrink-0">
                <img src={beach.image} alt={beach.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/65 via-slate-900/10 to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-white text-[10px] font-black shadow-md" style={{ background: pinColor }}>
                    <CategoryIcon className="w-3 h-3" />
                    {beach.category}
                </div>
                <button onClick={onClose} className="absolute top-3 right-3 w-7 h-7 rounded-xl bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition-colors">
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
                            {[1, 2, 3, 4, 5].map(s => (
                                <Star key={s} className={`w-3 h-3 ${s <= Math.floor(beach.rating) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}`} />
                            ))}
                        </div>
                        <span className="text-slate-800 font-black text-sm">{beach.rating}</span>
                        <span className="text-slate-400 text-[10px]">({beach.reviews.toLocaleString("id-ID")})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${beach.open ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-slate-50 text-slate-500 border-slate-100"}`}>
                            {beach.open ? "● Buka" : "● Tutup"}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${beach.priceType === "free" ? "bg-blue-50 text-blue-700 border border-blue-100" : "bg-amber-50 text-amber-700 border border-amber-100"}`}>
                            {beach.price}
                        </span>
                    </div>
                </div>
                <p className="text-slate-500 text-[12px] leading-relaxed border-l-2 border-blue-200 pl-3 bg-blue-50/50 py-1.5 rounded-r-xl">{beach.highlight}</p>
                <div className="grid grid-cols-2 gap-2.5">
                    <QuickStat icon={Clock} label="Jam Operasional" value={beach.jam} color="#3B82F6" />
                    <QuickStat icon={Car} label="Jarak" value={beach.akses} color="#F59E0B" />
                    <QuickStat icon={Navigation} label="Moda Akses" value={beach.aksesMode} color="#10B981" />
                    <QuickStat icon={Waves} label="Fasilitas" value={beach.fasilitas.slice(0, 2).join(", ")} color="#8B5CF6" />
                </div>
                <div className="flex flex-wrap gap-1.5">
                    {beach.fasilitas.map(f => (
                        <span key={f} className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 border border-slate-200">{f}</span>
                    ))}
                </div>
                <a href={`https://www.google.com/maps/search/${encodeURIComponent(beach.name + " Batam")}`} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-black text-white shadow-lg transition-all duration-200" style={{ background: `linear-gradient(135deg, ${pinColor}, ${pinColor}dd)`, boxShadow: `0 8px 20px ${pinGlow}` }}>
                    <ExternalLink className="w-4 h-4" />
                    Lihat Lokasi di Peta
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
            </div>
        </div>
    );
}

function BeachListRow({ beach, isActive, onClick }: { beach: Beach; isActive: boolean; onClick: () => void }) {
    const cat = CATEGORY_CONFIG[beach.category];
    return (
        <button onClick={onClick} className={`w-full flex items-center gap-3 p-3 rounded-2xl border-2 text-left transition-all duration-200 group ${isActive ? "border-blue-200 bg-blue-50/60 shadow-sm" : "border-transparent hover:border-slate-200 hover:bg-slate-50"}`}>
            <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                <img src={beach.image} alt={beach.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-white shadow-sm" style={{ background: cat.color }} />
            </div>
            <div className="flex-1 min-w-0">
                <p className={`text-[13px] font-bold truncate leading-tight ${isActive ? "text-blue-700" : "text-slate-800"}`}>{beach.name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                    <MapPin className="w-2.5 h-2.5 text-slate-400 flex-shrink-0" />
                    <span className="text-slate-400 text-[10px] truncate">{beach.kecamatan.split(",")[0]}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                    <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400 flex-shrink-0" />
                    <span className="text-slate-600 text-[11px] font-bold">{beach.rating}</span>
                    <span className="text-slate-300 text-[10px]">·</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${beach.open ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>{beach.open ? "Buka" : "Tutup"}</span>
                </div>
            </div>
            <ChevronRight className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-blue-500 translate-x-0.5" : "text-slate-300 group-hover:text-slate-400"} transition-all duration-200`} />
        </button>
    );
}

// ================================================================
// 6. KOMPONEN PETA LEAFLET (dengan nama di marker)
// ================================================================

// Import CSS Leaflet di sini (agar tidak perlu di layout)
import "leaflet/dist/leaflet.css";

// Komponen dinamis
const MapWithLeaflet = dynamic(
    () =>
        import("react-leaflet").then(({ MapContainer, TileLayer, Marker, Popup, useMap }) => {
            // Komponen untuk resize
            function MapResize() {
                const map = useMap();
                useEffect(() => {
                    // Tunggu render selesai lalu invalidate size
                    setTimeout(() => map.invalidateSize(), 200);
                }, []);
                return null;
            }

            return function MapComponent({
                beaches,
                activeId,
                setActiveId,
                centerLat,
                centerLng,
                zoom,
            }: {
                beaches: Beach[];
                activeId: number | null;
                setActiveId: (id: number) => void;
                centerLat: number;
                centerLng: number;
                zoom: number;
            }) {
                useEffect(() => {
                    // Perbaiki icon default Leaflet
                    // @ts-ignore
                    delete L.Icon.Default.prototype._getIconUrl;
                    L.Icon.Default.mergeOptions({
                        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
                        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
                        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
                    });
                }, []);

                return (
                    <MapContainer
                        key={`${centerLat}-${centerLng}-${zoom}`}
                        center={[centerLat, centerLng]}
                        zoom={zoom}
                        className="w-full h-full"
                        zoomControl={false}
                        scrollWheelZoom={true}
                        style={{ background: "#e5e7eb" }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; OpenStreetMap contributors'
                        />
                        <MapResize />
                        {beaches.map((beach) => {
                            const cat = CATEGORY_CONFIG[beach.category];
                            const isActive = activeId === beach.id;
                            const icon = L.divIcon({
                                className: "custom-marker",
                                html: `
                                    <div style="display:flex;flex-direction:column;align-items:center;cursor:pointer;transform:translateY(-10px);">
                                        <div style="background:${cat.color};width:36px;height:36px;border-radius:50%;border:3px solid ${isActive ? 'white' : cat.color};box-shadow:0 2px 12px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;transition:all 0.2s;">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                        </div>
                                        <div style="background:${isActive ? '#2563eb' : 'white'};color:${isActive ? 'white' : '#1e293b'};font-size:10px;font-weight:bold;padding:2px 10px;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.15);margin-top:-6px;white-space:nowrap;max-width:150px;overflow:hidden;text-overflow:ellipsis;border:1px solid ${isActive ? '#2563eb' : '#e2e8f0'};transition:all 0.2s;">
                                            ${beach.name}
                                        </div>
                                    </div>
                                `,
                                iconSize: [0, 0],
                                iconAnchor: [18, 18],
                                popupAnchor: [0, -36],
                            });

                            return (
                                <Marker
                                    key={beach.id}
                                    position={[beach.latitude, beach.longitude]}
                                    icon={icon}
                                    eventHandlers={{
                                        click: () => setActiveId(beach.id),
                                    }}
                                >
                                    <Popup>
                                        <div className="text-center">
                                            <p className="font-bold text-sm">{beach.name}</p>
                                            <p className="text-xs text-slate-500">{beach.kecamatan}</p>
                                            <p className="text-xs font-semibold" style={{ color: cat.color }}>
                                                ⭐ {beach.rating} · {beach.category}
                                            </p>
                                        </div>
                                    </Popup>
                                </Marker>
                            );
                        })}
                    </MapContainer>
                );
            };
        }),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-full flex items-center justify-center bg-slate-100 rounded-[28px]">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        ),
    }
);

// ================================================================
// 7. KOMPONEN UTAMA MapPreview
// ================================================================
export function MapPreview() {
    const { beaches, loading, error, refetch } = useBeaches();
    const [activeId, setActiveId] = useState<number | null>(null);
    const [mapZoom, setMapZoom] = useState(12);

    useEffect(() => {
        if (beaches.length > 0 && activeId === null) {
            setActiveId(beaches[0].id);
        }
    }, [beaches, activeId]);

    const activeBeach = beaches.find(b => b.id === activeId) ?? beaches[0] ?? null;
    const centerLat = activeBeach?.latitude ?? 1.045;
    const centerLng = activeBeach?.longitude ?? 104.045;

    const handleZoomIn = useCallback(() => setMapZoom(z => Math.min(z + 0.5, 18)), []);
    const handleZoomOut = useCallback(() => setMapZoom(z => Math.max(z - 0.5, 8)), []);

    return (
        <section
            id="peta"
            className="py-20 lg:py-28 relative overflow-hidden"
            style={{
                background: "linear-gradient(160deg, #F0F9FF 0%, #FFFFFF 40%, #FFFBEB 80%, #F8FAFF 100%)",
            }}
        >
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-amber-100/30 blur-3xl pointer-events-none" />

            <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 xl:px-8">
                {/* HEADER */}
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
                            {loading && " Sedang memuat data..."}
                        </p>

                        {error && (
                            <div className="mt-3 flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-2xl border border-red-100">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                <span className="text-sm font-medium">{error}</span>
                                <button onClick={refetch} className="ml-auto text-xs font-bold underline hover:no-underline">
                                    Coba lagi
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-0 bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden flex-shrink-0">
                        {[
                            { value: `${beaches.length}`, label: "Lokasi Pantai", color: "#3B82F6" },
                            { value: "4", label: "Kategori", color: "#F59E0B" },
                            { value: `${beaches.length * 3}+`, label: "Area Wisata", color: "#10B981" },
                        ].map((s, i) => (
                            <div key={i} className={`flex flex-col items-center px-5 py-3 ${i < 2 ? "border-r border-slate-100" : ""}`}>
                                <span className="font-black text-xl leading-none" style={{ color: s.color }}>
                                    {loading ? "..." : s.value}
                                </span>
                                <span className="text-slate-400 text-[10px] font-semibold mt-0.5 whitespace-nowrap">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* GRID MAP + SIDEBAR */}
                <div className="max-w-7xl mx-auto">
                    <div
                        className="relative rounded-[28px] overflow-hidden shadow-2xl border border-slate-200"
                        style={{ height: "650px" }}
                    >
                        {error ? (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50">
                                <AlertCircle className="w-10 h-10 text-red-500 mb-3" />
                                <p>Gagal memuat peta.</p>

                                <button
                                    onClick={refetch}
                                    className="mt-4 px-5 py-2 rounded-xl bg-blue-600 text-white"
                                >
                                    Muat Ulang
                                </button>
                            </div>
                        ) : (
                            <MapWithLeaflet
                                beaches={beaches}
                                activeId={activeId}
                                setActiveId={setActiveId}
                                centerLat={centerLat}
                                centerLng={centerLng}
                                zoom={mapZoom}
                            />
                        )}

                        {/* Zoom */}
                        <div className="absolute top-4 right-4 flex flex-col gap-2 z-30">
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                <button
                                    onClick={handleZoomIn}
                                    className="w-11 h-11 flex items-center justify-center hover:bg-slate-100"
                                >
                                    <ZoomIn className="w-5 h-5" />
                                </button>

                                <button
                                    onClick={handleZoomOut}
                                    className="w-11 h-11 flex items-center justify-center border-t hover:bg-slate-100"
                                >
                                    <ZoomOut className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Tombol Google Maps */}
                        <div className="absolute bottom-5 right-5 z-30">
                            <a
                                href="https://www.google.com/maps/search/pantai+batam"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 rounded-2xl
                bg-blue-600 hover:bg-blue-700
                text-white font-semibold shadow-xl transition"
                            >
                                <Navigation className="w-5 h-5" />
                                Buka Peta Lengkap
                            </a>
                        </div>
                    </div>
                </div>
                {/* Tombol Buka Peta Lengkap */}
                <div className="absolute bottom-5 right-5 z-[1000]">
                    <a
                        href="https://www.google.com/maps/search/pantai+batam"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-white font-semibold shadow-xl hover:bg-blue-700 transition"
                    >
                        <Navigation className="w-5 h-5" />
                        Buka Peta Lengkap
                    </a>
                </div>
            </div>
        </section>
    );
}