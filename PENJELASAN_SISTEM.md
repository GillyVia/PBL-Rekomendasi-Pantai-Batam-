# Penjelasan Sistem Website Rekomendasi Pantai Batam
### Cara Kerja Sistem & Model Machine Learning (Decision Tree C4.5 / J48)

---

## Daftar Isi

1. [Gambaran Umum Sistem](#1-gambaran-umum-sistem)
2. [Struktur Teknologi (Tech Stack)](#2-struktur-teknologi-tech-stack)
3. [Alur Kerja Website (Flow Diagram)](#3-alur-kerja-website-flow-diagram)
4. [Database — Struktur Tabel](#4-database--struktur-tabel)
5. [Koneksi Database (`lib/db.ts`)](#5-koneksi-database-libdbts)
6. [Tipe Data TypeScript (`types/beach.ts`)](#6-tipe-data-typescript-typesbeachts)
7. [Machine Learning — Pipeline C4.5 (`ml/c45_pipeline.py`)](#7-machine-learning--pipeline-c45-mlc45_pipelinepy)
8. [Decision Tree — Fungsi Prediksi (`lib/j48.ts`)](#8-decision-tree--fungsi-prediksi-libj48ts)
9. [API Backend — Endpoint Rekomendasi](#9-api-backend--endpoint-rekomendasi)
10. [API Backend — Endpoint Admin (CRUD)](#10-api-backend--endpoint-admin-crud)
11. [State Management — React Context](#11-state-management--react-context)
12. [Autentikasi Admin](#12-autentikasi-admin)
13. [Root Layout & Provider Tree](#13-root-layout--provider-tree)
14. [Ringkasan Alur Data End-to-End](#14-ringkasan-alur-data-end-to-end)

---

## 1. Gambaran Umum Sistem

Website ini adalah sistem **rekomendasi wisata pantai di Kota Batam** berbasis *Machine Learning*. Sistem ini:

- Menyimpan data 40+ pantai di Batam dalam database MySQL.
- Menggunakan algoritma **Decision Tree C4.5 (J48)** untuk mengklasifikasikan setiap pantai ke dalam 3 label rekomendasi.
- Menampilkan rekomendasi pantai kepada wisatawan melalui antarmuka web modern (Next.js + React).
- Menyediakan panel admin untuk mengelola data pantai (tambah, ubah, hapus).

---

## 2. Struktur Teknologi (Tech Stack)

| Lapisan | Teknologi |
|---|---|
| **Frontend** | Next.js 16 (App Router), React 19, Tailwind CSS v4 |
| **Backend** | Next.js API Routes (server-side) |
| **Database** | MySQL / MariaDB |
| **Driver DB** | `mysql2/promise` (Node.js) |
| **Machine Learning** | Python, scikit-learn, pandas, numpy, matplotlib |
| **Bahasa Pemrograman** | TypeScript (web), Python (ML) |
| **State Management** | React Context API |

---

## 3. Alur Kerja Website (Flow Diagram)

```
Wisatawan buka website
        │
        ▼
  [Root Layout]
  BeachesProvider & AdminAuthProvider dibungkus di sini
        │
        ▼
  [BeachesContext]
  useEffect → fetch("/api/rekomendasi")
        │
        ▼
  [API Route: /api/rekomendasi]
  1. Query database MySQL (pantai + kecamatan + kategori_rekomendasi + fasilitas)
  2. Panggil predictJ48() → hasilkan label rekomendasi
  3. Sort: sangat_direkomendasikan → direkomendasikan → tidak_direkomendasikan
  4. Return JSON
        │
        ▼
  [BeachesContext menyimpan data]
  beaches[], beachesByDistrict{}, trendingBeaches[], kecamatanList[]
        │
        ▼
  [Komponen React membaca data via useBeachesContext()]
  HeroSection, FeaturedBeachesNew, BeachesByDistrict, dsb.
        │
        ▼
  [Tampilan ke layar wisatawan]
```

---

## 4. Database — Struktur Tabel

Database bernama `rekomendasi_pantai_batam` terdiri dari 5 tabel:

### Tabel `pantai` (data utama pantai)
```sql
CREATE TABLE pantai (
  id_pantai       VARCHAR PRIMARY KEY,  -- ID unik pantai, cth: "pantai_nongsa"
  nama_pantai     VARCHAR(100),         -- Nama pantai
  id_kecamatan    INT,                  -- FK ke tabel kecamatan
  kelurahan       VARCHAR(100),         -- Nama kelurahan
  alamat          TEXT,                 -- Alamat lengkap
  foto_url        VARCHAR(255),         -- URL foto utama
  image_gallery   JSON,                 -- Array URL foto galeri
  rating          DECIMAL(3,1),         -- Rating (0.0 - 5.0)
  jumlah_ulasan   INT,                  -- Jumlah ulasan
  latitude        DECIMAL(10,7),        -- Koordinat GPS lintang
  longitude       DECIMAL(10,7),        -- Koordinat GPS bujur
  featured        TINYINT(1),           -- Apakah pantai unggulan?
  trending        TINYINT(1),           -- Apakah sedang trending?
  ...
);
```

### Tabel `kecamatan`
```sql
CREATE TABLE kecamatan (
  id_kecamatan    INT AUTO_INCREMENT PRIMARY KEY,
  nama_kecamatan  VARCHAR(100)  -- cth: "Nongsa", "Sekupang", "Batu Ampar"
);
```
Berisi 11 kecamatan di Kota Batam.

### Tabel `fasilitas`
```sql
CREATE TABLE fasilitas (
  id_fasilitas     INT AUTO_INCREMENT PRIMARY KEY,
  nama_fasilitas   VARCHAR(100)  -- cth: "toilet", "mushola", "gazebo"
);
```
Berisi 10 jenis fasilitas pantai.

### Tabel `pantai_fasilitas` (relasi banyak-ke-banyak)
```sql
CREATE TABLE pantai_fasilitas (
  id_pantai    VARCHAR,  -- FK ke pantai
  id_fasilitas INT       -- FK ke fasilitas
);
```
Satu pantai bisa punya banyak fasilitas, satu fasilitas bisa ada di banyak pantai.

### Tabel `kategori_rekomendasi` (skor untuk ML)
```sql
CREATE TABLE kategori_rekomendasi (
  id_pantai          VARCHAR,       -- FK ke pantai
  suasana_score      INT (1–5),     -- Skor suasana pantai
  fasilitas_score    INT (1–5),     -- Skor kelengkapan fasilitas
  akses_score        INT (1–5),     -- Skor kemudahan akses jalan
  popularitas_score  INT (1–5),     -- Skor popularitas/keramaian
  label_rekomendasi  VARCHAR        -- Label manual (opsional)
);
```
Keempat skor inilah yang menjadi **input fitur** bagi model Decision Tree.

---

## 5. Koneksi Database (`lib/db.ts`)

**File:** [lib/db.ts](lib/db.ts)

```typescript
import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host:     process.env.DB_HOST,       // dari file .env.local
  port:     Number(process.env.DB_PORT ?? 3306),
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,  // maksimum 10 koneksi sekaligus
  queueLimit: 0,        // antrian tidak dibatasi
});
```

**Penjelasan:**
- `mysql.createPool()` membuat kumpulan koneksi (*connection pool*) agar koneksi ke database tidak dibuka-tutup setiap request, tapi dipakai ulang — lebih efisien.
- `connectionLimit: 10` artinya paling banyak 10 request bisa mengakses database secara bersamaan.
- Semua kredensial dibaca dari variabel lingkungan (`process.env`) — tidak hardcoded di kode agar aman.

---

## 6. Tipe Data TypeScript (`types/beach.ts`)

**File:** [types/beach.ts](types/beach.ts)

File ini mendefinisikan "bentuk" data yang beredar di seluruh aplikasi menggunakan TypeScript.

```typescript
// Fasilitas pantai — 10 properti boolean (ada/tidak)
export type BeachFacility = {
  toilet: boolean;       mushola: boolean;
  warungMakan: boolean;  parkirMotor: boolean;
  parkirMobil: boolean;  gazebo: boolean;
  sewaAlat: boolean;     penginapan: boolean;
  wifi: boolean;         penjagaPantai: boolean;
};

// Tingkat kesulitan akses jalan
export type BeachAccess = "mudah" | "sedang" | "sulit";

// Label hasil klasifikasi Decision Tree
export type RecommendationLabel =
  | "tidak_direkomendasikan"
  | "direkomendasikan"
  | "sangat_direkomendasikan";

// Skor dan label rekomendasi
export type BeachRecommendation = {
  suasanaScore: number;      // 1–5
  fasilitasScore: number;    // 1–5
  aksesScore: number;        // 1–5
  popularitasScore: number;  // 1–5
  labelJ48: RecommendationLabel;  // hasil prediksi model ML
  labelDatabase?: string | null;  // label manual di database
};

// Tipe utama satu objek pantai
export type BeachData = {
  id: string;
  name: string;
  kecamatan: string;
  rating: number;
  fasilitas: BeachFacility;
  rekomendasi?: BeachRecommendation;
  // ... dan banyak properti lainnya
};
```

**Penjelasan:**
- `type` di TypeScript berguna untuk memastikan data yang diproses selalu dalam format yang benar.
- Jika ada properti yang tidak sesuai tipe, TypeScript langsung error saat *build* — mencegah bug di runtime.

---

## 7. Machine Learning — Pipeline C4.5 (`ml/c45_pipeline.py`)

**File:** [ml/c45_pipeline.py](ml/c45_pipeline.py)

Ini adalah skrip Python yang melatih model Decision Tree dan mengekspor hasilnya ke TypeScript.

### 7.1 — Konsep Algoritma C4.5 / J48

**Decision Tree** adalah model ML yang bekerja seperti diagram alur pertanyaan ya/tidak:

```
Apakah popularitas_score ≤ 2.5?
├── Ya → Apakah suasana_score ≤ 1.5?
│         ├── Ya  → TIDAK DIREKOMENDASIKAN
│         └── Tidak → DIREKOMENDASIKAN
└── Tidak → Apakah fasilitas_score ≤ 1.5?
              ├── Ya  → DIREKOMENDASIKAN
              └── Tidak → SANGAT DIREKOMENDASIKAN
```

**C4.5** adalah versi penyempurnaan dari algoritma ID3 yang menggunakan **Information Gain Ratio** dan **Entropy** sebagai ukuran pemilihan fitur terbaik untuk memisah data.

- **Entropy** mengukur "ketidakpastian" suatu node. Nilai 0 = semua data satu kelas (murni). Nilai tinggi = data campur aduk.
- **Information Gain** = seberapa besar entropy berkurang setelah memisah data berdasarkan suatu fitur.
- Fitur dengan Information Gain tertinggi dipilih sebagai titik percabangan (split).

### 7.2 — Langkah-langkah Pipeline

**Langkah 1: Memuat Data**

```python
LABEL_MAP = {
    0: "tidak_direkomendasikan",
    1: "direkomendasikan",
    2: "sangat_direkomendasikan",
}

def domain_label(row: pd.Series) -> int:
    """Auto-label menggunakan aturan domain."""
    score = (row["suasana_score"] + row["fasilitas_score"]
             + row["akses_score"] + row["popularitas_score"])
    if score >= 16:
        return 2   # sangat_direkomendasikan
    elif score >= 10:
        return 1   # direkomendasikan
    else:
        return 0   # tidak_direkomendasikan
```

- Jika file `data_pantai.xlsx` ada → data dibaca dari Excel.
- Jika tidak ada → dibuat **120 data sintetis acak** dengan `numpy.random`.
- Jika kolom `label` belum ada di data → label dibuat otomatis dengan fungsi `domain_label()`.
- **Aturan domain:** Jumlah total 4 skor (maks 20) → ≥16 sangat direkomendasikan, ≥10 direkomendasikan, <10 tidak direkomendasikan.

---

**Langkah 2: Melatih Model**

```python
def train(df: pd.DataFrame) -> DecisionTreeClassifier:
    feature_cols = ["suasana_score", "fasilitas_score",
                    "akses_score", "popularitas_score"]
    X = df[feature_cols].values  # fitur input (matrix)
    y = df["label"].values        # label target (vector)

    # Hyperparameter search: cari max_depth terbaik
    param_grid = {"max_depth": [2, 3, 4, 5, None]}
    skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    base = DecisionTreeClassifier(criterion="entropy", random_state=42)
    gs = GridSearchCV(base, param_grid, cv=skf, scoring="f1_macro", n_jobs=-1)
    gs.fit(X, y)

    # Latih model final dengan depth terbaik
    model = DecisionTreeClassifier(
        criterion="entropy",
        max_depth=gs.best_params_["max_depth"],
        random_state=42
    )
    model.fit(X, y)
    return model
```

Penjelasan parameter kunci:
| Parameter | Nilai | Penjelasan |
|---|---|---|
| `criterion="entropy"` | Entropy | Menggunakan Information Gain (C4.5) bukan Gini |
| `max_depth` | 2–5 atau None | Kedalaman pohon maksimum — dikari terbaik lewat GridSearch |
| `StratifiedKFold(n_splits=5)` | 5 lipatan | Setiap kelas terwakili proporsional di setiap fold |
| `GridSearchCV` | — | Mencoba semua kombinasi parameter, pilih F1-macro terbaik |
| `random_state=42` | 42 | Memastikan hasil reproducible (selalu sama setiap dijalankan) |

**5-Fold Cross-Validation** berarti:
- Data dibagi 5 bagian.
- Model dilatih 5 kali, setiap kali menggunakan 4 bagian sebagai data latih dan 1 bagian sebagai data uji.
- Hasil dirata-rata untuk mendapatkan estimasi akurasi yang lebih andal.

---

**Langkah 3: Ekspor ke TypeScript**

```python
def tree_to_typescript(model, feature_names) -> str:
    tree = model.tree_

    def recurse(node: int, depth: int) -> list[str]:
        indent = "  " * (depth + 1)

        if tree.feature[node] == -2:  # ini node daun (leaf)
            class_idx = int(np.argmax(tree.value[node]))
            label = label_names[class_idx]
            n_samples = int(tree.n_node_samples[node])
            entropy = float(tree.impurity[node])
            return [
                f"{indent}// n={n_samples}, entropy={entropy:.6f}",
                f'{indent}return "{label}";'
            ]
        else:
            feat = feature_names[tree.feature[node]]  # nama fitur
            threshold = tree.threshold[node]           # nilai ambang batas
            lines = [f"{indent}if ({feat} <= {threshold:.1f}) {{"]
            lines += recurse(tree.children_left[node], depth + 1)
            lines += [f"{indent}}} else {{"]
            lines += recurse(tree.children_right[node], depth + 1)
            lines += [f"{indent}}}"]
            return lines
```

**Penjelasan:**
- Fungsi rekursif `recurse()` menelusuri setiap node pohon.
- `tree.feature[node] == -2` menandakan node tersebut adalah **daun** (leaf) — tempat keputusan akhir.
- Setiap percabangan diubah menjadi sintaks `if/else` TypeScript.
- Hasilnya disimpan ke file `ml/output_c45/predictJ48.ts`.

**Langkah 4: Ekspor ke JSON dan PNG**
- `tree_to_json()` → menyimpan struktur pohon ke `tree.json` (berguna untuk visualisasi web).
- `plot_tree()` dari matplotlib → menyimpan gambar pohon ke `tree_visualization.png`.
- `export_text()` → menyimpan representasi teks ke `tree_text.txt`.

---

## 8. Decision Tree — Fungsi Prediksi (`lib/j48.ts`)

**File:** [lib/j48.ts](lib/j48.ts)

Ini adalah **hasil ekspor otomatis** dari pipeline Python. Isinya adalah implementasi pohon keputusan dalam TypeScript murni — tidak memerlukan library Python saat website berjalan.

```typescript
export function predictJ48({
  suasana_score,
  fasilitas_score,
  akses_score,
  popularitas_score,
}: {
  suasana_score: number;
  fasilitas_score: number;
  akses_score: number;
  popularitas_score: number;
}): RecommendationLabel {

  // Cabang 1: popularitas_score ≤ 2.5 (pantai kurang populer)
  if (popularitas_score <= 2.5) {
    if (suasana_score <= 1.5) {
      // n=3, entropy=0.0 → node murni, semua data satu kelas
      return "tidak_direkomendasikan";
    } else {
      // n=21, entropy=0.276195 → hampir murni
      return "direkomendasikan";
    }

  // Cabang 2: popularitas_score > 2.5 (pantai cukup populer)
  } else {
    if (fasilitas_score <= 1.5) {
      // n=3, entropy=0.918296 → agak campur tapi pilih "direkomendasikan"
      return "direkomendasikan";
    } else {
      // n=12, entropy=0.413817 → mayoritas sangat direkomendasikan
      return "sangat_direkomendasikan";
    }
  }
}
```

**Penjelasan Struktur Pohon:**

```
Root: popularitas_score ≤ 2.5?
│
├── [YA] → suasana_score ≤ 1.5?
│           ├── [YA]    → "tidak_direkomendasikan"  (3 data, entropy 0.0 = murni)
│           └── [TIDAK] → "direkomendasikan"         (21 data, entropy 0.276)
│
└── [TIDAK] → fasilitas_score ≤ 1.5?
              ├── [YA]    → "direkomendasikan"        (3 data, entropy 0.918)
              └── [TIDAK] → "sangat_direkomendasikan" (12 data, entropy 0.414)
```

**Cara Membaca Komentar Entropy:**
- `n=3, entropy=0.0` → 3 data sampai di daun ini, **entropy 0 = 100% satu kelas** (sangat yakin).
- `n=21, entropy=0.276` → 21 data, entropy mendekati 0 = **mayoritas satu kelas** (cukup yakin).
- `n=3, entropy=0.918` → entropy tinggi = **data campur** tapi pilih kelas mayoritas.

**Fitur yang paling penting (Root Split):**
Model memilih `popularitas_score` sebagai pemisah pertama karena fitur ini memberikan **Information Gain terbesar** — artinya popularitas adalah penentu utama apakah sebuah pantai layak direkomendasikan.

---

## 9. API Backend — Endpoint Rekomendasi

**File:** [app/api/rekomendasi/route.ts](app/api/rekomendasi/route.ts)

Endpoint: `GET /api/rekomendasi`

### Sintaks dan Penjelasan

```typescript
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { predictJ48 } from "@/lib/j48";

export const dynamic = "force-dynamic";  // ← selalu fetch fresh, tidak di-cache
```

**Langkah 1 — Query Database**

```typescript
const [rows] = await db.query(`
  SELECT
    p.id_pantai, p.nama_pantai, p.rating, ...
    k.nama_kecamatan,
    kr.suasana_score, kr.fasilitas_score, kr.akses_score, kr.popularitas_score
  FROM pantai p
  LEFT JOIN kecamatan k ON p.id_kecamatan = k.id_kecamatan
  LEFT JOIN kategori_rekomendasi kr ON p.id_pantai = kr.id_pantai
`);
```

- `LEFT JOIN` digunakan agar pantai yang belum punya data kecamatan atau skor tetap ikut ditampilkan (nilainya NULL).
- Query kedua mengambil semua fasilitas per pantai.

**Langkah 2 — Bangun Map Fasilitas**

```typescript
const fasMap = new Map<string, Set<string>>();
for (const r of fasRows) {
  if (!fasMap.has(r.id_pantai)) fasMap.set(r.id_pantai, new Set());
  fasMap.get(r.id_pantai)!.add(r.nama_fasilitas.toLowerCase());
}
```

- `Map<string, Set<string>>` → kunci: `id_pantai`, nilai: kumpulan nama fasilitas.
- Menggunakan `Set` agar tidak ada duplikat fasilitas per pantai.
- `.toLowerCase()` untuk normalisasi (menghindari perbedaan "Toilet" vs "toilet").

**Langkah 3 — Panggil Model ML & Bentuk Data**

```typescript
const labelJ48 = predictJ48({
  suasana_score,
  fasilitas_score,
  akses_score,
  popularitas_score,
});
```

- Setiap baris data pantai langsung dikirim ke fungsi `predictJ48()`.
- Hasilnya (`labelJ48`) disertakan dalam objek respons.

**Langkah 4 — Urutkan Berdasarkan Label**

```typescript
const order = {
  sangat_direkomendasikan: 0,
  direkomendasikan: 1,
  tidak_direkomendasikan: 2,
} as const;

data.sort((a, b) => {
  const aO = order[a.rekomendasi!.labelJ48] ?? 3;
  const bO = order[b.rekomendasi!.labelJ48] ?? 3;
  if (aO !== bO) return aO - bO;  // sort by label dulu
  return b.rating - a.rating;      // jika label sama, sort by rating
});
```

- Pantai "sangat direkomendasikan" muncul di urutan paling atas.
- Jika label sama, pantai dengan rating lebih tinggi didahulukan.

---

## 10. API Backend — Endpoint Admin (CRUD)

**File:** [app/api/admin/pantai/route.ts](app/api/admin/pantai/route.ts)

### POST — Menambah Pantai Baru

```typescript
export async function POST(request: Request) {
  const conn = await db.getConnection();  // ambil koneksi dari pool
  try {
    const beach = await request.json();

    await conn.beginTransaction();  // mulai transaksi database

    // 1. Upsert kecamatan (cek dulu, kalau belum ada baru insert)
    const [existing] = await conn.query(
      "SELECT id_kecamatan FROM kecamatan WHERE nama_kecamatan = ? LIMIT 1",
      [beach.kecamatan]
    );
    if (existing.length > 0) {
      kecamatanId = existing[0].id_kecamatan;
    } else {
      const [res] = await conn.query(
        "INSERT INTO kecamatan (nama_kecamatan) VALUES (?)",
        [beach.kecamatan]
      );
      kecamatanId = res.insertId;
    }

    // 2. Insert data pantai utama
    await conn.query(`INSERT INTO pantai (...) VALUES (...)`, [...]);

    // 3. Insert fasilitas (loop setiap fasilitas yang ada)
    for (const [key, value] of Object.entries(beach.fasilitas)) {
      if (!value) continue;  // skip fasilitas yang false
      // cek fasilitas di tabel, ambil id_fasilitas-nya
      // INSERT IGNORE ke pantai_fasilitas
    }

    // 4. Insert skor rekomendasi
    await conn.query(`INSERT INTO kategori_rekomendasi (...) VALUES (...)`, [...]);

    await conn.commit();  // commit: simpan semua perubahan permanen
    return NextResponse.json({ success: true }, { status: 201 });

  } catch (err) {
    await conn.rollback();  // rollback: batalkan semua jika ada error
    return NextResponse.json({ success: false, error: "..." }, { status: 500 });
  } finally {
    conn.release();  // kembalikan koneksi ke pool
  }
}
```

**Mengapa memakai Transaksi (`beginTransaction` / `commit` / `rollback`)?**

Karena menambah pantai melibatkan **4 tabel sekaligus**. Jika salah satu INSERT gagal di tengah jalan, `rollback()` membatalkan semua perubahan — database tidak pernah dalam keadaan setengah tersimpan. Ini menjaga **konsistensi data** (prinsip ACID).

**Parameterized Query (`?` placeholder)**

```typescript
conn.query("SELECT ... WHERE nama_kecamatan = ?", [beach.kecamatan])
```

Tanda `?` adalah *placeholder* yang nilai-nilainya dikirim terpisah dari query SQL. Ini mencegah **SQL Injection** — nilai dari pengguna tidak pernah digabung langsung ke dalam string SQL.

---

## 11. State Management — React Context

**File:** [context/BeachesContext.tsx](context/BeachesContext.tsx)

React Context digunakan agar data pantai bisa diakses dari komponen mana saja tanpa harus di-*prop drilling*.

```typescript
// Definisi bentuk data yang disimpan di context
type BeachesContextValue = {
  beaches: BeachData[];                         // semua pantai
  loading: boolean;                             // sedang fetch?
  error: string | null;                         // pesan error jika gagal
  beachesByDistrict: Record<string, BeachData[]>; // pantai dikelompokkan per kecamatan
  kecamatanList: string[];                      // daftar nama kecamatan
  trendingBeaches: BeachData[];                 // pantai yang trending
};
```

**Proses Fetch Data:**

```typescript
useEffect(() => {
  let cancelled = false;

  const fetchBeaches = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/rekomendasi", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (!cancelled) setBeaches(json.data);  // cancelled check mencegah memory leak
    } catch (err) {
      if (!cancelled) setError(err.message);
    } finally {
      if (!cancelled) setLoading(false);
    }
  };

  void fetchBeaches();
  return () => { cancelled = true; };  // cleanup: batalkan jika komponen di-unmount
}, []);
```

- `useEffect` dengan `[]` → hanya dijalankan sekali saat komponen pertama kali dimuat.
- Flag `cancelled` mencegah `setState` dipanggil pada komponen yang sudah tidak ada (*memory leak*).

**Komputasi Turunan dengan `useMemo`:**

```typescript
// Dikelompokkan per kecamatan — hanya dihitung ulang jika `beaches` berubah
const beachesByDistrict = useMemo(
  () => beaches.reduce<Record<string, BeachData[]>>((acc, beach) => {
    const key = beach.kecamatan;
    if (!acc[key]) acc[key] = [];
    acc[key].push(beach);
    return acc;
  }, {}),
  [beaches]
);

// Filter pantai trending — hanya dihitung ulang jika `beaches` berubah
const trendingBeaches = useMemo(
  () => beaches.filter((beach) => beach.trending),
  [beaches]
);
```

`useMemo` adalah optimasi performa — nilai hanya dihitung ulang jika dependensinya (`beaches`) berubah, bukan setiap kali komponen re-render.

**Cara Komponen Menggunakan Context:**

```typescript
// Di dalam komponen manapun (harus berada dalam BeachesProvider)
import { useBeachesContext } from "@/context/BeachesContext";

function MyComponent() {
  const { beaches, loading, error } = useBeachesContext();

  if (loading) return <p>Memuat data...</p>;
  if (error)   return <p>Error: {error}</p>;
  return <div>{beaches.map(b => <BeachCard key={b.id} beach={b} />)}</div>;
}
```

---

## 12. Autentikasi Admin

**File:** [context/AdminAuthContext.tsx](context/AdminAuthContext.tsx)

```typescript
const login = (username: string, password: string): boolean => {
  const isValid = username === "admin" && password === "batam2026";

  if (isValid) {
    sessionStorage.setItem("batampantai_admin_session", "active");
    setIsAuthenticated(true);
    return true;
  }
  return false;
};

const logout = () => {
  sessionStorage.removeItem("batampantai_admin_session");
  setIsAuthenticated(false);
};
```

**Cara Kerja:**
- Validasi username dan password dilakukan di sisi klien (frontend).
- Jika berhasil, status sesi disimpan di `sessionStorage` browser.
- `sessionStorage` berbeda dengan `localStorage` — data hilang otomatis saat tab atau browser ditutup (lebih aman untuk sesi admin).
- Saat halaman di-refresh, `useEffect` membaca kembali `sessionStorage` untuk memulihkan status login.

```typescript
useEffect(() => {
  const saved = sessionStorage.getItem("batampantai_admin_session");
  setIsAuthenticated(saved === "active");  // pulihkan sesi jika ada
  setIsMounted(true);
}, []);

if (!isMounted) return null;  // hindari hydration mismatch saat SSR
```

---

## 13. Root Layout & Provider Tree

**File:** [app/layout.tsx](app/layout.tsx)

```typescript
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AdminAuthProvider>      {/* Context autentikasi admin */}
          <BeachesProvider>      {/* Context data pantai */}
            {children}           {/* Semua halaman dirender di sini */}
          </BeachesProvider>
        </AdminAuthProvider>
      </body>
    </html>
  );
}
```

**Penjelasan:**
- `RootLayout` adalah komponen induk yang membungkus semua halaman.
- Dengan menempatkan `AdminAuthProvider` dan `BeachesProvider` di sini, semua halaman dan komponen di bawahnya dapat mengakses context ini tanpa konfigurasi tambahan.
- `children` adalah placeholder untuk konten halaman yang sedang dikunjungi.

---

## 14. Ringkasan Alur Data End-to-End

Berikut ringkasan perjalanan data dari database hingga tampil di layar:

```
[Database MySQL]
  Tabel: pantai, kecamatan, kategori_rekomendasi, fasilitas, pantai_fasilitas
         │
         │ SQL Query (LEFT JOIN 3 tabel)
         ▼
[API Route: /api/rekomendasi]            ← Next.js Server
  1. Fetch rows dari DB
  2. Bangun fasMap (Map fasilitas per pantai)
  3. Panggil predictJ48(skor...) → labelJ48
  4. Bangun array BeachData[]
  5. Sort berdasarkan label + rating
  6. Return JSON
         │
         │ HTTP fetch("/api/rekomendasi")
         ▼
[BeachesContext — useEffect]             ← React Client
  setBeaches(json.data)
         │
         │ Computed dengan useMemo
         ▼
[Derived State]
  beachesByDistrict → { "Nongsa": [...], "Sekupang": [...] }
  trendingBeaches   → pantai[] yang trending === true
  kecamatanList     → ["Nongsa", "Sekupang", ...]
         │
         │ useBeachesContext()
         ▼
[React Components]
  HeroSection         → tampilkan pantai featured
  FeaturedBeachesNew  → carousel pantai unggulan
  BeachesByDistrict   → daftar per kecamatan
  CompareThreeBeaches → perbandingan 3 pantai
  BeachDetail         → detail satu pantai + label rekomendasi
```

### Alur Machine Learning secara terpisah:

```
[Python — c45_pipeline.py]     (dijalankan sekali saat development)
  1. Baca/buat data (Excel atau sintetis)
  2. Auto-label dengan aturan domain
  3. GridSearchCV → cari max_depth terbaik
  4. Latih DecisionTreeClassifier(criterion="entropy")
  5. 5-Fold cross-validation → evaluasi akurasi
  6. Ekspor pohon → TypeScript, JSON, PNG, TXT
         │
         ▼
[ml/output_c45/predictJ48.ts]  (file hasil generate)
         │
         │ import { predictJ48 } from "@/lib/j48"
         ▼
[API Route /api/rekomendasi]   (dipakai saat runtime website)
  predictJ48({ suasana_score, fasilitas_score, akses_score, popularitas_score })
  → "sangat_direkomendasikan" | "direkomendasikan" | "tidak_direkomendasikan"
```

**Poin penting:** Model ML **tidak dijalankan saat runtime** sebagai proses Python. Pipeline Python hanya dijalankan sekali oleh developer untuk menghasilkan kode TypeScript. Kode TypeScript itulah yang berjalan di server Next.js — ini membuat inferensi sangat cepat dan tidak memerlukan Python di server produksi.

---

*Dokumen ini dibuat secara otomatis berdasarkan analisis kode sumber proyek PBL-Rekomendasi-Pantai-Batam.*
