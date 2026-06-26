"""
Export data training dari MySQL ke Excel (ml/data_pantai.xlsx).

Cara pakai:
  pip install mysql-connector-python openpyxl pandas python-dotenv
  python ml/export_db_to_excel.py

Setelah selesai, jalankan training:
  python ml/c45_custom.py
"""

import os
import sys
from pathlib import Path

# Load .env.local otomatis
try:
    from dotenv import load_dotenv
    env_path = Path(__file__).parent.parent / ".env.local"
    if env_path.exists():
        load_dotenv(env_path)
        print(f"[INFO] Loaded {env_path}")
    else:
        print(f"[WARN] .env.local tidak ditemukan di {env_path}")
        print("[WARN] Pastikan variabel DB_HOST, DB_USER, DB_PASSWORD, DB_NAME sudah di-set.")
except ImportError:
    print("[WARN] python-dotenv tidak terinstall — membaca env dari sistem.")
    print("       Install dengan: pip install python-dotenv")

import pandas as pd

try:
    import mysql.connector
except ImportError:
    print("\n[ERROR] mysql-connector-python belum terinstall.")
    print("        Jalankan: pip install mysql-connector-python")
    sys.exit(1)

# ── Konfigurasi koneksi (baca dari .env.local) ──────────────────────────────
DB_CONFIG = {
    "host":     os.getenv("DB_HOST", "localhost"),
    "port":     int(os.getenv("DB_PORT", "3306")),
    "user":     os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASSWORD", ""),
    "database": os.getenv("DB_NAME", "rekomendasi_pantai_batam"),
}

OUTPUT_PATH = Path(__file__).parent / "data_pantai.xlsx"

# ── Query ─────────────────────────────────────────────────────────────────────
QUERY = """
SELECT
    p.id_pantai,
    p.nama_pantai,
    k.nama_kecamatan,
    kr.suasana_score,
    kr.fasilitas_score,
    kr.akses_score,
    kr.popularitas_score,
    kr.label_rekomendasi AS label
FROM pantai p
JOIN kategori_rekomendasi kr ON p.id_pantai = kr.id_pantai
LEFT JOIN kecamatan k ON p.id_kecamatan = k.id_kecamatan
ORDER BY p.id_pantai
"""

def main():
    print(f"\n[INFO] Menghubungkan ke database...")
    print(f"       Host     : {DB_CONFIG['host']}:{DB_CONFIG['port']}")
    print(f"       Database : {DB_CONFIG['database']}")
    print(f"       User     : {DB_CONFIG['user']}")

    try:
        conn = mysql.connector.connect(**DB_CONFIG)
    except mysql.connector.Error as e:
        print(f"\n[ERROR] Koneksi gagal: {e}")
        print("\nPastikan:")
        print("  1. MySQL/XAMPP sedang berjalan")
        print("  2. Nilai DB_HOST, DB_USER, DB_PASSWORD, DB_NAME di .env.local sudah benar")
        sys.exit(1)

    cursor = conn.cursor(dictionary=True)
    cursor.execute(QUERY)
    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    if not rows:
        print("\n[ERROR] Tidak ada data di tabel kategori_rekomendasi.")
        print("        Pastikan tabel sudah terisi melalui panel admin.")
        sys.exit(1)

    df = pd.DataFrame(rows)
    print(f"\n[INFO] Data berhasil diambil: {len(df)} baris")
    print(f"\n[INFO] Distribusi label:")
    print(df["label"].value_counts().to_string())

    print(f"\n[INFO] Preview 5 baris pertama:")
    print(df[["nama_pantai", "suasana_score", "fasilitas_score",
              "akses_score", "popularitas_score", "label"]].head().to_string(index=False))

    # Simpan ke Excel
    df.to_excel(OUTPUT_PATH, index=False)
    print(f"\n[OK] Dataset tersimpan -> {OUTPUT_PATH}")
    print(f"\n[NEXT] Sekarang jalankan training:")
    print(f"       python ml/c45_custom.py")


if __name__ == "__main__":
    main()
