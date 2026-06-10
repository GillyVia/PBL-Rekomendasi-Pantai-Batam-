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

    // Map JS field name → DB column name
    const fieldMap: Record<string, string> = {
      name: "nama_pantai",
      kelurahan: "kelurahan",
      alamatLengkap: "alamat",
      image: "foto_url",
      imageGallery: "image_gallery",
      badge: "badge",
      badgeColor: "badge_color",
      featured: "featured",
      trending: "trending",
      rating: "rating",
      reviews: "jumlah_ulasan",
      tiketMasuk: "tiket_masuk",
      tiketMasukRp: "tiket_masuk_rp",
      jarakDariKota: "jarak_dari_kota",
      jarakLabel: "jarak_label",
      jamBuka: "jam_buka",
      aksesJalan: "akses_jalan",
      highlight: "highlight",
      deskripsiSingkat: "deskripsi_singkat",
      deskripsiLengkap: "deskripsi_lengkap",
      aktivitas: "aktivitas",
      cocokUntuk: "cocok_untuk",
      tipsKunjungan: "tips_kunjungan",
      googleMapsUrl: "google_maps_url",
    };

    const jsonArrayFields = new Set([
      "imageGallery",
      "aktivitas",
      "cocokUntuk",
      "tipsKunjungan",
    ]);
    const boolFields = new Set(["featured", "trending"]);

    const setClauses: string[] = [];
    const values: unknown[] = [];

    for (const [jsKey, dbCol] of Object.entries(fieldMap)) {
      if (!(jsKey in payload)) continue;
      const val = payload[jsKey as keyof BeachData];
      setClauses.push(`${dbCol} = ?`);
      if (jsonArrayFields.has(jsKey)) {
        values.push(JSON.stringify(val));
      } else if (boolFields.has(jsKey)) {
        values.push(val ? 1 : 0);
      } else {
        values.push(val);
      }
    }

    if ("koordinat" in payload && payload.koordinat) {
      setClauses.push("latitude = ?", "longitude = ?");
      values.push(payload.koordinat.lat, payload.koordinat.lng);
    }

    if ("kecamatan" in payload && payload.kecamatan) {
      const [existing] = await conn.query(
        "SELECT id_kecamatan FROM kecamatan WHERE nama_kecamatan = ? LIMIT 1",
        [payload.kecamatan],
      );
      const ekList = existing as Array<{ id_kecamatan: number }>;
      let kecamatanId: number;
      if (ekList.length > 0) {
        kecamatanId = ekList[0].id_kecamatan;
      } else {
        const [res] = await conn.query(
          "INSERT INTO kecamatan (nama_kecamatan) VALUES (?)",
          [payload.kecamatan],
        );
        kecamatanId = (res as { insertId: number }).insertId;
      }
      setClauses.push("id_kecamatan = ?");
      values.push(kecamatanId);
    }

    if (setClauses.length > 0) {
      values.push(id);
      await conn.query(
        `UPDATE pantai SET ${setClauses.join(", ")} WHERE id_pantai = ?`,
        values,
      );
    }

    // Update fasilitas
    if ("fasilitas" in payload && payload.fasilitas) {
      await conn.query(
        "DELETE FROM pantai_fasilitas WHERE id_pantai = ?",
        [id],
      );
      for (const [key, value] of Object.entries(payload.fasilitas) as [
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
          [id, fasId],
        );
      }
    }

    // Update kategori_rekomendasi
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
      if (rek.labelDatabase !== undefined) { rekClauses.push("label_rekomendasi=?"); rekValues.push(rek.labelDatabase); }

      if (rekClauses.length > 0) {
        rekValues.push(id);
        await conn.query(
          `UPDATE kategori_rekomendasi SET ${rekClauses.join(", ")} WHERE id_pantai = ?`,
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
    await conn.query("DELETE FROM pantai_fasilitas WHERE id_pantai = ?", [id]);
    await conn.query("DELETE FROM kategori_rekomendasi WHERE id_pantai = ?", [id]);
    await conn.query("DELETE FROM pantai WHERE id_pantai = ?", [id]);
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
