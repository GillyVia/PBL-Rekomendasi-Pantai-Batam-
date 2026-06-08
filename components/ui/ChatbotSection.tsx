"use client";

import { useState, useRef, useEffect } from "react";
import {
    MessageCircle,
    Send,
    X,
    Bot,
    User,
    MapPin,
    Star,
    ArrowRight,
    Sparkles,
    Clock,
    Minimize2,
    Maximize2,
    Waves,
    Sun,
    Compass,
    Camera,
    ChevronRight,
    Phone,
    Mail,
} from "lucide-react";

type Message = {
    id: number;
    role: "bot" | "user";
    text: string;
    suggestions?: string[];
    beachCard?: { name: string; rating: number; tag: string };
    timestamp: string;
};

const INITIAL_MESSAGES: Message[] = [
    {
        id: 1,
        role: "bot",
        text: "Halo! Selamat datang di BatamPantai 👋 Saya **WavesAI**, asisten perjalananmu. Mau mencari pantai apa hari ini?",
        suggestions: [
            "Pantai untuk keluarga",
            "Spot snorkeling terbaik",
            "Pantai gratis di Batam",
            "Rekomendasi sunset",
        ],
        timestamp: "10:30",
    },
];

const BOT_RESPONSES: Record<string, Message> = {
    "Pantai untuk keluarga": {
        id: 0,
        role: "bot",
        text: "Untuk wisata keluarga, saya sangat merekomendasikan **Pantai Nongsa**! Air tenang, pasir putih, dan fasilitas lengkap untuk anak-anak. 🏖️",
        beachCard: { name: "Pantai Nongsa", rating: 4.9, tag: "Favorit Keluarga" },
        suggestions: [
            "Jam buka pantai?",
            "Berapa biaya masuk?",
            "Ada fasilitas apa saja?",
        ],
        timestamp: "",
    },
    "Spot snorkeling terbaik": {
        id: 0,
        role: "bot",
        text: "Untuk snorkeling, **Pantai Melur** di Galang adalah pilihan terbaik! Air bening seperti kristal dengan terumbu karang masih alami. 🤿",
        beachCard: { name: "Pantai Melur", rating: 4.8, tag: "Snorkeling #1" },
        suggestions: ["Sewa alat snorkeling?", "Cara ke sana?", "Cocok untuk pemula?"],
        timestamp: "",
    },
    "Pantai gratis di Batam": {
        id: 0,
        role: "bot",
        text: "Ada beberapa pantai gratis yang keren di Batam! 🎉 Pantai Nongsa dan Pantai Melayu tidak memungut biaya masuk.",
        suggestions: ["Pantai Nongsa", "Pantai Melayu", "Pantai lainnya yang gratis?"],
        timestamp: "",
    },
    "Rekomendasi sunset": {
        id: 0,
        role: "bot",
        text: "Untuk sunset terbaik, kamu harus ke **Pantai Melayu**! Waktu terbaik pukul 17:30–18:30 WIB. Bawa kamera ya! 🌅",
        beachCard: { name: "Pantai Melayu", rating: 4.6, tag: "Sunset Spot" },
        suggestions: ["Parkir tersedia?", "Rekomendasi tempat makan?"],
        timestamp: "",
    },
};

const DEFAULT_RESPONSE: Message = {
    id: 0,
    role: "bot",
    text: "Terima kasih atas pertanyaannya! 😊 Untuk info lebih detail, kamu juga bisa menghubungi kami via WhatsApp.",
    suggestions: [
        "Kembali ke menu utama",
        "Pantai untuk keluarga",
        "Spot snorkeling terbaik",
    ],
    timestamp: "",
};

const TEASER_CHIPS = [
    {
        icon: Waves,
        label: "Pantai terbaik untuk keluarga",
        color: "#3B82F6",
        bg: "#EFF6FF",
        border: "#BFDBFE",
    },
    {
        icon: Camera,
        label: "Spot foto sunset paling cantik",
        color: "#F97316",
        bg: "#FFF7ED",
        border: "#FED7AA",
    },
    {
        icon: Compass,
        label: "Cara menuju Pantai Melur",
        color: "#06B6D4",
        bg: "#ECFEFF",
        border: "#A5F3FC",
    },
    {
        icon: Sun,
        label: "Pantai gratis di Batam",
        color: "#F59E0B",
        bg: "#FFFBEB",
        border: "#FDE68A",
    },
    {
        icon: MapPin,
        label: "Pantai dekat pusat kota",
        color: "#8B5CF6",
        bg: "#F5F3FF",
        border: "#DDD6FE",
    },
    {
        icon: Star,
        label: "Rekomendasi snorkeling terbaik",
        color: "#10B981",
        bg: "#ECFDF5",
        border: "#A7F3D0",
    },
    {
        icon: Clock,
        label: "Info jam buka & harga tiket",
        color: "#EC4899",
        bg: "#FDF2F8",
        border: "#FBCFE8",
    },
    {
        icon: Compass,
        label: "Pantai cocok untuk bulan madu",
        color: "#6366F1",
        bg: "#EEF2FF",
        border: "#C7D2FE",
    },
];

function ChatWindow({ onClose }: { onClose: () => void }) {
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const [minimized, setMinimized] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, typing]);

    const now = () =>
        new Date().toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
        });

    const addBotReply = (suggestion: string): void => {
        const userMsg: Message = {
            id: Date.now(),
            role: "user",
            text: suggestion,
            timestamp: now(),
        };

        setMessages(prev => [...prev, userMsg]);
        setTyping(true);

        setTimeout(() => {
            const response = BOT_RESPONSES[suggestion] || DEFAULT_RESPONSE;

            setTyping(false);

            setMessages(prev => [
                ...prev,
                {
                    ...response,
                    id: Date.now(),
                    timestamp: now(),
                },
            ]);
        }, 1200 + Math.random() * 600);
    };
    const handleSend = () => {
        const text = input.trim();

        if (!text) return;

        setInput("");
        addBotReply(text);
    };

    return (
        <div
            className={`flex flex-col overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-2xl shadow-blue-900/20 transition-all duration-300 ${minimized ? "h-14" : "h-[500px]"
                }`}
            style={{ width: 380, maxWidth: "calc(100vw - 32px)" }}
        >
            <div className="flex flex-shrink-0 items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-white/20">
                        <Bot className="h-5 w-5 text-white" />
                        <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-blue-600 bg-emerald-400" />
                    </div>

                    <div>
                        <p className="text-sm font-black text-white">WavesAI</p>
                        <p className="flex items-center gap-1 text-[10px] text-blue-200">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            Online · Respons instan
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setMinimized(!minimized)}
                        className="flex h-7 w-7 items-center justify-center rounded-xl bg-white/15 text-white/80 transition-all hover:bg-white/25 hover:text-white"
                    >
                        {minimized ? (
                            <Maximize2 className="h-3.5 w-3.5" />
                        ) : (
                            <Minimize2 className="h-3.5 w-3.5" />
                        )}
                    </button>

                    <button
                        onClick={onClose}
                        className="flex h-7 w-7 items-center justify-center rounded-xl bg-white/15 text-white/80 transition-all hover:bg-white/25 hover:text-white"
                    >
                        <X className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>

            {!minimized && (
                <>
                    <div className="flex-1 space-y-4 overflow-y-auto bg-gradient-to-b from-slate-50/50 to-white px-4 py-4">
                        {messages.map((msg) => (
                            <div
                                key={`msg-${msg.id}`}
                                className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""
                                    }`}
                            >
                                <div
                                    className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${msg.role === "bot" ? "bg-blue-600" : "bg-slate-700"
                                        }`}
                                >
                                    {msg.role === "bot" ? (
                                        <Bot className="h-3.5 w-3.5 text-white" />
                                    ) : (
                                        <User className="h-3.5 w-3.5 text-white" />
                                    )}
                                </div>

                                <div
                                    className={`flex max-w-[78%] flex-col gap-2 ${msg.role === "user" ? "items-end" : ""
                                        }`}
                                >
                                    <div
                                        className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${msg.role === "bot"
                                                ? "rounded-tl-sm border border-slate-100 bg-white text-slate-700 shadow-sm"
                                                : "rounded-tr-sm bg-blue-600 text-white"
                                            }`}
                                    >
                                        {msg.text.split("**").map((part, i) =>
                                            i % 2 === 1 ? (
                                                <strong
                                                    key={`p-${i}`}
                                                    className={
                                                        msg.role === "bot"
                                                            ? "text-slate-900"
                                                            : "text-white"
                                                    }
                                                >
                                                    {part}
                                                </strong>
                                            ) : (
                                                <span key={`p-${i}`}>{part}</span>
                                            ),
                                        )}
                                    </div>

                                    {msg.beachCard && (
                                        <div className="w-full rounded-2xl border border-blue-100 bg-white p-3 shadow-sm">
                                            <div className="mb-2 flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs font-bold text-slate-900">
                                                        {msg.beachCard.name}
                                                    </p>

                                                    <div className="mt-0.5 flex items-center gap-1">
                                                        <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                                                        <span className="text-xs font-semibold text-slate-600">
                                                            {msg.beachCard.rating}
                                                        </span>
                                                    </div>
                                                </div>

                                                <span className="rounded-lg bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                                                    {msg.beachCard.tag}
                                                </span>
                                            </div>

                                            <button className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-600 py-1.5 text-[11px] font-bold text-white">
                                                <MapPin className="h-3 w-3" />
                                                Lihat Detail
                                            </button>
                                        </div>
                                    )}

                                    {msg.suggestions && (
                                        <div className="flex flex-wrap gap-1.5">
                                            {msg.suggestions.map((suggestion) => (
                                                <button
                                                    key={`sug-${suggestion}`}
                                                    onClick={() => addBotReply(suggestion)}
                                                    className="rounded-xl border border-blue-100 bg-blue-50 px-2.5 py-1.5 text-[11px] font-medium text-blue-700 transition-colors hover:bg-blue-100"
                                                >
                                                    {suggestion}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    <p className="text-[10px] text-slate-300">
                                        {msg.timestamp}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {typing && (
                            <div className="flex items-center gap-2.5">
                                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600">
                                    <Bot className="h-3.5 w-3.5 text-white" />
                                </div>

                                <div className="rounded-2xl rounded-tl-sm border border-slate-100 bg-white px-4 py-3 shadow-sm">
                                    <div className="flex items-center gap-1">
                                        {[0, 1, 2].map((i) => (
                                            <div
                                                key={`dot-${i}`}
                                                className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400"
                                                style={{ animationDelay: `${i * 0.15}s` }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={bottomRef} />
                    </div>

                    <div className="flex-shrink-0 border-t border-slate-100 px-4 pb-4 pt-2">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                placeholder="Tanya apapun tentang pantai Batam..."
                                className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                            />

                            <button
                                onClick={handleSend}
                                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-300 transition-colors hover:bg-blue-700"
                            >
                                <Send className="h-4 w-4" />
                            </button>
                        </div>

                        <p className="mt-2 text-center text-[10px] text-slate-300">
                            WavesAI · Ditenagai kecerdasan buatan
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}

function AssistantCard({ onStartChat }: { onStartChat: () => void }) {
    return (
        <div className="relative overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-xl shadow-blue-900/[0.08]">
            <div className="relative h-28 overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400">
                <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10" />
                <div className="absolute -bottom-8 -left-4 h-24 w-24 rounded-full bg-white/[0.08]" />
            </div>

            <div className="relative z-10 -mt-11 flex justify-center">
                <div className="relative">
                    <div className="absolute inset-0 scale-110 rounded-full bg-blue-400/30 blur-md" />

                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-blue-600 to-cyan-500 shadow-xl">
                        <Bot className="h-9 w-9 text-white" />
                    </div>

                    <div className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full border-[3px] border-white bg-emerald-400 shadow-md">
                        <div className="h-2 w-2 rounded-full bg-white" />
                    </div>
                </div>
            </div>

            <div className="px-6 pb-5 pt-3 text-center">
                <div className="mb-0.5 flex items-center justify-center gap-2">
                    <h3 className="text-xl font-black tracking-tight text-slate-900">
                        WavesAI
                    </h3>

                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100">
                        <Sparkles className="h-2.5 w-2.5 text-blue-600" />
                    </div>
                </div>

                <p className="text-[13px] text-slate-500">
                    Asisten Perjalanan Pantai Batam
                </p>

                <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5">
                    <span className="relative flex">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-60" />
                    </span>

                    <span className="text-[11px] font-black text-emerald-700">
                        Online · Respons &lt; 3 detik
                    </span>
                </div>
            </div>

            <div className="mx-6 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            <div className="grid grid-cols-3 divide-x divide-slate-100 px-2 py-4">
                {[
                    { value: "45+", label: "Pantai\nTercover" },
                    { value: "2.800+", label: "Pertanyaan\nDijawab" },
                    { value: "24/7", label: "Siap\nMembantu" },
                ].map((stat, i) => (
                    <div key={`stat-${i}`} className="px-3 text-center">
                        <p className="text-base font-black leading-none text-blue-600">
                            {stat.value}
                        </p>

                        <p className="mt-1 whitespace-pre-line text-[10px] font-semibold leading-snug text-slate-400">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mx-6 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            <div className="px-6 py-5">
                <p className="mb-3 text-[11px] font-black uppercase tracking-widest text-slate-500">
                    Yang Bisa Saya Bantu
                </p>

                <div className="space-y-2.5">
                    {[
                        {
                            icon: MapPin,
                            text: "Rekomendasi pantai sesuai preferensimu",
                            color: "#3B82F6",
                        },
                        {
                            icon: Compass,
                            text: "Panduan rute & moda transportasi ke pantai",
                            color: "#F59E0B",
                        },
                        {
                            icon: Star,
                            text: "Info rating, fasilitas & harga tiket masuk",
                            color: "#10B981",
                        },
                        {
                            icon: Sun,
                            text: "Saran waktu terbaik & kondisi cuaca pantai",
                            color: "#F97316",
                        },
                    ].map((item, i) => {
                        const Icon = item.icon;

                        return (
                            <div key={`cap-${i}`} className="flex items-center gap-3">
                                <div
                                    className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl"
                                    style={{ background: `${item.color}18` }}
                                >
                                    <Icon
                                        className="h-3.5 w-3.5"
                                        style={{ color: item.color }}
                                    />
                                </div>

                                <p className="text-[12px] leading-snug text-slate-600">
                                    {item.text}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="px-6 pb-6">
                <button
                    onClick={onStartChat}
                    className="group flex w-full items-center justify-center gap-3 rounded-2xl py-4 font-black text-white shadow-xl shadow-blue-300/40 transition-all duration-200 hover:shadow-blue-400/55 active:scale-[0.98]"
                    style={{
                        background:
                            "linear-gradient(135deg, #2563EB 0%, #1D4ED8 50%, #1E40AF 100%)",
                    }}
                >
                    <MessageCircle className="h-5 w-5" />
                    <span className="text-[15px]">Mulai Chat</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>

                <p className="mt-2.5 text-center text-[10px] font-medium text-slate-400">
                    Gratis · Tanpa pendaftaran · Langsung dibalas
                </p>
            </div>
        </div>
    );
}

function ChatPreview() {
    const [showCard, setShowCard] = useState(false);
    const [showTyping, setShowTyping] = useState(false);

    useEffect(() => {
        const t1 = setTimeout(() => setShowTyping(true), 800);

        const t2 = setTimeout(() => {
            setShowTyping(false);
            setShowCard(true);
        }, 2400);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, []);

    return (
        <div className="flex flex-col overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-xl shadow-blue-900/[0.08]">
            <div className="flex flex-shrink-0 items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-4">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-white/20">
                    <Bot className="h-5 w-5 text-white" />
                    <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-blue-600 bg-emerald-400" />
                </div>

                <div className="flex-1">
                    <p className="text-sm font-black text-white">WavesAI</p>
                    <p className="flex items-center gap-1 text-[10px] text-blue-200">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Online sekarang
                    </p>
                </div>

                <div className="flex gap-1.5">
                    {["bg-red-400", "bg-amber-400", "bg-emerald-400"].map((color, i) => (
                        <div
                            key={`dot-win-${i}`}
                            className={`h-2.5 w-2.5 rounded-full opacity-80 ${color}`}
                        />
                    ))}
                </div>
            </div>

            <div className="flex-1 space-y-4 overflow-hidden bg-gradient-to-b from-slate-50/60 to-white px-4 pb-4 pt-5">
                <div className="flex items-start gap-2.5">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 shadow-sm shadow-blue-300">
                        <Bot className="h-3.5 w-3.5 text-white" />
                    </div>

                    <div className="max-w-[82%]">
                        <div className="rounded-2xl rounded-tl-sm border border-slate-100 bg-white px-4 py-3 shadow-sm">
                            <p className="text-[13px] leading-relaxed text-slate-700">
                                Halo! Saya <strong className="text-slate-900">WavesAI</strong>{" "}
                                👋 Mau ke pantai mana hari ini? Saya siap bantu cari rekomendasi
                                terbaik!
                            </p>
                        </div>

                        <p className="ml-1 mt-1 text-[10px] text-slate-300">
                            10:30
                        </p>
                    </div>
                </div>

                <div className="flex flex-row-reverse items-start gap-2.5">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-slate-700">
                        <User className="h-3.5 w-3.5 text-white" />
                    </div>

                    <div className="flex max-w-[82%] flex-col items-end">
                        <div className="rounded-2xl rounded-tr-sm bg-blue-600 px-4 py-3 shadow-sm">
                            <p className="text-[13px] leading-relaxed text-white">
                                Rekomendasikan pantai snorkeling di Batam!
                            </p>
                        </div>

                        <p className="mr-1 mt-1 text-[10px] text-slate-300">
                            10:31
                        </p>
                    </div>
                </div>

                {showTyping && !showCard && (
                    <div className="flex items-start gap-2.5">
                        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600">
                            <Bot className="h-3.5 w-3.5 text-white" />
                        </div>

                        <div className="rounded-2xl rounded-tl-sm border border-slate-100 bg-white px-4 py-3.5 shadow-sm">
                            <div className="flex items-center gap-1.5">
                                {[0, 1, 2].map((i) => (
                                    <div
                                        key={`prev-dot-${i}`}
                                        className="h-2 w-2 animate-bounce rounded-full bg-blue-400"
                                        style={{ animationDelay: `${i * 0.15}s` }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {showCard && (
                    <div className="flex items-start gap-2.5">
                        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 shadow-sm shadow-blue-300">
                            <Bot className="h-3.5 w-3.5 text-white" />
                        </div>

                        <div className="flex max-w-[82%] flex-col gap-2">
                            <div className="rounded-2xl rounded-tl-sm border border-slate-100 bg-white px-4 py-3 shadow-sm">
                                <p className="text-[13px] leading-relaxed text-slate-700">
                                    <strong className="text-slate-900">Pantai Melur</strong> di
                                    Galang adalah pilihan terbaik! Air jernih emerald & terumbu
                                    karang alami. 🤿
                                </p>
                            </div>

                            <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 p-3.5 shadow-sm">
                                <div className="mb-2.5 flex items-center justify-between">
                                    <div>
                                        <p className="text-[13px] font-black text-slate-900">
                                            Pantai Melur
                                        </p>

                                        <div className="mt-0.5 flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <Star
                                                    key={`prev-s-${s}`}
                                                    className="h-2.5 w-2.5 fill-amber-400 text-amber-400"
                                                />
                                            ))}

                                            <span className="ml-1 text-[11px] font-black text-slate-600">
                                                4.8
                                            </span>
                                        </div>
                                    </div>

                                    <span className="rounded-xl border border-cyan-200 bg-cyan-100 px-2 py-0.5 text-[10px] font-black text-cyan-700">
                                        Snorkeling #1
                                    </span>
                                </div>

                                <div className="mb-2.5 flex gap-1.5">
                                    {["Terumbu Karang", "Sewa Alat", "Toilet"].map((tag) => (
                                        <span
                                            key={`tag-${tag}`}
                                            className="rounded-lg border border-slate-200 bg-white/80 px-2 py-0.5 text-[10px] font-semibold text-slate-600"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <button className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-600 py-2 text-[11px] font-black text-white shadow-sm shadow-blue-300 transition-colors hover:bg-blue-700">
                                    <MapPin className="h-3 w-3" />
                                    Lihat Detail Pantai
                                    <ChevronRight className="h-3 w-3" />
                                </button>
                            </div>

                            <p className="ml-1 text-[10px] text-slate-300">
                                10:31
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex-shrink-0 border-t border-slate-100 px-4 pb-4 pt-3">
                <div className="flex items-center gap-2">
                    <div className="flex flex-1 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                        <p className="flex-1 text-[13px] text-slate-400">
                            Tanya apapun tentang pantai Batam...
                        </p>

                        <div className="h-4 w-1 animate-pulse rounded-full bg-blue-400" />
                    </div>

                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-600 shadow-md shadow-blue-300">
                        <Send className="h-4 w-4 text-white" />
                    </div>
                </div>

                <p className="mt-2 text-center text-[10px] text-slate-300">
                    WavesAI · Ditenagai kecerdasan buatan
                </p>
            </div>
        </div>
    );
}

function SuggestionChips({
    onChipClick,
}: {
    onChipClick: (label: string) => void;
}) {
    return (
        <div className="flex flex-wrap gap-2.5">
            {TEASER_CHIPS.map((chip, i) => {
                const Icon = chip.icon;

                return (
                    <button
                        key={`chip-${i}`}
                        onClick={() => onChipClick(chip.label)}
                        className="group flex items-center gap-2 rounded-2xl border px-3.5 py-2.5 text-[12px] font-bold transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-95"
                        style={{
                            background: chip.bg,
                            borderColor: chip.border,
                            color: chip.color,
                        }}
                    >
                        <Icon className="h-3.5 w-3.5 flex-shrink-0" />
                        <span>{chip.label}</span>
                    </button>
                );
            })}
        </div>
    );
}

export function ChatbotSection() {
    const [chatOpen, setChatOpen] = useState(false);

    const handleStartChat = () => setChatOpen(true);

    return (
        <>
            <section
                id="bantuan"
                className="relative overflow-hidden py-20 lg:py-28"
                style={{
                    background:
                        "linear-gradient(160deg, #EFF6FF 0%, #FFFFFF 35%, #FFFBEB 70%, #F0FDFF 100%)",
                }}
            >
                <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 -translate-y-1/3 translate-x-1/4 rounded-full bg-blue-100/50 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 -translate-x-1/4 translate-y-1/3 rounded-full bg-amber-100/40 blur-3xl" />
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-100/30 blur-3xl" />

                <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 xl:px-8">
                    <div className="mx-auto mb-14 max-w-2xl text-center">
                        <div className="mb-5 flex items-center justify-center gap-3">
                            <div className="flex items-center gap-1.5">
                                <div className="h-[3px] w-7 rounded-full bg-blue-600" />
                                <div className="h-[3px] w-3.5 rounded-full bg-amber-400" />
                                <div className="h-[3px] w-2 rounded-full bg-blue-200" />
                            </div>

                            <span className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
                                Asisten AI
                            </span>

                            <div className="flex items-center gap-1.5">
                                <div className="h-[3px] w-2 rounded-full bg-blue-200" />
                                <div className="h-[3px] w-3.5 rounded-full bg-amber-400" />
                                <div className="h-[3px] w-7 rounded-full bg-blue-600" />
                            </div>
                        </div>

                        <h2 className="mb-5 text-3xl font-black leading-[1.1] tracking-tight text-slate-900 sm:text-4xl lg:text-[2.7rem]">
                            Bingung Mau ke{" "}
                            <span className="relative inline-block">
                                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                                    Pantai Mana?
                                </span>

                                <svg
                                    className="absolute -bottom-1 left-0 w-full overflow-visible"
                                    viewBox="0 0 100 5"
                                    fill="none"
                                    preserveAspectRatio="none"
                                >
                                    <path
                                        d="M1 3.5 Q25 1 50 3.5 Q75 6 99 3.5"
                                        stroke="url(#chatLineGrad)"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />

                                    <defs>
                                        <linearGradient
                                            id="chatLineGrad"
                                            x1="0"
                                            y1="0"
                                            x2="1"
                                            y2="0"
                                        >
                                            <stop stopColor="#3B82F6" />
                                            <stop offset="1" stopColor="#06B6D4" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </span>
                        </h2>

                        <p className="text-base leading-relaxed text-slate-500 sm:text-lg">
                            Tanyakan saja ke{" "}
                            <strong className="text-slate-700">WavesAI</strong> — asisten
                            perjalanan cerdas yang siap merekomendasikan destinasi, info tiket,
                            rute, hingga waktu terbaik berkunjung.
                        </p>
                    </div>

                    <div className="grid items-start gap-8 lg:grid-cols-[360px_1fr] xl:grid-cols-[400px_1fr]">
                        <AssistantCard onStartChat={handleStartChat} />

                        <div className="flex flex-col gap-6">
                            <ChatPreview />

                            <div className="rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm">
                                <div className="mb-4 flex items-center gap-2.5">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50">
                                        <MessageCircle className="h-4 w-4 text-blue-600" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-black text-slate-800">
                                            Pertanyaan Populer
                                        </p>

                                        <p className="text-[11px] text-slate-400">
                                            Pilih salah satu atau tulis sendiri
                                        </p>
                                    </div>
                                </div>

                                <SuggestionChips
                                    onChipClick={(label) => {
                                        setChatOpen(true);
                                        console.log(label);
                                    }}
                                />

                                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                                    <p className="text-[11px] text-slate-400">
                                        Atau ketik pertanyaanmu sendiri di chat
                                    </p>

                                    <button
                                        onClick={handleStartChat}
                                        className="group flex items-center gap-1.5 text-[12px] font-black text-blue-600 transition-colors hover:text-blue-800"
                                    >
                                        Mulai Chat
                                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col items-start gap-4 rounded-[20px] border border-slate-100 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center">
                                <div className="flex-1">
                                    <p className="text-sm font-black text-slate-700">
                                        Lebih suka kontak langsung?
                                    </p>

                                    <p className="mt-0.5 text-[11px] text-slate-400">
                                        Tim kami siap membantu setiap hari pukul 07.00–22.00 WIB
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    {[
                                        {
                                            icon: Phone,
                                            label: "WhatsApp",
                                            value: "+62 811 7777 888",
                                            color: "#25D366",
                                            bg: "#F0FFF4",
                                        },
                                        {
                                            icon: Mail,
                                            label: "Email",
                                            value: "halo@batampantai.id",
                                            color: "#3B82F6",
                                            bg: "#EFF6FF",
                                        },
                                    ].map((contact, i) => {
                                        const Icon = contact.icon;

                                        return (
                                            <div
                                                key={`contact-${i}`}
                                                className="flex items-center gap-2 rounded-2xl border px-3.5 py-2.5"
                                                style={{
                                                    background: contact.bg,
                                                    borderColor: `${contact.color}30`,
                                                }}
                                            >
                                                <div
                                                    className="flex h-6 w-6 items-center justify-center rounded-xl"
                                                    style={{ background: `${contact.color}20` }}
                                                >
                                                    <Icon
                                                        className="h-3 w-3"
                                                        style={{ color: contact.color }}
                                                    />
                                                </div>

                                                <div>
                                                    <p
                                                        className="text-[10px] font-black leading-none"
                                                        style={{ color: contact.color }}
                                                    >
                                                        {contact.label}
                                                    </p>

                                                    <p className="text-[10px] font-semibold text-slate-600">
                                                        {contact.value}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
                {chatOpen && (
                    <div className="mb-2">
                        <ChatWindow onClose={() => setChatOpen(false)} />
                    </div>
                )}

                <button
                    onClick={() => setChatOpen(!chatOpen)}
                    className="relative flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-2xl shadow-blue-400/40 transition-all hover:shadow-blue-400/60 active:scale-95"
                    style={{ background: "linear-gradient(135deg, #2563EB, #1D4ED8)" }}
                >
                    {chatOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <MessageCircle className="h-6 w-6" />
                    )}

                    {!chatOpen && (
                        <>
                            <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[9px] font-black text-white shadow-md">
                                1
                            </span>

                            <span className="absolute inset-0 animate-ping rounded-2xl bg-blue-500 opacity-20" />
                        </>
                    )}
                </button>
            </div>
        </>
    );
}