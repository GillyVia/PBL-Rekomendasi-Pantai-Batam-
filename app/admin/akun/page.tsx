"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  UserCircle,
  LogOut,
  Umbrella,
  MapPin,
  BarChart3,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";

export default function AkunPage() {
  const { logout } = useAdminAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/admin/masuk");
  };

  const quickLinks = [
    { href: "/admin/pantai", label: "Data Pantai", icon: Umbrella },
    { href: "/admin/lokasi", label: "Kelola Lokasi", icon: MapPin },
    { href: "/admin/statistik", label: "Statistik", icon: BarChart3 },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-xl font-black text-white">Akun Admin</h1>
        <p className="mt-1 text-sm text-slate-400">
          Informasi akun dan pengaturan sesi.
        </p>
      </div>

      {/* Profile Card */}
      <div className="mb-6 rounded-2xl border border-slate-700/50 bg-slate-900 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-500/10">
            <UserCircle className="h-8 w-8 text-blue-400" />
          </div>
          <div>
            <p className="text-lg font-black text-white">admin</p>
            <p className="text-sm text-slate-400">Administrator</p>
            <div className="mt-1.5 flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400">
                Sesi Aktif
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-700/50 pt-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Username
            </p>
            <p className="mt-0.5 font-mono text-sm text-white">admin</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Role
            </p>
            <p className="mt-0.5 text-sm text-white">Super Admin</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Sistem
            </p>
            <p className="mt-0.5 text-sm text-white">BatamPantai v1.0</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Session Storage
            </p>
            <p className="mt-0.5 text-sm text-white">batampantai_admin_session</p>
          </div>
        </div>
      </div>

      {/* Quick Nav */}
      <div className="mb-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
          Menu Cepat
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center gap-3 rounded-xl border border-slate-700/50 bg-slate-900 px-4 py-3 transition-all hover:border-blue-500/40"
              >
                <Icon className="h-4 w-4 text-blue-400" />
                <span className="flex-1 text-sm font-semibold text-slate-300">
                  {link.label}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-600 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-400" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-bold text-red-400 transition-all hover:bg-red-500/20"
      >
        <LogOut className="h-4 w-4" />
        Keluar dari Sesi
      </button>
    </div>
  );
}
