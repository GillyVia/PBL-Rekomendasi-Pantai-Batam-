"use client";

import { useState, useEffect, useRef } from "react";
import {
  Waves,
  Home,
  List,
  BarChart3,
  Columns2,
  Map,
  MessageCircle,
  X,
  Menu,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Semua item termasuk Statistik
const NAV_ITEMS = [
  { id: "beranda", label: "Beranda", href: "#beranda", icon: Home },
  { id: "destinasi", label: "Daftar Pantai", href: "#destinasi", icon: List },
  { id: "statistik", label: "Statistik", href: "#statistik", icon: BarChart3 },
  { id: "bandingkan", label: "Bandingkan", href: "#bandingkan", icon: Columns2 },
  { id: "peta", label: "Peta", href: "#peta", icon: Map },
  { id: "bantuan", label: "Chatbot", href: "#bantuan", icon: MessageCircle, badge: true },
] as const;

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - doc.clientHeight;
      if (maxScroll <= 0) { setProgress(0); return; }
      setProgress(Math.min((doc.scrollTop / maxScroll) * 100, 100));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function MobileDrawer({ open, onClose, activeId, onSelect }: { open: boolean; onClose: () => void; activeId: string; onSelect: (id: string) => void }) {
  const router = useRouter();
  const handleAdminLogin = () => { onClose(); router.push("/admin/masuk"); };

  return (
    <>
      <div className={`fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`} onClick={onClose} />
      <div className={`fixed bottom-0 right-0 top-0 z-50 flex w-[300px] flex-col bg-white shadow-2xl shadow-slate-900/20 transition-transform duration-300 ease-out lg:hidden ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <a href="#beranda" onClick={onClose} className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-md">
              <Waves className="h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[15px] font-black text-slate-900">Batam<span className="text-amber-400">Pantai</span></span>
          </a>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200" aria-label="Tutup menu">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeId === item.id;
            return (
              <a key={item.id} href={item.href} onClick={() => { onSelect(item.id); onClose(); }} className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all ${isActive ? "bg-blue-600 text-white shadow-md shadow-blue-300" : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"}`}>
                <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl ${isActive ? "bg-white/20" : "bg-slate-100"}`}>
                  <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-blue-500"}`} />
                </div>
                <span className="text-sm font-semibold">{item.label}</span>
                {"badge" in item && item.badge && !isActive && <span className="ml-auto h-2 w-2 flex-shrink-0 rounded-full bg-amber-400" />}
                {isActive && <ArrowRight className="ml-auto h-4 w-4 opacity-70" />}
              </a>
            );
          })}
        </div>

        <div className="space-y-3 border-t border-slate-100 px-4 py-5">
          <button onClick={handleAdminLogin} className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-[12px] font-semibold text-slate-500 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
            Login Admin
          </button>
          <p className="text-center text-[11px] font-medium text-slate-400">Platform wisata pantai #1 di Kepulauan Riau</p>
        </div>
      </div>
    </>
  );
}

export function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("beranda");
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollProgress = useScrollProgress();

  // Ref untuk elemen nav item (desktop)
  const navRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

  // Observer untuk deteksi section aktif
  useEffect(() => {
    const sections = NAV_ITEMS.map(item =>
      document.getElementById(item.id)
    ).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find(entry => entry.isIntersecting);
        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      {
        threshold: 0.35,
        rootMargin: "-20% 0px -60% 0px",
      }
    );

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Update indicator saat activeId berubah
  const updateIndicator = () => {
    const activeElement = navRefs.current[activeId];
    if (activeElement) {
      const parent = activeElement.parentElement;
      if (parent) {
        const parentRect = parent.getBoundingClientRect();
        const rect = activeElement.getBoundingClientRect();
        setIndicatorStyle({
          left: rect.left - parentRect.left + (rect.width / 2) - 12, // setengah lebar indicator (24px / 2)
          width: rect.width * 0.5, // lebar indicator setengah dari item
        });
      }
    }
  };

  useEffect(() => {
    updateIndicator();
    // Update ulang saat window resize atau scroll (untuk menghitung ulang posisi)
    const handleResize = () => updateIndicator();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", updateIndicator, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", updateIndicator);
    };
  }, [activeId]);

  // Efek scroll untuk mengubah background navbar
  useEffect(() => {
    const onScroll = () => { setScrolled(window.scrollY > 28); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tutup mobile drawer saat layar lebar
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isLight = scrolled;
  const textBase = isLight ? "text-slate-700" : "text-white/85";
  const textActive = isLight ? "text-blue-700" : "text-white";
  const hoverBg = isLight ? "hover:bg-blue-50 hover:text-blue-700" : "hover:bg-white/12 hover:text-white";

  return (
    <>
      <nav className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${isLight ? "border-b border-slate-100/80 bg-white/98 shadow-[0_1px_32px_rgba(30,64,175,0.08)] backdrop-blur-2xl" : "bg-transparent"}`}>
        {/* Progress bar */}
        <div className="absolute left-0 right-0 top-0 z-10 h-[2.5px] bg-transparent">
          <div className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-amber-400 transition-all duration-75" style={{ width: `${scrollProgress}%` }} />
        </div>

        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 xl:px-8">
          <div className={`flex items-center gap-4 transition-all duration-300 xl:gap-6 ${scrolled ? "h-[60px]" : "h-[72px]"}`}>
            {/* Logo */}
            <a href="#beranda" onClick={() => setActiveId("beranda")} className="group flex flex-shrink-0 items-center gap-2.5">
              <div className="relative flex-shrink-0">
                <div className={`flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 shadow-lg shadow-blue-600/25 transition-all duration-300 group-hover:shadow-blue-600/40 ${scrolled ? "h-8 w-8" : "h-9 w-9"}`}>
                  <Waves className={`text-white transition-all duration-300 ${scrolled ? "h-4 w-4" : "h-[18px] w-[18px]"}`} strokeWidth={2.5} />
                </div>
                <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full border-[1.5px] border-white bg-amber-400 shadow-sm" />
                </span>
              </div>
              <div className="flex flex-col leading-none">
                <span className={`font-black tracking-tight transition-colors duration-300 ${scrolled ? "text-[15px]" : "text-[17px]"} ${isLight ? "text-slate-900" : "text-white"}`}>
                  Batam<span className="text-amber-400">Pantai</span>
                </span>
                <span className={`text-[8.5px] font-bold uppercase tracking-[0.18em] transition-all duration-300 ${scrolled ? "max-h-0 opacity-0" : "max-h-4 opacity-100"} ${isLight ? "text-blue-400" : "text-blue-200/70"}`}>
                  Wisata Pantai Batam
                </span>
              </div>
            </a>

            {/* Navbar items - desktop dengan indicator */}
            <div className="hidden flex-1 items-center justify-center gap-0.5 lg:flex relative">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeId === item.id;
                return (
                  <a
                    key={item.id}
                    ref={(el) => { navRefs.current[item.id] = el; }}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const target = document.getElementById(item.id);
                      if (target) {
                        target.scrollIntoView({ behavior: "smooth", block: "start" });
                        setActiveId(item.id);
                      }
                    }}
                    className={`group relative flex select-none items-center gap-1.5 rounded-xl px-3 py-2 text-[13px] font-semibold transition-all duration-200 ${textBase} ${hoverBg} ${isActive ? `${textActive} ${isLight ? "bg-blue-50" : "bg-white/15"}` : ""}`}
                  >
                    <Icon className={`flex-shrink-0 transition-all duration-200 ${isActive ? `h-3.5 w-3.5 opacity-100 ${isLight ? "text-blue-600" : "text-white"}` : "h-3.5 w-3.5 -ml-3.5 opacity-0 group-hover:ml-0 group-hover:opacity-100"}`} />
                    <span>{item.label}</span>
                    {"badge" in item && item.badge && (
                      <span className="relative ml-0.5 flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
                      </span>
                    )}
                  </a>
                );
              })}
              {/* Indicator garis bawah bergerak */}
              <span
                className="absolute bottom-0 h-[2.5px] rounded-full bg-gradient-to-r from-blue-500 to-amber-400 transition-all duration-300"
                style={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                }}
              />
            </div>

            {/* Login Admin (desktop) */}
            <div className="ml-auto hidden flex-shrink-0 items-center lg:flex">
              <button onClick={() => router.push("/admin/masuk")} className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-[12px] font-semibold transition-all duration-200 ${isLight ? "border-slate-200 bg-white text-slate-500 shadow-sm hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700" : "border-white/20 bg-white/10 text-white/70 backdrop-blur-sm hover:border-white/40 hover:bg-white/20 hover:text-white"}`} title="Masuk ke panel admin">
                <ShieldCheck className={`h-3.5 w-3.5 flex-shrink-0 ${isLight ? "text-amber-400" : "text-amber-300"}`} />
                <span>Login Admin</span>
              </button>
            </div>

            {/* Mobile menu toggle */}
            <div className="ml-auto flex items-center gap-1.5 lg:hidden">
              <button onClick={() => setMobileOpen((v) => !v)} className={`rounded-xl p-2 transition-colors ${isLight ? "text-slate-700" : "text-white"}`} aria-label="Menu">
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} activeId={activeId} onSelect={setActiveId} />
    </>
  );
}