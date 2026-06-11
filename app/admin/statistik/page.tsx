"use client";

import { useState } from "react";
import {
  Star,
  TrendingUp,
  Bookmark,
  Save,
  Loader2,
  CheckCircle2,
  BarChart3,
} from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";
import type { BeachFacility } from "@/types/beach";

type Tab = "rating" | "popularitas" | "fasilitas" | "suasana" | "akses";

const TABS: { id: Tab; label: string; icon: typeof Star }[] = [
  { id: "rating", label: "Rating & Ulasan", icon: Star },
  { id: "popularitas", label: "Popularitas", icon: TrendingUp },
  { id: "fasilitas", label: "Fasilitas", icon: Bookmark },
  { id: "suasana", label: "Suasana", icon: BarChart3 },
  { id: "akses", label: "Akses", icon: BarChart3 },
];

const FASILITAS_LABELS: Record<keyof BeachFacility, string> = {
  toilet: "Toilet",
  mushola: "Mushola",
  warungMakan: "Warung Makan",
  parkirMotor: "Parkir Motor",
  parkirMobil: "Parkir Mobil",
  gazebo: "Gazebo",
  sewaAlat: "Sewa Alat",
  penginapan: "Penginapan",
  wifi: "WiFi",
  penjagaPantai: "Penjaga Pantai",
};

export default function StatistikPage() {
  const { beaches, isLoading, updateBeach, toggleFeatured, toggleTrending } =
    useAdminData();
  const [activeTab, setActiveTab] = useState<Tab>("rating");
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [editData, setEditData] = useState<
    Record<string, Record<string, string | number | boolean>>
  >({});

  const getField = (
    beachId: string,
    field: string,
    defaultVal: string | number | boolean,
  ) => {
    return editData[beachId]?.[field] ?? defaultVal;
  };

  const setField = (
    beachId: string,
    field: string,
    value: string | number | boolean,
  ) => {
    setEditData((prev) => ({
      ...prev,
      [beachId]: { ...(prev[beachId] ?? {}), [field]: value },
    }));
  };

  const handleSave = async (beachId: string, payload: object) => {
    setSaving((p) => ({ ...p, [beachId]: true }));
    try {
      await updateBeach(beachId, payload);
      setSaved((p) => ({ ...p, [beachId]: true }));
      setTimeout(() => setSaved((p) => ({ ...p, [beachId]: false })), 2000);
    } finally {
      setSaving((p) => ({ ...p, [beachId]: false }));
    }
  };

  const inputCls =
    "w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16 text-slate-500">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-xl font-black text-white">Statistik & Skor</h1>
        <p className="mt-1 text-sm text-slate-400">
          Kelola rating, popularitas, fasilitas, dan skor J48 setiap pantai.
        </p>
      </div>

      {/* Summary */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-700/50 bg-slate-900 p-4">
          <p className="text-xs text-slate-500">Rata-rata Rating</p>
          <p className="mt-1 text-xl font-black text-white">
            {beaches.length > 0
              ? (
                  beaches.reduce((s, b) => s + b.rating, 0) / beaches.length
                ).toFixed(1)
              : "0.0"}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-700/50 bg-slate-900 p-4">
          <p className="text-xs text-slate-500">Trending</p>
          <p className="mt-1 text-xl font-black text-white">
            {beaches.filter((b) => b.trending).length}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-700/50 bg-slate-900 p-4">
          <p className="text-xs text-slate-500">Unggulan</p>
          <p className="mt-1 text-xl font-black text-white">
            {beaches.filter((b) => b.featured).length}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-700/50 bg-slate-900 p-4">
          <p className="text-xs text-slate-500">Total Ulasan</p>
          <p className="mt-1 text-xl font-black text-white">
            {beaches
              .reduce((s, b) => s + b.reviews, 0)
              .toLocaleString("id-ID")}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-5 flex gap-1 overflow-x-auto rounded-xl border border-slate-700/50 bg-slate-900 p-1">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {beaches.map((beach) => {
          const isSaving = saving[beach.id];
          const isSaved = saved[beach.id];

          return (
            <div
              key={beach.id}
              className="rounded-2xl border border-slate-700/50 bg-slate-900 p-4"
            >
              <div className="mb-3 flex items-center gap-3">
                {beach.image && (
                  <img
                    src={beach.image}
                    alt={beach.name}
                    className="h-9 w-9 flex-shrink-0 rounded-lg object-cover"
                  />
                )}
                <div>
                  <p className="font-bold text-white">{beach.name}</p>
                  <p className="text-xs text-slate-500">{beach.kecamatan}</p>
                </div>
              </div>

              {activeTab === "rating" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-[10px] font-semibold text-slate-500">
                      RATING (0-5)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={String(getField(beach.id, "rating", beach.rating))}
                      onChange={(e) =>
                        setField(beach.id, "rating", e.target.value)
                      }
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[10px] font-semibold text-slate-500">
                      JUMLAH ULASAN
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={String(
                        getField(beach.id, "reviews", beach.reviews),
                      )}
                      onChange={(e) =>
                        setField(beach.id, "reviews", e.target.value)
                      }
                      className={inputCls}
                    />
                  </div>
                </div>
              )}

              {activeTab === "popularitas" && (
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        getField(
                          beach.id,
                          "featured",
                          beach.featured ?? false,
                        ) as boolean
                      }
                      onChange={() => void toggleFeatured(beach.id)}
                      className="h-4 w-4 accent-blue-500"
                    />
                    <span className="text-sm text-slate-300">Unggulan</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        getField(
                          beach.id,
                          "trending",
                          beach.trending,
                        ) as boolean
                      }
                      onChange={() => void toggleTrending(beach.id)}
                      className="h-4 w-4 accent-rose-500"
                    />
                    <span className="text-sm text-slate-300">Trending</span>
                  </label>
                </div>
              )}

              {activeTab === "fasilitas" && (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                  {(Object.keys(FASILITAS_LABELS) as (keyof BeachFacility)[]).map(
                    (key) => (
                      <label
                        key={key}
                        className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-2 text-xs text-slate-300"
                      >
                        <input
                          type="checkbox"
                          defaultChecked={beach.fasilitas[key]}
                          className="h-3 w-3 accent-blue-500"
                        />
                        {FASILITAS_LABELS[key]}
                      </label>
                    ),
                  )}
                </div>
              )}

              {activeTab === "suasana" && (
                <div>
                  <label className="mb-1 block text-[10px] font-semibold text-slate-500">
                    SKOR SUASANA (1-5)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={String(
                      getField(
                        beach.id,
                        "suasana",
                        beach.rekomendasi?.suasanaScore ?? 3,
                      ),
                    )}
                    onChange={(e) =>
                      setField(beach.id, "suasana", e.target.value)
                    }
                    className={`${inputCls} w-32`}
                  />
                </div>
              )}

              {activeTab === "akses" && (
                <div>
                  <label className="mb-1 block text-[10px] font-semibold text-slate-500">
                    AKSES JALAN
                  </label>
                  <select
                    value={String(
                      getField(beach.id, "aksesJalan", beach.aksesJalan),
                    )}
                    onChange={(e) =>
                      setField(beach.id, "aksesJalan", e.target.value)
                    }
                    className={`${inputCls} w-40`}
                  >
                    <option value="mudah">Mudah</option>
                    <option value="sedang">Sedang</option>
                    <option value="sulit">Sulit</option>
                  </select>
                </div>
              )}

              {/* Save button for rating/suasana/akses tabs */}
              {(activeTab === "rating" ||
                activeTab === "suasana" ||
                activeTab === "akses") && (
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => {
                      let payload: object = {};
                      if (activeTab === "rating") {
                        payload = {
                          rating:
                            parseFloat(
                              String(getField(beach.id, "rating", beach.rating)),
                            ) || beach.rating,
                          reviews:
                            parseInt(
                              String(
                                getField(beach.id, "reviews", beach.reviews),
                              ),
                            ) || beach.reviews,
                        };
                      } else if (activeTab === "suasana") {
                        payload = {
                          rekomendasi: {
                            ...beach.rekomendasi,
                            suasanaScore:
                              parseInt(
                                String(
                                  getField(
                                    beach.id,
                                    "suasana",
                                    beach.rekomendasi?.suasanaScore ?? 3,
                                  ),
                                ),
                              ) || 3,
                          },
                        };
                      } else if (activeTab === "akses") {
                        payload = {
                          aksesJalan: getField(
                            beach.id,
                            "aksesJalan",
                            beach.aksesJalan,
                          ),
                        };
                      }
                      void handleSave(beach.id, payload);
                    }}
                    disabled={isSaving}
                    className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-700 disabled:opacity-60"
                  >
                    {isSaving ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : isSaved ? (
                      <CheckCircle2 className="h-3 w-3 text-emerald-300" />
                    ) : (
                      <Save className="h-3 w-3" />
                    )}
                    {isSaved ? "Tersimpan" : "Simpan"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
