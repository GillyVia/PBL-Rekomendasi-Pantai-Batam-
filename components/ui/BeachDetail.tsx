"use client";

import type { BeachData } from "@/types/beach";

type BeachDetailProps = {
  beach: BeachData;
  onClose: () => void;
};

export function BeachDetail({ beach, onClose }: BeachDetailProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{beach.name}</h2>
            <p className="text-sm text-slate-500">
              {beach.kelurahan}, {beach.kecamatan}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
          >
            Tutup
          </button>
        </div>

        <img
          src={beach.image}
          alt={beach.name}
          className="mb-4 h-64 w-full rounded-xl object-cover"
        />

        <p className="mb-4 text-sm leading-relaxed text-slate-600">
          {beach.deskripsiLengkap}
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs text-slate-400">Tiket Masuk</p>
            <p className="font-semibold text-slate-800">{beach.tiketMasuk}</p>
          </div>

          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs text-slate-400">Jam Buka</p>
            <p className="font-semibold text-slate-800">{beach.jamBuka}</p>
          </div>

          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs text-slate-400">Jarak dari Kota</p>
            <p className="font-semibold text-slate-800">
              {beach.jarakDariKota} km
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs text-slate-400">Akses Jalan</p>
            <p className="font-semibold capitalize text-slate-800">
              {beach.aksesJalan}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}