# BatamPantai — Sistem Rekomendasi Wisata Pantai Batam

Aplikasi web rekomendasi wisata pantai di Kota Batam berbasis **Next.js 16**, **MySQL**, dan algoritma **Decision Tree C4.5 (J48)**.

---

## Prasyarat

Pastikan semua software berikut sudah terinstall di komputer kamu:

| Software | Versi | Link |
|---|---|---|
| Node.js | ≥ 18 | https://nodejs.org |
| XAMPP (MySQL/MariaDB) | ≥ 3.3 | https://www.apachefriends.org |
| Git | ≥ 2.x | https://git-scm.com |

---

## Cara Setup (untuk anggota tim)

### 1. Clone repositori

```bash
git clone https://github.com/GillyVia/PBL-Rekomendasi-Pantai-Batam-.git
cd PBL-Rekomendasi-Pantai-Batam-
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup database MySQL

**Buka XAMPP → Start Apache + MySQL**

Import file database yang sudah disediakan di folder `database/`:

**Cara A — via phpMyAdmin (lebih mudah):**
1. Buka browser → `http://localhost/phpmyadmin`
2. Klik tab **Import** di bagian atas
3. Pilih file `database/rekomendasi_pantai_batam.sql`
4. Klik **Import/Go**

**Cara B — via terminal:**
```bash
# Windows (XAMPP)
"C:\xampp\mysql\bin\mysql.exe" -u root < database/rekomendasi_pantai_batam.sql

# Mac/Linux
mysql -u root < database/rekomendasi_pantai_batam.sql
```

### 4. Buat file `.env.local`

Salin file contoh lalu sesuaikan dengan konfigurasi MySQL lokal kamu:

```bash
# Windows
copy .env.example .env.local

# Mac/Linux
cp .env.example .env.local
```

Isi `.env.local` (sesuaikan jika password MySQL kamu berbeda):

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=        ← kosongkan jika tidak ada password (XAMPP default)
DB_NAME=rekomendasi_pantai_batam
```

### 5. Jalankan development server

```bash
npm run dev
```

Buka browser: **http://localhost:3000**

---

## Struktur Proyek

```
PBL-Rekomendasi-Pantai-Batam-/
├── app/
│   ├── page.tsx                  # Halaman utama wisatawan
│   ├── admin/                    # Panel admin (login, dasbor, pantai, dll)
│   └── api/                      # API routes (rekomendasi, admin/pantai)
├── components/ui/                # Komponen UI
├── context/                      # React Context (BeachesContext, AdminAuth, AdminData)
├── lib/
│   ├── db.ts                     # Koneksi MySQL
│   └── j48.ts                    # Algoritma Decision Tree C4.5
├── types/
│   └── beach.ts                  # TypeScript types
├── database/
│   └── rekomendasi_pantai_batam.sql   # ← Import ini ke MySQL kamu
└── .env.example                  # Template environment variables
```

---

## Akun Admin (untuk testing)

| Field | Value |
|---|---|
| URL | http://localhost:3000/admin/masuk |
| Username | `admin` |
| Password | `batam2026` |

---

## Teknologi yang Digunakan

- **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS v4
- **Backend:** Next.js API Routes, MySQL2
- **Database:** MySQL/MariaDB
- **ML Algorithm:** Decision Tree C4.5 (J48) — `lib/j48.ts`
- **UI Icons:** Lucide React

---

## Troubleshooting

**Error: `Cannot connect to database`**
→ Pastikan XAMPP MySQL sudah berjalan dan `.env.local` sudah dibuat dengan benar.

**Error: `npm run dev` tidak bisa dijalankan**
→ Jalankan `npm install` terlebih dahulu.

**Halaman kosong / data pantai tidak muncul**
→ Pastikan database sudah diimport dan XAMPP MySQL aktif.

**Port 3000 sudah dipakai**
→ Jalankan `npm run dev -- -p 3001` untuk ganti port.
