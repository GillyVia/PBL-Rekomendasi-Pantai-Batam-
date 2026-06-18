"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAdminData } from "@/context/AdminDataContext";
import type { BeachData, BeachFacility } from "@/types/beach";
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Upload,
  ImageIcon,
} from "lucide-react";
import Link from "next/link";

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

export default function UbahPantaiPage() {
  const params = useParams();
  const id = params.id as string;
  const { beaches, updateBeach, deleteBeach } = useAdminData();
  const router = useRouter();

  const beach = beaches.find((b) => b.id === id);

  const [form, setForm] = useState({
    name: "",
    kecamatan: "",
    kelurahan: "",
    alamatLengkap: "",
    image: "",
    badge: "",
    badgeColor: "#3B82F6",
    rating: "0",
    reviews: "0",
    tiketMasuk: "",
    tiketMasukRp: "0",
    jarakDariKota: "0",
    jarakLabel: "",
    jamBuka: "",
    aksesJalan: "sedang",
    highlight: "",
    deskripsiSingkat: "",
    deskripsiLengkap: "",
    kelebihanUtama: "",
    aktivitas: "",
    cocokUntuk: "",
    tipsKunjungan: "",
    googleMapsUrl: "",
    koordinatLat: "0",
    koordinatLng: "0",
    featured: false,
    trending: false,
  });
  const [fasilitas, setFasilitas] = useState<BeachFacility>({
    toilet: false,
    mushola: false,
    warungMakan: false,
    parkirMotor: false,
    parkirMobil: false,
    gazebo: false,
    sewaAlat: false,
    penginapan: false,
    wifi: false,
    penjagaPantai: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !json.url) throw new Error(json.error ?? "Gagal upload");
      setForm((f) => ({ ...f, image: json.url! }));
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Gagal upload foto");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  useEffect(() => {
    if (!beach) return;
    setForm({
      name: beach.name,
      kecamatan: beach.kecamatan,
      kelurahan: beach.kelurahan,
      alamatLengkap: beach.alamatLengkap,
      image: beach.image,
      badge: beach.badge,
      badgeColor: beach.badgeColor,
      rating: String(beach.rating),
      reviews: String(beach.reviews),
      tiketMasuk: beach.tiketMasuk,
      tiketMasukRp: String(beach.tiketMasukRp),
      jarakDariKota: String(beach.jarakDariKota),
      jarakLabel: beach.jarakLabel,
      jamBuka: beach.jamBuka,
      aksesJalan: beach.aksesJalan,
      highlight: beach.highlight,
      deskripsiSingkat: beach.deskripsiSingkat,
      deskripsiLengkap: beach.deskripsiLengkap,
      kelebihanUtama: beach.kelebihanUtama.join("\n"),
      aktivitas: beach.aktivitas.join(", "),
      cocokUntuk: beach.cocokUntuk.join(", "),
      tipsKunjungan: beach.tipsKunjungan.join("\n"),
      googleMapsUrl: beach.googleMapsUrl,
      koordinatLat: String(beach.koordinat.lat),
      koordinatLng: String(beach.koordinat.lng),
      featured: beach.featured ?? false,
      trending: beach.trending,
    });
    setFasilitas(beach.fasilitas);
  }, [beach]);

  if (!beach) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-500">
        Pantai tidak ditemukan.
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload: Partial<BeachData> = {
        name: form.name,
        kecamatan: form.kecamatan,
        kelurahan: form.kelurahan,
        alamatLengkap: form.alamatLengkap,
        image: form.image,
        badge: form.badge,
        badgeColor: form.badgeColor,
        featured: form.featured,
        trending: form.trending,
        rating: parseFloat(form.rating) || 0,
        reviews: parseInt(form.reviews) || 0,
        tiketMasuk: form.tiketMasuk,
        tiketMasukRp: parseInt(form.tiketMasukRp) || 0,
        jarakDariKota: parseFloat(form.jarakDariKota) || 0,
        jarakLabel: form.jarakLabel,
        jamBuka: form.jamBuka,
        aksesJalan: form.aksesJalan as "mudah" | "sedang" | "sulit",
        highlight: form.highlight,
        deskripsiSingkat: form.deskripsiSingkat,
        deskripsiLengkap: form.deskripsiLengkap,
        kelebihanUtama: form.kelebihanUtama
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        aktivitas: form.aktivitas
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        cocokUntuk: form.cocokUntuk
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        tipsKunjungan: form.tipsKunjungan
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        googleMapsUrl: form.googleMapsUrl,
        koordinat: {
          lat: parseFloat(form.koordinatLat) || 0,
          lng: parseFloat(form.koordinatLng) || 0,
        },
        fasilitas,
      };

      await updateBeach(id, payload);
      setSuccess(true);
      setTimeout(() => router.push("/admin/pantai"), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan perubahan.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteBeach(id);
      router.replace("/admin/pantai");
    } catch {
      setError("Gagal menghapus pantai.");
      setDeleting(false);
      setShowDelete(false);
    }
  };

  const inputCls =
    "w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none";
  const labelCls = "mb-1.5 block text-xs font-semibold text-slate-400";

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/pantai"
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-700 text-slate-300 hover:bg-slate-600"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-xl font-black text-white">Edit: {beach.name}</h1>
            <p className="text-xs text-slate-500">ID: {id}</p>
          </div>
        </div>
        <button
          onClick={() => setShowDelete(true)}
          className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 hover:bg-red-500/20"
        >
          <Trash2 className="h-4 w-4" />
          Hapus
        </button>
      </div>

      {error && (
        <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {error}
        </div>
      )}
      {success && (
        <div className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
          Perubahan berhasil disimpan! Mengalihkan...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informasi Utama */}
        <section className="rounded-2xl border border-slate-700/50 bg-slate-900 p-5">
          <h2 className="mb-4 text-sm font-bold text-white">Informasi Utama</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Nama Pantai *</label>
              <input type="text" required value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Kecamatan *</label>
              <input type="text" required value={form.kecamatan}
                onChange={(e) => setForm((f) => ({ ...f, kecamatan: e.target.value }))}
                className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Kelurahan</label>
              <input type="text" value={form.kelurahan}
                onChange={(e) => setForm((f) => ({ ...f, kelurahan: e.target.value }))}
                className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Akses Jalan</label>
              <select value={form.aksesJalan}
                onChange={(e) => setForm((f) => ({ ...f, aksesJalan: e.target.value }))}
                className={inputCls}>
                <option value="mudah">Mudah</option>
                <option value="sedang">Sedang</option>
                <option value="sulit">Sulit</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Alamat Lengkap</label>
              <input type="text" value={form.alamatLengkap}
                onChange={(e) => setForm((f) => ({ ...f, alamatLengkap: e.target.value }))}
                className={inputCls} />
            </div>
          </div>
        </section>

        {/* Gambar & Badge */}
        <section className="rounded-2xl border border-slate-700/50 bg-slate-900 p-5">
          <h2 className="mb-4 text-sm font-bold text-white">Gambar & Badge</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2 space-y-3">
              <label className={labelCls}>Foto Utama</label>
              {form.image && (
                <div className="relative h-48 w-full overflow-hidden rounded-xl border border-slate-700">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={form.image}
                    alt="Preview foto"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <label className={`flex cursor-pointer items-center gap-3 rounded-xl border border-dashed px-4 py-3 transition-colors ${uploading ? "cursor-not-allowed border-slate-700 bg-slate-800/30" : "border-slate-600 bg-slate-800/50 hover:border-blue-500/60 hover:bg-slate-800"}`}>
                {uploading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
                ) : (
                  <Upload className="h-4 w-4 text-slate-400" />
                )}
                <div>
                  <p className="text-sm font-medium text-slate-300">
                    {uploading ? "Mengupload..." : form.image ? "Ganti Foto" : "Pilih Foto"}
                  </p>
                  <p className="text-xs text-slate-500">JPG, JPEG, PNG — maks. 5 MB</p>
                </div>
                <ImageIcon className="ml-auto h-4 w-4 text-slate-600" />
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
              {uploadError && (
                <p className="flex items-center gap-1.5 text-xs text-red-400">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {uploadError}
                </p>
              )}
            </div>
            <div>
              <label className={labelCls}>Teks Badge</label>
              <input type="text" value={form.badge}
                onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value }))}
                className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Warna Badge</label>
              <input type="text" value={form.badgeColor}
                onChange={(e) => setForm((f) => ({ ...f, badgeColor: e.target.value }))}
                className={inputCls} />
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="featuredEdit" checked={form.featured}
                onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                className="h-4 w-4 rounded accent-blue-500" />
              <label htmlFor="featuredEdit" className="text-sm text-slate-300">Pantai Unggulan</label>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="trendingEdit" checked={form.trending}
                onChange={(e) => setForm((f) => ({ ...f, trending: e.target.checked }))}
                className="h-4 w-4 rounded accent-rose-500" />
              <label htmlFor="trendingEdit" className="text-sm text-slate-300">Sedang Trending</label>
            </div>
          </div>
        </section>

        {/* Rating & Tiket */}
        <section className="rounded-2xl border border-slate-700/50 bg-slate-900 p-5">
          <h2 className="mb-4 text-sm font-bold text-white">Rating & Tiket</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div>
              <label className={labelCls}>Rating</label>
              <input type="number" min="0" max="5" step="0.1" value={form.rating}
                onChange={(e) => setForm((f) => ({ ...f, rating: e.target.value }))}
                className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Ulasan</label>
              <input type="number" min="0" value={form.reviews}
                onChange={(e) => setForm((f) => ({ ...f, reviews: e.target.value }))}
                className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Tiket (teks)</label>
              <input type="text" value={form.tiketMasuk}
                onChange={(e) => setForm((f) => ({ ...f, tiketMasuk: e.target.value }))}
                className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Tiket (Rp)</label>
              <input type="number" min="0" value={form.tiketMasukRp}
                onChange={(e) => setForm((f) => ({ ...f, tiketMasukRp: e.target.value }))}
                className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Jarak (km)</label>
              <input type="number" step="0.1" value={form.jarakDariKota}
                onChange={(e) => setForm((f) => ({ ...f, jarakDariKota: e.target.value }))}
                className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Jam Buka</label>
              <input type="text" value={form.jamBuka}
                onChange={(e) => setForm((f) => ({ ...f, jamBuka: e.target.value }))}
                className={inputCls} />
            </div>
          </div>
        </section>

        {/* Deskripsi */}
        <section className="rounded-2xl border border-slate-700/50 bg-slate-900 p-5">
          <h2 className="mb-4 text-sm font-bold text-white">Deskripsi</h2>
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Highlight</label>
              <input type="text" value={form.highlight}
                onChange={(e) => setForm((f) => ({ ...f, highlight: e.target.value }))}
                className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Deskripsi Singkat</label>
              <textarea rows={2} value={form.deskripsiSingkat}
                onChange={(e) => setForm((f) => ({ ...f, deskripsiSingkat: e.target.value }))}
                className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Deskripsi Lengkap</label>
              <textarea rows={4} value={form.deskripsiLengkap}
                onChange={(e) => setForm((f) => ({ ...f, deskripsiLengkap: e.target.value }))}
                className={inputCls} />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelCls}>Kelebihan Utama (satu per baris)</label>
                <textarea rows={3} value={form.kelebihanUtama}
                  onChange={(e) => setForm((f) => ({ ...f, kelebihanUtama: e.target.value }))}
                  className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Aktivitas (pisah koma)</label>
                <textarea rows={3} value={form.aktivitas}
                  onChange={(e) => setForm((f) => ({ ...f, aktivitas: e.target.value }))}
                  className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Cocok Untuk (pisah koma)</label>
                <input type="text" value={form.cocokUntuk}
                  onChange={(e) => setForm((f) => ({ ...f, cocokUntuk: e.target.value }))}
                  className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Tips Kunjungan (satu per baris)</label>
                <textarea rows={3} value={form.tipsKunjungan}
                  onChange={(e) => setForm((f) => ({ ...f, tipsKunjungan: e.target.value }))}
                  className={inputCls} />
              </div>
            </div>
          </div>
        </section>

        {/* Fasilitas */}
        <section className="rounded-2xl border border-slate-700/50 bg-slate-900 p-5">
          <h2 className="mb-4 text-sm font-bold text-white">Fasilitas</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {(Object.keys(FASILITAS_LABELS) as (keyof BeachFacility)[]).map((key) => (
              <label key={key} className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 transition-all hover:border-blue-500/50">
                <input type="checkbox" checked={fasilitas[key]}
                  onChange={(e) => setFasilitas((f) => ({ ...f, [key]: e.target.checked }))}
                  className="h-3.5 w-3.5 accent-blue-500" />
                <span className="text-xs font-medium text-slate-300">{FASILITAS_LABELS[key]}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Lokasi */}
        <section className="rounded-2xl border border-slate-700/50 bg-slate-900 p-5">
          <h2 className="mb-4 text-sm font-bold text-white">Lokasi</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Latitude</label>
              <input type="number" step="any" value={form.koordinatLat}
                onChange={(e) => setForm((f) => ({ ...f, koordinatLat: e.target.value }))}
                className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Longitude</label>
              <input type="number" step="any" value={form.koordinatLng}
                onChange={(e) => setForm((f) => ({ ...f, koordinatLng: e.target.value }))}
                className={inputCls} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Google Maps URL</label>
              <input type="url" value={form.googleMapsUrl}
                onChange={(e) => setForm((f) => ({ ...f, googleMapsUrl: e.target.value }))}
                className={inputCls} />
            </div>
          </div>
        </section>

        <div className="flex gap-3">
          <Link href="/admin/pantai"
            className="flex items-center gap-2 rounded-xl border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-700">
            Batal
          </Link>
          <button type="submit" disabled={loading || success}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-900/40 hover:bg-blue-700 disabled:opacity-60">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Simpan Perubahan
          </button>
        </div>
      </form>

      {/* Delete Confirm */}
      {showDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
            <h3 className="mb-2 text-lg font-black text-white">Hapus {beach.name}?</h3>
            <p className="mb-5 text-sm text-slate-400">
              Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowDelete(false)} disabled={deleting}
                className="flex-1 rounded-xl border border-slate-600 px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-700">
                Batal
              </button>
              <button onClick={handleDelete} disabled={deleting}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-60">
                {deleting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
