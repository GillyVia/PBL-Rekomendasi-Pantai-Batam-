"use client";

import { useState, useMemo } from "react";
import {
  MapPin,
  Save,
  Search,
  CheckCircle2,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";

type LokasiForm = {
  lat: string;
  lng: string;
  googleMapsUrl: string;
  jarakDariKota: string;
  jarakLabel: string;
  aksesJalan: string;
};

function StatsBar({
  total,
  withCoords,
  withMaps,
}: {
  total: number;
  withCoords: number;
  withMaps: number;
}) {
  const pctCoords = total > 0 ? Math.round((withCoords / total) * 100) : 0;
  const pctMaps = total > 0 ? Math.round((withMaps / total) * 100) : 0;

  return (
    <div className="mb-6 grid grid-cols-3 gap-4">
      {[
        { label: "Total Pantai", value: String(total), pct: null, color: "blue" },
        { label: "Ada Koordinat", value: `${withCoords}/${total}`, pct: pctCoords, color: "emerald" },
        { label: "Ada Maps URL", value: `${withMaps}/${total}`, pct: pctMaps, color: "amber" },
      ].map((s) => (
        <div
          key={s.label}
          className="rounded-2xl border border-slate-700/50 bg-slate-900 p-4"
        >
          <p className="text-xs text-slate-500">{s.label}</p>
          <p className="mt-1 text-xl font-black text-white">{s.value}</p>
          {s.pct !== null && (
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-700">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                style={{ width: `${s.pct}%` }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function LokasiPage() {
  const { beaches, isLoading, updateBeach } = useAdminData();
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [forms, setForms] = useState<Record<string, LokasiForm>>({});

  const filteredBeaches = useMemo(() => {
    const q = search.toLowerCase();
    return beaches.filter(
      (b) =>
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.kecamatan.toLowerCase().includes(q),
    );
  }, [beaches, search]);

  const withCoords = beaches.filter(
    (b) => b.koordinat.lat !== 0 || b.koordinat.lng !== 0,
  ).length;
  const withMaps = beaches.filter((b) => !!b.googleMapsUrl).length;

  const getForm = (beachId: string) => {
    if (forms[beachId]) return forms[beachId];
    const b = beaches.find((bch) => bch.id === beachId);
    if (!b) return null;
    return {
      lat: String(b.koordinat.lat),
      lng: String(b.koordinat.lng),
      googleMapsUrl: b.googleMapsUrl,
      jarakDariKota: String(b.jarakDariKota),
      jarakLabel: b.jarakLabel,
      aksesJalan: b.aksesJalan,
    };
  };

  const setField = (
    beachId: string,
    field: keyof LokasiForm,
    value: string,
  ) => {
    const current = getForm(beachId);
    if (!current) return;

    const updated = { ...current, [field]: value };

    if (
      (field === "lat" || field === "lng") &&
      updated.lat &&
      updated.lng &&
      parseFloat(updated.lat) !== 0 &&
      parseFloat(updated.lng) !== 0
    ) {
      updated.googleMapsUrl = `https://maps.google.com/?q=${updated.lat},${updated.lng}`;
    }

    setForms((prev) => ({ ...prev, [beachId]: updated }));
  };

  const handleSave = async (beachId: string) => {
    const f = getForm(beachId);
    if (!f) return;

    setSaving((prev) => ({ ...prev, [beachId]: true }));
    try {
      await updateBeach(beachId, {
        koordinat: {
          lat: parseFloat(f.lat) || 0,
          lng: parseFloat(f.lng) || 0,
        },
        googleMapsUrl: f.googleMapsUrl,
        jarakDariKota: parseFloat(f.jarakDariKota) || 0,
        jarakLabel: f.jarakLabel,
        aksesJalan: f.aksesJalan as "mudah" | "sedang" | "sulit",
      });
      setSaved((prev) => ({ ...prev, [beachId]: true }));
      setTimeout(
        () => setSaved((prev) => ({ ...prev, [beachId]: false })),
        2000,
      );
    } finally {
      setSaving((prev) => ({ ...prev, [beachId]: false }));
    }
  };

  const inputCls =
    "w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none";

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <div className="flex items-center gap-2.5">
          <MapPin className="h-5 w-5 text-blue-400" />
          <h1 className="text-xl font-black text-white">Kelola Lokasi</h1>
        </div>
        <p className="mt-1 text-sm text-slate-400">
          Update koordinat, Maps URL, dan akses jalan setiap pantai.
        </p>
      </div>

      {!isLoading && (
        <StatsBar
          total={beaches.length}
          withCoords={withCoords}
          withMaps={withMaps}
        />
      )}

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          placeholder="Cari nama atau kecamatan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16 text-slate-500">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          {filteredBeaches.map((beach) => {
            const f = getForm(beach.id);
            if (!f) return null;
            const isSaving = saving[beach.id];
            const isSaved = saved[beach.id];

            return (
              <div
                key={beach.id}
                className="rounded-2xl border border-slate-700/50 bg-slate-900 p-5"
              >
                <div className="mb-4 flex items-center gap-3">
                  {beach.image && (
                    <img
                      src={beach.image}
                      alt={beach.name}
                      className="h-10 w-10 flex-shrink-0 rounded-xl object-cover"
                    />
                  )}
                  <div>
                    <p className="font-bold text-white">{beach.name}</p>
                    <p className="text-xs text-slate-500">{beach.kecamatan}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div>
                    <label className="mb-1 block text-[10px] font-semibold text-slate-500">
                      LATITUDE
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={f.lat}
                      onChange={(e) =>
                        setField(beach.id, "lat", e.target.value)
                      }
                      placeholder="1.0001"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[10px] font-semibold text-slate-500">
                      LONGITUDE
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={f.lng}
                      onChange={(e) =>
                        setField(beach.id, "lng", e.target.value)
                      }
                      placeholder="104.0001"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[10px] font-semibold text-slate-500">
                      JARAK (km)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={f.jarakDariKota}
                      onChange={(e) =>
                        setField(beach.id, "jarakDariKota", e.target.value)
                      }
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[10px] font-semibold text-slate-500">
                      AKSES
                    </label>
                    <select
                      value={f.aksesJalan}
                      onChange={(e) =>
                        setField(beach.id, "aksesJalan", e.target.value)
                      }
                      className={inputCls}
                    >
                      <option value="mudah">Mudah</option>
                      <option value="sedang">Sedang</option>
                      <option value="sulit">Sulit</option>
                    </select>
                  </div>
                </div>

                <div className="mt-3">
                  <label className="mb-1 block text-[10px] font-semibold text-slate-500">
                    GOOGLE MAPS URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={f.googleMapsUrl}
                      onChange={(e) =>
                        setField(beach.id, "googleMapsUrl", e.target.value)
                      }
                      placeholder="https://maps.google.com/?q=..."
                      className={`${inputCls} flex-1`}
                    />
                    {f.googleMapsUrl && (
                      <a
                        href={f.googleMapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-slate-700 text-slate-400 hover:text-blue-400"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* OSM Preview */}
                {parseFloat(f.lat) !== 0 && parseFloat(f.lng) !== 0 && (
                  <div className="mt-3 overflow-hidden rounded-xl">
                    <iframe
                      title={`Peta ${beach.name}`}
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(f.lng) - 0.01},${parseFloat(f.lat) - 0.01},${parseFloat(f.lng) + 0.01},${parseFloat(f.lat) + 0.01}&layer=mapnik&marker=${f.lat},${f.lng}`}
                      className="h-40 w-full border-0"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleSave(beach.id)}
                    disabled={isSaving}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 disabled:opacity-60"
                  >
                    {isSaving ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : isSaved ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
                    ) : (
                      <Save className="h-3.5 w-3.5" />
                    )}
                    {isSaved ? "Tersimpan" : "Simpan"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
