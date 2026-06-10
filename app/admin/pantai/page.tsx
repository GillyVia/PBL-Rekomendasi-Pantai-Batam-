"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Star,
  TrendingUp,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  X,
  Loader2,
} from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";
import type { BeachData } from "@/types/beach";

const PAGE_SIZE = 10;

function DeleteModal({
  beach,
  onConfirm,
  onCancel,
  loading,
}: {
  beach: BeachData;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
        <h3 className="mb-2 text-lg font-black text-white">Hapus Pantai?</h3>
        <p className="mb-5 text-sm text-slate-400">
          Data{" "}
          <span className="font-semibold text-white">{beach.name}</span> akan
          dihapus permanen dan tidak dapat dikembalikan.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 rounded-xl border border-slate-600 px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-700"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-60"
          >
            {loading && (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            )}
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PantaiAdminPage() {
  const { beaches, isLoading, deleteBeach, toggleFeatured, toggleTrending } =
    useAdminData();

  const [search, setSearch] = useState("");
  const [filterKecamatan, setFilterKecamatan] = useState("");
  const [filterAkses, setFilterAkses] = useState("");
  const [sortBy, setSortBy] = useState<
    "nama" | "kecamatan" | "rating" | "reviews" | "jarak"
  >("nama");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<BeachData | null>(null);
  const [deleting, setDeleting] = useState(false);

  const kecamatanList = useMemo(
    () => [...new Set(beaches.map((b) => b.kecamatan))].sort(),
    [beaches],
  );

  const filtered = useMemo(() => {
    let result = beaches;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.kecamatan.toLowerCase().includes(q),
      );
    }
    if (filterKecamatan) {
      result = result.filter((b) => b.kecamatan === filterKecamatan);
    }
    if (filterAkses) {
      result = result.filter((b) => b.aksesJalan === filterAkses);
    }
    result = [...result].sort((a, b) => {
      let cmp = 0;
      if (sortBy === "nama") cmp = a.name.localeCompare(b.name);
      else if (sortBy === "kecamatan")
        cmp = a.kecamatan.localeCompare(b.kecamatan);
      else if (sortBy === "rating") cmp = a.rating - b.rating;
      else if (sortBy === "reviews") cmp = a.reviews - b.reviews;
      else if (sortBy === "jarak") cmp = a.jarakDariKota - b.jarakDariKota;
      return sortDir === "asc" ? cmp : -cmp;
    });
    return result;
  }, [beaches, search, filterKecamatan, filterAkses, sortBy, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = (col: typeof sortBy) => {
    if (sortBy === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortBy(col);
      setSortDir("asc");
    }
    setPage(1);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteBeach(deleteTarget.id);
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-white">Data Pantai</h1>
          <p className="text-sm text-slate-400">
            {beaches.length} pantai terdaftar
          </p>
        </div>
        <Link
          href="/admin/pantai/tambah"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-900/40 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Tambah Pantai
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Cari nama atau kecamatan..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 outline-none"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        <select
          value={filterKecamatan}
          onChange={(e) => { setFilterKecamatan(e.target.value); setPage(1); }}
          className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white focus:border-blue-500 outline-none"
        >
          <option value="">Semua Kecamatan</option>
          {kecamatanList.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
        <select
          value={filterAkses}
          onChange={(e) => { setFilterAkses(e.target.value); setPage(1); }}
          className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white focus:border-blue-500 outline-none"
        >
          <option value="">Semua Akses</option>
          <option value="mudah">Mudah</option>
          <option value="sedang">Sedang</option>
          <option value="sulit">Sulit</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/50">
                {(
                  [
                    { key: "nama", label: "Nama Pantai" },
                    { key: "kecamatan", label: "Kecamatan" },
                    { key: "rating", label: "Rating" },
                    { key: "reviews", label: "Ulasan" },
                    { key: "jarak", label: "Jarak" },
                  ] as const
                ).map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="cursor-pointer whitespace-nowrap px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white"
                  >
                    {col.label}
                    {sortBy === col.key && (
                      <span className="ml-1">
                        {sortDir === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-slate-500"
                  >
                    <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-slate-500"
                  >
                    Tidak ada data pantai.
                  </td>
                </tr>
              ) : (
                paginated.map((beach) => (
                  <tr
                    key={beach.id}
                    className="border-b border-slate-800/50 hover:bg-slate-800/30"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {beach.image && (
                          <img
                            src={beach.image}
                            alt={beach.name}
                            className="h-9 w-9 flex-shrink-0 rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <p className="font-semibold text-white">
                            {beach.name}
                          </p>
                          <p className="text-[11px] text-slate-500 capitalize">
                            {beach.aksesJalan}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-300">
                      {beach.kecamatan}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span className="font-semibold text-white">
                          {beach.rating}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-300">
                      {beach.reviews.toLocaleString("id-ID")}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-300">
                      {beach.jarakDariKota} km
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => void toggleFeatured(beach.id)}
                          title="Toggle Unggulan"
                          className={`flex h-7 w-7 items-center justify-center rounded-lg transition-all ${
                            beach.featured
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-slate-700/50 text-slate-500 hover:text-slate-300"
                          }`}
                        >
                          <Bookmark className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => void toggleTrending(beach.id)}
                          title="Toggle Trending"
                          className={`flex h-7 w-7 items-center justify-center rounded-lg transition-all ${
                            beach.trending
                              ? "bg-rose-500/20 text-rose-400"
                              : "bg-slate-700/50 text-slate-500 hover:text-slate-300"
                          }`}
                        >
                          <TrendingUp className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <Link
                          href={`/admin/pantai/${beach.id}/ubah`}
                          className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-700/50 text-slate-400 hover:bg-blue-500/20 hover:text-blue-400"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(beach)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-700/50 text-slate-400 hover:bg-red-500/20 hover:text-red-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-700/50 px-4 py-3">
            <p className="text-xs text-slate-500">
              Halaman {page} dari {totalPages} ({filtered.length} total)
            </p>
            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-700 text-slate-300 disabled:opacity-40 hover:bg-slate-600"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-700 text-slate-300 disabled:opacity-40 hover:bg-slate-600"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {deleteTarget && (
        <DeleteModal
          beach={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleting}
        />
      )}
    </div>
  );
}
