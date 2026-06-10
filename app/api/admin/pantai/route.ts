import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import type { BeachData, BeachFacility } from "@/types/beach";

export const dynamic = "force-dynamic";

const FASILITAS_KEY_TO_DB: Record<keyof BeachFacility, string> = {
  toilet: "toilet",
  mushola: "mushola",
  warungMakan: "warung_makan",
  parkirMotor: "parkir_motor",
  parkirMobil: "parkir_mobil",
  gazebo: "gazebo",
  sewaAlat: "sewa_alat",
  penginapan: "penginapan",
  wifi: "wifi",
  penjagaPantai: "penjaga_pantai",
};

function buildBeachData(
  row: Record<string, unknown>,
  fasMap: Map<string, Set<string>>,
): BeachData {
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
      suasanaScore: Number(row.suasana_score) || 3,
      fasilitasScore: Number(row.fasilitas_score) || 3,
      aksesScore: Number(row.akses_score) || 3,
      popularitasScore: Number(row.popularitas_score) || 3,
      ratingKategori: row.rating_kategori as string | null,
      hargaKategori: row.harga_kategori as string | null,
      jarakKategori: row.jarak_kategori as string | null,
      labelDatabase: row.label_rekomendasi as string | null,
      labelJ48: "direkomendasikan",
    },
  };
}

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT
        p.id_pantai, p.nama_pantai, p.id_kecamatan, p.kelurahan, p.alamat,
        p.foto_url, p.image_gallery, p.badge, p.badge_color,
        p.featured, p.trending, p.verified_date,
        p.rating, p.jumlah_ulasan, p.tiket_masuk, p.tiket_masuk_rp,
        p.jarak_dari_kota, p.jarak_label, p.jam_buka, p.akses_jalan,
        p.highlight, p.deskripsi_singkat, p.deskripsi_lengkap,
        p.aktivitas, p.cocok_untuk, p.tips_kunjungan,
        p.google_maps_url, p.latitude, p.longitude, p.kategori_pantai,
        k.nama_kecamatan,
        kr.suasana_score, kr.fasilitas_score, kr.akses_score, kr.popularitas_score,
        kr.rating_kategori, kr.harga_kategori, kr.jarak_kategori, kr.label_rekomendasi
      FROM pantai p
      LEFT JOIN kecamatan k ON p.id_kecamatan = k.id_kecamatan
      LEFT JOIN kategori_rekomendasi kr ON p.id_pantai = kr.id_pantai
      ORDER BY p.nama_pantai ASC
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

    const data = (rows as Record<string, unknown>[]).map((row) =>
      buildBeachData(row, fasMap),
    );

    return NextResponse.json({ success: true, total: data.length, data });
  } catch (err) {
    console.error("GET /api/admin/pantai error:", err);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data pantai" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const conn = await db.getConnection();
  try {
    const beach = (await request.json()) as BeachData;

    if (!beach.id || !beach.name) {
      return NextResponse.json(
        { success: false, error: "ID dan nama pantai wajib diisi" },
        { status: 400 },
      );
    }

    await conn.beginTransaction();

    // Upsert kecamatan
    let kecamatanId: number;
    const [existing] = await conn.query(
      "SELECT id_kecamatan FROM kecamatan WHERE nama_kecamatan = ? LIMIT 1",
      [beach.kecamatan],
    );
    const ekList = existing as Array<{ id_kecamatan: number }>;
    if (ekList.length > 0) {
      kecamatanId = ekList[0].id_kecamatan;
    } else {
      const [res] = await conn.query(
        "INSERT INTO kecamatan (nama_kecamatan) VALUES (?)",
        [beach.kecamatan],
      );
      kecamatanId = (res as { insertId: number }).insertId;
    }

    // Insert pantai
    await conn.query(
      `INSERT INTO pantai (
        id_pantai, nama_pantai, id_kecamatan, kelurahan, alamat,
        foto_url, image_gallery, badge, badge_color,
        featured, trending,
        rating, jumlah_ulasan,
        tiket_masuk, tiket_masuk_rp,
        jarak_dari_kota, jarak_label, jam_buka, akses_jalan,
        highlight, deskripsi_singkat, deskripsi_lengkap,
        aktivitas, cocok_untuk, tips_kunjungan,
        google_maps_url, latitude, longitude
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        beach.id,
        beach.name,
        kecamatanId,
        beach.kelurahan,
        beach.alamatLengkap,
        beach.image,
        JSON.stringify(beach.imageGallery ?? []),
        beach.badge,
        beach.badgeColor,
        beach.featured ? 1 : 0,
        beach.trending ? 1 : 0,
        beach.rating,
        beach.reviews,
        beach.tiketMasuk,
        beach.tiketMasukRp,
        beach.jarakDariKota,
        beach.jarakLabel,
        beach.jamBuka,
        beach.aksesJalan,
        beach.highlight,
        beach.deskripsiSingkat,
        beach.deskripsiLengkap,
        JSON.stringify(beach.aktivitas ?? []),
        JSON.stringify(beach.cocokUntuk ?? []),
        JSON.stringify(beach.tipsKunjungan ?? []),
        beach.googleMapsUrl,
        beach.koordinat.lat,
        beach.koordinat.lng,
      ],
    );

    // Insert fasilitas
    if (beach.fasilitas) {
      for (const [key, value] of Object.entries(beach.fasilitas) as [
        keyof BeachFacility,
        boolean,
      ][]) {
        if (!value) continue;
        const dbName = FASILITAS_KEY_TO_DB[key];
        const [fRows] = await conn.query(
          "SELECT id_fasilitas FROM fasilitas WHERE nama_fasilitas = ? LIMIT 1",
          [dbName],
        );
        const fList = fRows as Array<{ id_fasilitas: number }>;
        let fasId: number;
        if (fList.length > 0) {
          fasId = fList[0].id_fasilitas;
        } else {
          const [fRes] = await conn.query(
            "INSERT INTO fasilitas (nama_fasilitas) VALUES (?)",
            [dbName],
          );
          fasId = (fRes as { insertId: number }).insertId;
        }
        await conn.query(
          "INSERT IGNORE INTO pantai_fasilitas (id_pantai, id_fasilitas) VALUES (?,?)",
          [beach.id, fasId],
        );
      }
    }

    // Insert kategori_rekomendasi
    const rek = beach.rekomendasi;
    await conn.query(
      `INSERT INTO kategori_rekomendasi
        (id_pantai, suasana_score, fasilitas_score, akses_score, popularitas_score,
         rating_kategori, harga_kategori, jarak_kategori, label_rekomendasi)
       VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        beach.id,
        rek?.suasanaScore ?? 3,
        rek?.fasilitasScore ?? 3,
        rek?.aksesScore ?? 3,
        rek?.popularitasScore ?? 3,
        rek?.ratingKategori ?? null,
        rek?.hargaKategori ?? null,
        rek?.jarakKategori ?? null,
        rek?.labelDatabase ?? null,
      ],
    );

    await conn.commit();
    return NextResponse.json({ success: true, id: beach.id }, { status: 201 });
  } catch (err) {
    await conn.rollback();
    console.error("POST /api/admin/pantai error:", err);
    return NextResponse.json(
      { success: false, error: "Gagal menyimpan data pantai" },
      { status: 500 },
    );
  } finally {
    conn.release();
  }
}
