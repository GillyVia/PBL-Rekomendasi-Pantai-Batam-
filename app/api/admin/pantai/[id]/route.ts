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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const conn = await db.getConnection();

  try {
    const payload = (await request.json()) as Partial<BeachData>;
    await conn.beginTransaction();

    const fieldMap: Record<string, string> = {
      name: "nama",
      kelurahan: "kelurahan",
      alamatLengkap: "alamat_lengkap",
      image: "image",
      imageGallery: "image_gallery",
      badge: "badge",
      badgeColor: "badge_color",
      featured: "featured",
      trending: "trending",
      rating: "rating",
      reviews: "reviews",
      tiketMasuk: "tiket_masuk",
      tiketMasukRp: "tiket_masuk_rp",
      jarakDariKota: "jarak_dari_kota",
      jarakLabel: "jarak_label",
      jamBuka: "jam_buka",
      aksesJalan: "akses_jalan",
      highlight: "highlight",
      deskripsiSingkat: "deskripsi_singkat",
      deskripsiLengkap: "deskripsi_lengkap",
      kelebihanUtama: "kelebihan_utama",
      aktivitas: "aktivitas",
      cocokUntuk: "cocok_untuk",
      tipsKunjungan: "tips_kunjungan",
      googleMapsUrl: "google_maps_url",
    };

    const setClauses: string[] = [];
    const values: unknown[] = [];

    for (const [jsKey, dbCol] of Object.entries(fieldMap)) {
      if (!(jsKey in payload)) continue;
      const val = payload[jsKey as keyof BeachData];
      if (
        jsKey === "imageGallery" ||
        jsKey === "kelebihanUtama" ||
        jsKey === "aktivitas" ||
        jsKey === "cocokUntuk" ||
        jsKey === "tipsKunjungan"
      ) {
        setClauses.push(`${dbCol} = ?`);
        values.push(JSON.stringify(val));
      } else if (jsKey === "featured" || jsKey === "trending") {
        setClauses.push(`${dbCol} = ?`);
        values.push(val ? 1 : 0);
      } else {
        setClauses.push(`${dbCol} = ?`);
        values.push(val);
      }
    }

    if ("koordinat" in payload && payload.koordinat) {
      setClauses.push("koordinat_lat = ?", "koordinat_lng = ?");
      values.push(payload.koordinat.lat, payload.koordinat.lng);
    }

    if ("kecamatan" in payload && payload.kecamatan) {
      let kecamatanId: number;
      const [existing] = await conn.query(
        "SELECT id FROM kecamatan WHERE nama = ? LIMIT 1",
        [payload.kecamatan],
      );
      const ekList = existing as Array<{ id: number }>;
      if (ekList.length > 0) {
        kecamatanId = ekList[0].id;
      } else {
        const [res] = await conn.query(
          "INSERT INTO kecamatan (nama) VALUES (?)",
          [payload.kecamatan],
        );
        kecamatanId = (res as { insertId: number }).insertId;
      }
      setClauses.push("kecamatan_id = ?");
      values.push(kecamatanId);
    }

    if (setClauses.length > 0) {
      values.push(id);
      await conn.query(
        `UPDATE pantai SET ${setClauses.join(", ")} WHERE id = ?`,
        values,
      );
    }

    // Update fasilitas if provided
    if ("fasilitas" in payload && payload.fasilitas) {
      await conn.query(
        "DELETE FROM pantai_fasilitas WHERE pantai_id = ?",
        [id],
      );
      for (const [key, value] of Object.entries(payload.fasilitas) as [
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
          [id, fasId],
        );
      }
    }

    // Update kategori_rekomendasi if provided
    if ("rekomendasi" in payload && payload.rekomendasi) {
      const rek = payload.rekomendasi;
      const rekClauses: string[] = [];
      const rekValues: unknown[] = [];

      if (rek.suasanaScore !== undefined) { rekClauses.push("suasana_score=?"); rekValues.push(rek.suasanaScore); }
      if (rek.fasilitasScore !== undefined) { rekClauses.push("fasilitas_score=?"); rekValues.push(rek.fasilitasScore); }
      if (rek.aksesScore !== undefined) { rekClauses.push("akses_score=?"); rekValues.push(rek.aksesScore); }
      if (rek.popularitasScore !== undefined) { rekClauses.push("popularitas_score=?"); rekValues.push(rek.popularitasScore); }
      if (rek.ratingKategori !== undefined) { rekClauses.push("rating_kategori=?"); rekValues.push(rek.ratingKategori); }
      if (rek.hargaKategori !== undefined) { rekClauses.push("harga_kategori=?"); rekValues.push(rek.hargaKategori); }
      if (rek.jarakKategori !== undefined) { rekClauses.push("jarak_kategori=?"); rekValues.push(rek.jarakKategori); }
      if (rek.labelDatabase !== undefined) { rekClauses.push("label_database=?"); rekValues.push(rek.labelDatabase); }

      if (rekClauses.length > 0) {
        rekValues.push(id);
        await conn.query(
          `UPDATE kategori_rekomendasi SET ${rekClauses.join(", ")} WHERE pantai_id = ?`,
          rekValues,
        );
      }
    }

    await conn.commit();
    return NextResponse.json({ success: true });
  } catch (err) {
    await conn.rollback();
    console.error(`PATCH /api/admin/pantai/${id} error:`, err);
    return NextResponse.json(
      { success: false, error: "Gagal memperbarui data pantai" },
      { status: 500 },
    );
  } finally {
    conn.release();
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();
    await conn.query("DELETE FROM pantai_fasilitas WHERE pantai_id = ?", [id]);
    await conn.query("DELETE FROM kategori_rekomendasi WHERE pantai_id = ?", [id]);
    await conn.query("DELETE FROM pantai WHERE id = ?", [id]);
    await conn.commit();
    return NextResponse.json({ success: true });
  } catch (err) {
    await conn.rollback();
    console.error(`DELETE /api/admin/pantai/${id} error:`, err);
    return NextResponse.json(
      { success: false, error: "Gagal menghapus data pantai" },
      { status: 500 },
    );
  } finally {
    conn.release();
  }
}
