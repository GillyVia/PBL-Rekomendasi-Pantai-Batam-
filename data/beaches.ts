import type { BeachData } from "@/types/beach";

export const ALL_BEACHES: BeachData[] = [
  {
    id: "viovio",
    name: "Pantai Viovio",
    kecamatan: "Bulang",
    kelurahan: "Pulau Buluh",
    alamatLengkap: "Jembatan 5 Barelang, Kota Batam, Kepulauan Riau",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    imageGallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1200&q=80",
    ],
    badge: "Favorit Wisatawan",
    badgeColor: "#3B82F6",
    trending: true,
    rating: 4.6,
    reviews: 1280,
    tiketMasuk: "Rp 10.000",
    tiketMasukRp: 10000,
    jarakDariKota: 28,
    jarakLabel: "Sekitar 45 menit dari pusat kota",
    jamBuka: "08.00 - 18.00",
    aksesJalan: "mudah",
    highlight: "Pantai populer dengan pemandangan jembatan dan sunset yang indah.",
    deskripsiSingkat:
      "Pantai Viovio merupakan salah satu destinasi wisata pantai yang populer di Batam.",
    deskripsiLengkap:
      "Pantai ini dikenal dengan pemandangan laut yang luas, area santai, serta spot foto menarik.\n\nWisatawan dapat menikmati suasana santai bersama keluarga maupun teman sambil menikmati angin laut.",
    kelebihanUtama: [
      "Pemandangan sunset yang indah",
      "Akses jalan relatif mudah",
      "Cocok untuk keluarga",
      "Banyak spot foto menarik",
    ],
    aktivitas: ["Foto", "Santai", "Kuliner", "Menikmati Sunset"],
    cocokUntuk: ["Keluarga", "Pasangan", "Teman"],
    tipsKunjungan: [
      "Datang sore hari untuk menikmati sunset.",
      "Gunakan alas kaki yang nyaman.",
      "Siapkan uang tunai untuk tiket dan jajanan.",
    ],
    googleMapsUrl: "https://maps.google.com/?q=1.0001,104.0001",
    koordinat: {
      lat: 1.0001,
      lng: 104.0001,
    },
    kategori: ["Pantai", "Sunset", "Keluarga"],
    fasilitas: {
      toilet: true,
      mushola: true,
      warungMakan: true,
      parkirMotor: true,
      parkirMobil: true,
      gazebo: true,
      sewaAlat: false,
      penginapan: false,
      wifi: false,
      penjagaPantai: true,
    },
  },
  {
    id: "melur",
    name: "Pantai Melur",
    kecamatan: "Galang",
    kelurahan: "Sijantung",
    alamatLengkap: "Galang, Kota Batam, Kepulauan Riau",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
    badge: "Snorkeling Favorit",
    badgeColor: "#06B6D4",
    trending: true,
    rating: 4.8,
    reviews: 980,
    tiketMasuk: "Rp 15.000",
    tiketMasukRp: 15000,
    jarakDariKota: 35,
    jarakLabel: "Sekitar 1 jam dari pusat kota",
    jamBuka: "07.00 - 17.30",
    aksesJalan: "sedang",
    highlight: "Air jernih dan cocok untuk snorkeling.",
    deskripsiSingkat:
      "Pantai Melur terkenal karena airnya yang jernih dan suasana yang masih alami.",
    deskripsiLengkap:
      "Pantai ini sangat cocok bagi pengunjung yang ingin snorkeling atau menikmati pantai yang lebih tenang.\n\nArea pantai cukup luas dan suasananya cocok untuk liburan santai.",
    kelebihanUtama: [
      "Air jernih",
      "Cocok untuk snorkeling",
      "Nuansa alami",
      "Spot foto menarik",
    ],
    aktivitas: ["Snorkeling", "Foto", "Santai", "Main Air"],
    cocokUntuk: ["Teman", "Pasangan", "Pecinta Alam"],
    tipsKunjungan: [
      "Datang pagi agar lebih sepi.",
      "Bawa baju ganti.",
      "Pastikan kendaraan dalam kondisi baik.",
    ],
    googleMapsUrl: "https://maps.google.com/?q=0.9001,104.1001",
    koordinat: {
      lat: 0.9001,
      lng: 104.1001,
    },
    kategori: ["Pantai", "Snorkeling", "Alam"],
    fasilitas: {
      toilet: true,
      mushola: false,
      warungMakan: true,
      parkirMotor: true,
      parkirMobil: true,
      gazebo: false,
      sewaAlat: true,
      penginapan: false,
      wifi: false,
      penjagaPantai: false,
    },
  },
  {
    id: "nongsa",
    name: "Pantai Nongsa",
    kecamatan: "Nongsa",
    kelurahan: "Sambau",
    alamatLengkap: "Nongsa, Kota Batam, Kepulauan Riau",
    image:
      "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1200&q=80",
    badge: "Keluarga Favorit",
    badgeColor: "#F59E0B",
    trending: true,
    rating: 4.7,
    reviews: 1450,
    tiketMasuk: "Gratis",
    tiketMasukRp: 0,
    jarakDariKota: 20,
    jarakLabel: "Sekitar 30 menit dari pusat kota",
    jamBuka: "06.00 - 18.00",
    aksesJalan: "mudah",
    highlight: "Pantai keluarga dengan akses mudah dan fasilitas cukup lengkap.",
    deskripsiSingkat:
      "Pantai Nongsa cocok untuk wisata keluarga dan menikmati suasana santai.",
    deskripsiLengkap:
      "Pantai Nongsa memiliki garis pantai yang nyaman untuk bersantai dan cukup terkenal di Batam.\n\nAksesnya mudah dan cocok untuk wisatawan umum.",
    kelebihanUtama: [
      "Akses mudah",
      "Gratis",
      "Cocok untuk keluarga",
      "Banyak dikunjungi wisatawan",
    ],
    aktivitas: ["Santai", "Kuliner", "Foto", "Bermain Anak"],
    cocokUntuk: ["Keluarga", "Teman", "Pasangan"],
    tipsKunjungan: [
      "Datang pagi atau sore.",
      "Hindari siang terik.",
      "Bawa topi dan sunscreen.",
    ],
    googleMapsUrl: "https://maps.google.com/?q=1.1501,104.1201",
    koordinat: {
      lat: 1.1501,
      lng: 104.1201,
    },
    kategori: ["Pantai", "Keluarga", "Populer"],
    fasilitas: {
      toilet: true,
      mushola: true,
      warungMakan: true,
      parkirMotor: true,
      parkirMobil: true,
      gazebo: true,
      sewaAlat: false,
      penginapan: true,
      wifi: false,
      penjagaPantai: true,
    },
  },
];

export const KECAMATAN_LIST = [...new Set(ALL_BEACHES.map((beach) => beach.kecamatan))];

export const BEACHES_BY_DISTRICT: Record<string, BeachData[]> = KECAMATAN_LIST.reduce(
  (acc, kecamatan) => {
    acc[kecamatan] = ALL_BEACHES.filter((beach) => beach.kecamatan === kecamatan);
    return acc;
  },
  {} as Record<string, BeachData[]>,
);

export function getTrendingBeaches(): BeachData[] {
  return ALL_BEACHES.filter((beach) => beach.trending);
}