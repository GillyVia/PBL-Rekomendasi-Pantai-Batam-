"use client";

import {
    Waves,
    MapPin,
    Mail,
    Globe,
    Send,
    MessageCircle,
    Share2,
    Heart,
    Star,
    ArrowUpRight,
    Anchor,
    Compass,
} from "lucide-react";

const SOCIALS = [
    {
        icon: Globe,
        label: "Instagram",
        handle: "@batampantai",
        hoverBg: "hover:bg-pink-500",
        hoverRing: "hover:ring-pink-500/30",
    },
    {
        icon: Send,
        label: "YouTube",
        handle: "BatamPantai TV",
        hoverBg: "hover:bg-red-500",
        hoverRing: "hover:ring-red-500/30",
    },
    {
        icon: MessageCircle,
        label: "Facebook",
        handle: "BatamPantai",
        hoverBg: "hover:bg-blue-500",
        hoverRing: "hover:ring-blue-500/30",
    },
    {
        icon: Share2,
        label: "X / Twitter",
        handle: "@batampantai",
        hoverBg: "hover:bg-sky-400",
        hoverRing: "hover:ring-sky-400/30",
    },
];

const TRUST_BADGES = [
    {
        icon: Star,
        label: "Destinasi Terbaik Kepri 2025",
        color: "#F59E0B",
    },
    {
        icon: Compass,
        label: "Terverifikasi Tim Kurasi Lokal",
        color: "#3B82F6",
    },
    {
        icon: Anchor,
        label: "Platform Wisata Ramah Lingkungan",
        color: "#10B981",
    },
];

const QUICK_LINKS = [
    "Syarat & Ketentuan",
    "Kebijakan Privasi",
    "Cookie",
    "Sitemap",
];

function Divider() {
    return (
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />
    );
}

function SocialBtn({
    icon: Icon,
    label,
    handle,
    hoverBg,
    hoverRing,
}: (typeof SOCIALS)[0]) {
    return (
        <a
            href="#"
            aria-label={label}
            title={handle}
            className={`group w-10 h-10 rounded-2xl bg-slate-800/80 border border-slate-700/50 ${hoverBg} ${hoverRing} hover:ring-2 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200`}
        >
            <Icon className="w-4 h-4" />
        </a>
    );
}


export function Footer() {
    return (
        <footer id="tentang" className="relative bg-slate-950 text-slate-400 overflow-hidden">
            <div className="relative -mb-1 pointer-events-none select-none" aria-hidden="true">
                <svg
                    viewBox="0 0 1440 90"
                    fill="none"
                    className="w-full block"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0 45 Q240 0 480 50 Q720 100 960 40 Q1200 -10 1440 55 L1440 90 L0 90 Z"
                        fill="rgba(30,41,59,0.5)"
                    />
                    <path
                        d="M0 60 Q180 20 360 55 Q540 90 720 45 Q900 0 1080 50 Q1260 95 1440 60 L1440 90 L0 90 Z"
                        fill="rgb(2 6 23)"
                    />
                </svg>
            </div>

            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-blue-600/5 blur-3xl" />
                <div className="absolute bottom-1/4 -right-24 w-72 h-72 rounded-full bg-amber-500/5 blur-3xl" />
            </div>

            <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 xl:px-8">
                <div className="py-14">
                    <div>
                        <a href="#beranda" className="flex items-center gap-3 mb-6 group w-fit">
                            <div className="relative w-11 h-11 rounded-[14px] bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-900/60">
                                <Waves className="w-5 h-5 text-white" strokeWidth={2.5} />
                            </div>
                            <div>
                                <p className="text-white font-black text-[20px] leading-none tracking-tight">
                                    Batam<span className="text-amber-400">Pantai</span>
                                </p>
                                <p className="text-slate-600 text-[9.5px] tracking-[0.22em] uppercase mt-1">
                                    Explore & Discover
                                </p>
                            </div>
                        </a>

                        <p className="text-slate-500 text-[13px] leading-relaxed mb-7 max-w-xs">
                            Platform rekomendasi wisata pantai terlengkap dan terpercaya di
                            Batam untuk membantu wisatawan menemukan destinasi terbaik.
                        </p>

                        <div className="flex flex-col gap-2.5 mb-7">
                            {TRUST_BADGES.map((badge) => (
                                <div key={badge.label} className="flex items-center gap-2.5">
                                    <div
                                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                                        style={{ background: `${badge.color}18` }}
                                    >
                                        <badge.icon className="w-3 h-3" style={{ color: badge.color }} />
                                    </div>
                                    <span className="text-slate-500 text-[12px]">{badge.label}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2 mb-7">
                            {[
                                { icon: Mail, text: "halo@batampantai.id" },
                                { icon: MapPin, text: "Batam Center, Kepulauan Riau" },
                            ].map((c) => (
                                <div key={c.text} className="flex items-center gap-2.5">
                                    <c.icon className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                                    <span className="text-slate-500 text-[12px]">{c.text}</span>
                                </div>
                            ))}
                        </div>

                        <div>
                            <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-3">
                                Ikuti Kami
                            </p>
                            <div className="flex gap-2">
                                {SOCIALS.map((s) => (
                                    <SocialBtn key={s.label} {...s} />
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

                <Divider />

                <div className="py-7 flex flex-col md:flex-row items-center justify-between gap-5">
                    <div className="flex flex-col items-center md:items-start gap-1.5">
                        <p className="text-slate-600 text-[12px] flex items-center gap-1.5 flex-wrap justify-center md:justify-start">
                            © 2026 <strong className="text-slate-500">BatamPantai</strong>
                            <span className="text-slate-800">·</span>
                            Dibuat dengan
                            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline-block mx-0.5" />
                            untuk pecinta pantai Indonesia
                        </p>
                        <p className="text-slate-700 text-[11px]">
                            Seluruh konten bersifat informatif dan tidak mengandung unsur komersial tersembunyi.
                        </p>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-3">
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 justify-center">
                            {QUICK_LINKS.map((item) => (
                                <a
                                    key={item}
                                    href="#"
                                    className="text-slate-600 hover:text-blue-400 text-[11.5px] transition-colors"
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                        <a
                            href="#beranda"
                            className="group flex items-center gap-1.5 text-slate-600 hover:text-blue-400 text-[11.5px] transition-colors"
                        >
                            <span>Kembali ke atas</span>
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}