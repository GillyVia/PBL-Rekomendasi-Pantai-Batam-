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
  trending: boolean;
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
};