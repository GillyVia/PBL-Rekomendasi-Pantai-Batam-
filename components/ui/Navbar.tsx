"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";

const NAV_ITEMS = [
  {
    id: "beranda",
    label: "Beranda",
    href: "#beranda",
    icon: Home,
  },
  {
    id: "daftar-pantai",
    label: "Daftar Pantai",
    href: "#destinasi",
    icon: List,
  },
  {
    id: "statistik",
    label: "Statistik",
    href: "#statistik",
    icon: BarChart3,
  },
  {
    id: "bandingkan",
    label: "Bandingkan Pantai",
    href: "#bandingkan",
    icon: Columns2,
  },
  {
    id: "peta",
    label: "Peta",
    href: "#peta",
    icon: Map,
  },
  {
    id: "chatbot",
    label: "Chatbot",
    href: "#bantuan",
    icon: MessageCircle,
    badge: true,
  },
] as const;

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const pct = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
      setProgress(Math.min(pct, 100));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return progress;
}

function MobileDrawer({
  open,
  onClose,
  activeId,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed right-0 top-0 bottom-0 z-50 flex w-[300px] translate-x-full flex-col bg-white shadow-2xl shadow-slate-900/20 transition-transform duration-300 ease-out lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <a href="#beranda" onClick={onClose} className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-md">
              <Waves className="h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[15px] font-black text-slate-900">
              Batam<span className="text-amber-400">Pantai</span>
            </span>
          </a>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeId === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => {
                  onSelect(item.id);
                  onClose();
                }}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-300"
                    : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                <div
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl ${
                    isActive ? "bg-white/20" : "bg-slate-100"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${
                      isActive ? "text-white" : "text-blue-500"
                    }`}
                  />
                </div>

                <span className="text-sm font-semibold">{item.label}</span>

                {"badge" in item && item.badge && !isActive && (
                  <span className="ml-auto h-2 w-2 flex-shrink-0 rounded-full bg-amber-400" />
                )}

                {isActive && <ArrowRight className="ml-auto h-4 w-4 opacity-70" />}
              </a>
            );
          })}
        </div>

        <div className="border-t border-slate-100 px-4 py-5">
          <p className="text-center text-[11px] font-medium text-slate-400">
            Platform wisata pantai #1 di Kepulauan Riau
          </p>
        </div>
      </div>
    </>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("beranda");
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isLight = scrolled;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isLight
            ? "border-b border-slate-100/80 bg-white/98 shadow-[0_1px_24px_rgba(30,64,175,0.07)] backdrop-blur-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="absolute top-0 left-0 right-0 z-10 h-[2px] bg-transparent">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-amber-400 transition-all duration-75"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 xl:px-8">
          <div
            className={`flex items-center gap-4 xl:gap-6 transition-all duration-300 ${
              scrolled ? "h-[58px]" : "h-[70px]"
            }`}
          >
            <a
              href="#beranda"
              onClick={() => setActiveId("beranda")}
              className="group flex flex-shrink-0 items-center gap-2.5"
            >
              <div className="relative flex-shrink-0">
                <div
                  className={`flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 shadow-lg shadow-blue-600/25 transition-all duration-300 group-hover:shadow-blue-600/40 ${
                    scrolled ? "h-8 w-8" : "h-9 w-9"
                  }`}
                >
                  <Waves
                    className={`text-white transition-all duration-300 ${
                      scrolled ? "h-4 w-4" : "h-[18px] w-[18px]"
                    }`}
                    strokeWidth={2.5}
                  />
                </div>

                <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full border-[1.5px] border-white bg-amber-400 shadow-sm" />
                </span>
              </div>

              <div className="flex flex-col leading-none">
                <span
                  className={`font-black tracking-tight transition-all duration-300 ${
                    scrolled ? "text-[15px]" : "text-[17px]"
                  } ${isLight ? "text-slate-900" : "text-white"}`}
                >
                  Batam<span className="text-amber-400">Pantai</span>
                </span>
                <span
                  className={`overflow-hidden text-[8.5px] font-bold uppercase tracking-[0.18em] transition-all duration-300 ${
                    scrolled ? "max-h-0 opacity-0" : "max-h-4 opacity-100"
                  } ${isLight ? "text-blue-400" : "text-blue-200/70"}`}
                >
                  Wisata Pantai Batam
                </span>
              </div>
            </a>

            <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeId === item.id;

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => setActiveId(item.id)}
                    className={`relative flex select-none items-center gap-1.5 rounded-xl px-3.5 py-2 text-[13px] font-semibold transition-all duration-200 ${
                      isActive
                        ? isLight
                          ? "bg-blue-50 text-blue-700"
                          : "bg-white/15 text-white"
                        : isLight
                        ? "text-slate-600 hover:bg-blue-50/70 hover:text-blue-700"
                        : "text-white/80 hover:bg-white/12 hover:text-white"
                    }`}
                  >
                    <Icon
                      className={`h-3.5 w-3.5 flex-shrink-0 transition-all duration-200 ${
                        isActive
                          ? `${isLight ? "text-blue-600" : "text-white"} opacity-100`
                          : "w-0 -mr-1.5 opacity-0"
                      }`}
                    />

                    <span>{item.label}</span>

                    {"badge" in item && item.badge && (
                      <span className="relative ml-0.5 flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
                      </span>
                    )}

                    {isActive && (
                      <span
                        className={`absolute bottom-0.5 left-1/2 h-[2px] -translate-x-1/2 rounded-full transition-all duration-300 ${
                          isLight ? "bg-blue-600/70" : "bg-white/60"
                        }`}
                        style={{ width: "calc(100% - 28px)" }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            <div className="ml-auto flex items-center gap-1.5 lg:hidden">
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className={`rounded-xl p-2 transition-colors ${
                  isLight
                    ? "text-slate-700 hover:bg-slate-100"
                    : "text-white hover:bg-white/12"
                }`}
                aria-label="Menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        activeId={activeId}
        onSelect={setActiveId}
      />
    </>
  );
}