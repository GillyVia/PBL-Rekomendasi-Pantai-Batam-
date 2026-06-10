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
      ORDER BY p.nama ASC
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
        aksesJalan:
          (row.akses_jalan as "mudah" | "sedang" | "sulit") ?? "sedang",
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
          suasanaScore: Number(row.suasana_score) || 3,
          fasilitasScore: Number(row.fasilitas_score) || 3,
          aksesScore: Number(row.akses_score) || 3,
          popularitasScore: Number(row.popularitas_score) || 3,
          ratingKategori: row.rating_kategori as string | null,
          hargaKategori: row.harga_kategori as string | null,
          jarakKategori: row.jarak_kategori as string | null,
          labelDatabase: row.label_database as string | null,
          labelJ48: "direkomendasikan",
        },
      };
    });

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
      "SELECT id FROM kecamatan WHERE nama = ? LIMIT 1",
      [beach.kecamatan],
    );
    const ekList = existing as Array<{ id: number }>;
    if (ekList.length > 0) {
      kecamatanId = ekList[0].id;
    } else {
      const [res] = await conn.query(
        "INSERT INTO kecamatan (nama) VALUES (?)",
        [beach.kecamatan],
      );
      kecamatanId = (res as { insertId: number }).insertId;
    }

    // Insert pantai
    await conn.query(
      `INSERT INTO pantai (
        id, nama, kecamatan_id, kelurahan, alamat_lengkap,
        image, image_gallery, badge, badge_color,
        featured, trending,
        rating, reviews,
        tiket_masuk, tiket_masuk_rp,
        jarak_dari_kota, jarak_label, jam_buka, akses_jalan,
        highlight, deskripsi_singkat, deskripsi_lengkap,
        kelebihan_utama, aktivitas, cocok_untuk, tips_kunjungan,
        google_maps_url, koordinat_lat, koordinat_lng
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
        JSON.stringify(beach.kelebihanUtama ?? []),
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
          "SELECT id FROM fasilitas WHERE nama = ? LIMIT 1",
          [dbName],
        );
        const fList = fRows as Array<{ id: number }>;
        let fasId: number;
        if (fList.length > 0) {
          fasId = fList[0].id;
        } else {
          const [fRes] = await conn.query(
            "INSERT INTO fasilitas (nama) VALUES (?)",
            [dbName],
          );
          fasId = (fRes as { insertId: number }).insertId;
        }
        await conn.query(
          "INSERT IGNORE INTO pantai_fasilitas (pantai_id, fasilitas_id) VALUES (?,?)",
          [beach.id, fasId],
        );
      }
    }

    // Insert kategori_rekomendasi with defaults
    const rek = beach.rekomendasi;
    await conn.query(
      `INSERT INTO kategori_rekomendasi
        (pantai_id, suasana_score, fasilitas_score, akses_score, popularitas_score,
         rating_kategori, harga_kategori, jarak_kategori, label_database)
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
