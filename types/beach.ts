export type BeachFacility = {
  toilet: boolean;
  mushola: boolean;
  warungMakan: boolean;
  parkirMotor: boolean;
  parkirMobil: boolean;
  gazebo: boolean;
  sewaAlat: boolean;
  penginapan: boolean;
  wifi: boolean;
  penjagaPantai: boolean;
};

export type BeachAccess = "mudah" | "sedang" | "sulit";

export type BeachCoordinate = {
  lat: number;
  lng: number;
};

export type RecommendationLabel =
  | "tidak_direkomendasikan"
  | "direkomendasikan"
  | "sangat_direkomendasikan";

export type BeachRecommendation = {
  suasanaScore: number;
  fasilitasScore: number;
  aksesScore: number;
  popularitasScore: number;
  ratingKategori?: string | null;
  hargaKategori?: string | null;
  jarakKategori?: string | null;
  labelDatabase?: RecommendationLabel | string | null;
  labelJ48: RecommendationLabel;
};

export type BeachData = {
  id: string;
  name: string;
  kecamatan: string;
  kelurahan: string;
  alamatLengkap: string;

  image: string;
  imageGallery?: string[];

  badge: string;
  badgeColor: string;

  featured?: boolean;
  trending: boolean;
  verifiedDate?: string;

  rating: number;
  reviews: number;

  tiketMasuk: string;
  tiketMasukRp: number;

  jarakDariKota: number;
  jarakLabel: string;
  jamBuka: string;
  aksesJalan: BeachAccess;

  highlight: string;
  deskripsiSingkat: string;
  deskripsiLengkap: string;

  kelebihanUtama: string[];
  aktivitas: string[];
  cocokUntuk: string[];
  tipsKunjungan: string[];

  googleMapsUrl: string;

  koordinat: BeachCoordinate;

  kategori: string[];
  fasilitas: BeachFacility;

  rekomendasi?: BeachRecommendation;
};