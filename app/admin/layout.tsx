"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Waves,
  LayoutDashboard,
  Umbrella,
  MapPin,
  BarChart3,
  UserCircle,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { AdminDataProvider } from "@/context/AdminDataContext";

const NAV_ITEMS = [
  { href: "/admin/dasbor", label: "Dasbor", icon: LayoutDashboard },
  { href: "/admin/pantai", label: "Data Pantai", icon: Umbrella },
  { href: "/admin/lokasi", label: "Lokasi", icon: MapPin },
  { href: "/admin/statistik", label: "Statistik", icon: BarChart3 },
  { href: "/admin/akun", label: "Akun", icon: UserCircle },
] as const;

function SidebarContent({
  pathname,
  onLogout,
  onClose,
}: {
  pathname: string;
  onLogout: () => void;
  onClose?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-slate-700/50 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg">
          <Waves className="h-5 w-5 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-sm font-black text-white">
            Batam<span className="text-amber-400">Pantai</span>
          </p>
          <p className="text-[10px] font-semibold text-slate-400">
            Panel Admin
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin/dasbor" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-150 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-900/40"
                  : "text-slate-300 hover:bg-slate-700/60 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {isActive && (
                <ChevronRight className="h-3.5 w-3.5 opacity-70" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-700/50 p-3">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-400 transition-all hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          Keluar
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, logout } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoginPage = pathname === "/admin/masuk";

  useEffect(() => {
    if (!isAuthenticated && !isLoginPage) {
      router.replace("/admin/masuk");
    }
  }, [isAuthenticated, isLoginPage, router]);

  const handleLogout = () => {
    logout();
    router.replace("/admin/masuk");
  };

  // Login page — no shell
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Not authenticated yet (redirect in progress)
  if (!isAuthenticated) return null;

  return (
    <AdminDataProvider>
      <div className="flex h-screen bg-slate-950">
        {/* Desktop Sidebar */}
        <aside className="hidden w-60 flex-shrink-0 bg-slate-900 lg:flex lg:flex-col">
          <SidebarContent pathname={pathname} onLogout={handleLogout} />
        </aside>

        {/* Mobile Overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Mobile Sidebar Drawer */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 flex-shrink-0 bg-slate-900 transition-transform duration-300 lg:hidden ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute right-3 top-4 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-700 text-slate-300"
          >
            <X className="h-4 w-4" />
          </button>
          <SidebarContent
            pathname={pathname}
            onLogout={handleLogout}
            onClose={() => setMobileOpen(false)}
          />
        </div>

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Mobile topbar */}
          <header className="flex items-center gap-3 border-b border-slate-800 bg-slate-900 px-4 py-3 lg:hidden">
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-700 text-slate-300"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              <Waves className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-black text-white">
                Batam<span className="text-amber-400">Pantai</span>
              </span>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </AdminDataProvider>
  );
}
