import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { predictJ48 } from "@/lib/j48";
import type { BeachData, BeachFacility } from "@/types/beach";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT
        p.id_pantai,
        p.nama_pantai,
        p.id_kecamatan,
        p.kelurahan,
        p.alamat,
        p.foto_url,
        p.image_gallery,
        p.badge,
        p.badge_color,
        p.featured,
        p.trending,
        p.verified_date,
        p.rating,
        p.jumlah_ulasan,
        p.tiket_masuk,
        p.tiket_masuk_rp,
        p.jarak_dari_kota,
        p.jarak_label,
        p.jam_buka,
        p.akses_jalan,
        p.highlight,
        p.deskripsi_singkat,
        p.deskripsi_lengkap,
        p.aktivitas,
        p.cocok_untuk,
        p.tips_kunjungan,
        p.google_maps_url,
        p.latitude,
        p.longitude,
        k.nama_kecamatan,
        kr.suasana_score,
        kr.fasilitas_score,
        kr.akses_score,
        kr.popularitas_score,
        kr.rating_kategori,
        kr.harga_kategori,
        kr.jarak_kategori,
        kr.label_rekomendasi
      FROM pantai p
      LEFT JOIN kecamatan k ON p.id_kecamatan = k.id_kecamatan
      LEFT JOIN kategori_rekomendasi kr ON p.id_pantai = kr.id_pantai
    `);

    const [fasRows] = await db.query(`
      SELECT pf.id_pantai, f.nama_fasilitas
      FROM pantai_fasilitas pf
      JOIN fasilitas f ON pf.id_fasilitas = f.id_fasilitas
    `);

    const fasMap = new Map<string, Set<string>>();
    for (const r of fasRows as Array<{ id_pantai: string; nama_fasilitas: string }>) {
      if (!fasMap.has(r.id_pantai)) fasMap.set(r.id_pantai, new Set());
      fasMap.get(r.id_pantai)!.add(r.nama_fasilitas.toLowerCase());
    }

    const data: BeachData[] = (rows as Record<string, unknown>[]).map((row) => {
      const fas = fasMap.get(row.id_pantai as string) ?? new Set<string>();
      const fasilitas: BeachFacility = {
        toilet: fas.has("toilet"),
        mushola: fas.has("mushola"),
        warungMakan: fas.has("warung_makan") || fas.has("warung makan"),
        parkirMotor: fas.has("parkir_motor") || fas.has("parkir motor"),
        parkirMobil: fas.has("parkir_mobil") || fas.has("parkir mobil"),
        gazebo: fas.has("gazebo"),
        sewaAlat: fas.has("sewa_alat") || fas.has("sewa alat"),
        penginapan: fas.has("penginapan"),
        wifi: fas.has("wifi"),
        penjagaPantai: fas.has("penjaga_pantai") || fas.has("penjaga pantai"),
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
        id: String(row.id_pantai),
        name: String(row.nama_pantai ?? ""),
        kecamatan: String(row.nama_kecamatan ?? ""),
        kelurahan: String(row.kelurahan ?? ""),
        alamatLengkap: String(row.alamat ?? ""),
        image: String(row.foto_url ?? ""),
        imageGallery: row.image_gallery
          ? (JSON.parse(row.image_gallery as string) as string[])
          : [],
        badge: String(row.badge ?? ""),
        badgeColor: String(row.badge_color ?? "#3B82F6"),
        featured: Boolean(row.featured),
        trending: Boolean(row.trending),
        verifiedDate: row.verified_date ? String(row.verified_date) : undefined,
        rating: Number(row.rating) || 0,
        reviews: Number(row.jumlah_ulasan) || 0,
        tiketMasuk: String(row.tiket_masuk ?? ""),
        tiketMasukRp: Number(row.tiket_masuk_rp) || 0,
        jarakDariKota: Number(row.jarak_dari_kota) || 0,
        jarakLabel: String(row.jarak_label ?? ""),
        jamBuka: String(row.jam_buka ?? ""),
        aksesJalan: (row.akses_jalan as "mudah" | "sedang" | "sulit") ?? "sedang",
        highlight: String(row.highlight ?? ""),
        deskripsiSingkat: String(row.deskripsi_singkat ?? ""),
        deskripsiLengkap: String(row.deskripsi_lengkap ?? ""),
        kelebihanUtama: [],
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
          lat: Number(row.latitude) || 0,
          lng: Number(row.longitude) || 0,
        },
        kategori: row.kategori_pantai
          ? (JSON.parse(row.kategori_pantai as string) as string[])
          : [],
        fasilitas,
        rekomendasi: {
          suasanaScore: suasana_score,
          fasilitasScore: fasilitas_score,
          aksesScore: akses_score,
          popularitasScore: popularitas_score,
          ratingKategori: row.rating_kategori as string | null,
          hargaKategori: row.harga_kategori as string | null,
          jarakKategori: row.jarak_kategori as string | null,
          labelDatabase: row.label_rekomendasi as string | null,
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
