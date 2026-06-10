import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { predictJ48 } from "@/lib/j48";
import type { BeachData, BeachFacility } from "@/types/beach";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT
        p.*,
        k.nama AS kecamatan_nama,
        kr.suasana_score,
        kr.fasilitas_score,
        kr.akses_score,
        kr.popularitas_score,
        kr.rating_kategori,
        kr.harga_kategori,
        kr.jarak_kategori,
        kr.label_database
      FROM pantai p
      LEFT JOIN kecamatan k ON p.kecamatan_id = k.id
      LEFT JOIN kategori_rekomendasi kr ON p.id = kr.pantai_id
    `);

    const [fasRows] = await db.query(`
      SELECT pf.pantai_id, f.nama
      FROM pantai_fasilitas pf
      JOIN fasilitas f ON pf.fasilitas_id = f.id
    `);

    const fasMap = new Map<string, Set<string>>();
    for (const r of fasRows as Array<{ pantai_id: string; nama: string }>) {
      if (!fasMap.has(r.pantai_id)) fasMap.set(r.pantai_id, new Set());
      fasMap.get(r.pantai_id)!.add(r.nama);
    }

    const data: BeachData[] = (rows as Record<string, unknown>[]).map((row) => {
      const fas = fasMap.get(row.id as string) ?? new Set<string>();
      const fasilitas: BeachFacility = {
        toilet: fas.has("toilet"),
        mushola: fas.has("mushola"),
        warungMakan: fas.has("warung_makan"),
        parkirMotor: fas.has("parkir_motor"),
        parkirMobil: fas.has("parkir_mobil"),
        gazebo: fas.has("gazebo"),
        sewaAlat: fas.has("sewa_alat"),
        penginapan: fas.has("penginapan"),
        wifi: fas.has("wifi"),
        penjagaPantai: fas.has("penjaga_pantai"),
      };

      const suasana_score = Number(row.suasana_score) || 3;
      const fasilitas_score = Number(row.fasilitas_score) || 3;
      const akses_score = Number(row.akses_score) || 3;
      const popularitas_score = Number(row.popularitas_score) || 3;

      const labelJ48 = predictJ48({
        suasana_score,
        fasilitas_score,
        akses_score,
        popularitas_score,
      });

      return {
        id: String(row.id),
        name: String(row.nama ?? ""),
        kecamatan: String(row.kecamatan_nama ?? row.kecamatan_id ?? ""),
        kelurahan: String(row.kelurahan ?? ""),
        alamatLengkap: String(row.alamat_lengkap ?? ""),
        image: String(row.image ?? ""),
        imageGallery: row.image_gallery
          ? (JSON.parse(row.image_gallery as string) as string[])
          : [],
        badge: String(row.badge ?? ""),
        badgeColor: String(row.badge_color ?? "#3B82F6"),
        featured: Boolean(row.featured),
        trending: Boolean(row.trending),
        verifiedDate: row.verified_date ? String(row.verified_date) : undefined,
        rating: Number(row.rating) || 0,
        reviews: Number(row.reviews) || 0,
        tiketMasuk: String(row.tiket_masuk ?? ""),
        tiketMasukRp: Number(row.tiket_masuk_rp) || 0,
        jarakDariKota: Number(row.jarak_dari_kota) || 0,
        jarakLabel: String(row.jarak_label ?? ""),
        jamBuka: String(row.jam_buka ?? ""),
        aksesJalan: (row.akses_jalan as "mudah" | "sedang" | "sulit") ?? "sedang",
        highlight: String(row.highlight ?? ""),
        deskripsiSingkat: String(row.deskripsi_singkat ?? ""),
        deskripsiLengkap: String(row.deskripsi_lengkap ?? ""),
        kelebihanUtama: row.kelebihan_utama
          ? (JSON.parse(row.kelebihan_utama as string) as string[])
          : [],
        aktivitas: row.aktivitas
          ? (JSON.parse(row.aktivitas as string) as string[])
          : [],
        cocokUntuk: row.cocok_untuk
          ? (JSON.parse(row.cocok_untuk as string) as string[])
          : [],
        tipsKunjungan: row.tips_kunjungan
          ? (JSON.parse(row.tips_kunjungan as string) as string[])
          : [],
        googleMapsUrl: String(row.google_maps_url ?? ""),
        koordinat: {
          lat: Number(row.koordinat_lat) || 0,
          lng: Number(row.koordinat_lng) || 0,
        },
        kategori: [],
        fasilitas,
        rekomendasi: {
          suasanaScore: suasana_score,
          fasilitasScore: fasilitas_score,
          aksesScore: akses_score,
          popularitasScore: popularitas_score,
          ratingKategori: row.rating_kategori as string | null,
          hargaKategori: row.harga_kategori as string | null,
          jarakKategori: row.jarak_kategori as string | null,
          labelDatabase: row.label_database as string | null,
          labelJ48,
        },
      };
    });

    const order = {
      sangat_direkomendasikan: 0,
      direkomendasikan: 1,
      tidak_direkomendasikan: 2,
    } as const;

    data.sort((a, b) => {
      const aO = order[a.rekomendasi!.labelJ48] ?? 3;
      const bO = order[b.rekomendasi!.labelJ48] ?? 3;
      if (aO !== bO) return aO - bO;
      return b.rating - a.rating;
    });

    return NextResponse.json({ success: true, total: data.length, data });
  } catch (err) {
    console.error("GET /api/rekomendasi error:", err);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data rekomendasi" },
      { status: 500 },
    );
  }
}
