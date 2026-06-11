// AUTO-GENERATED dari c45_pipeline.py — JANGAN EDIT MANUAL
// Tempel ke dalam fungsi predictJ48() di lib/j48.ts

export type RecommendationLabel =
  | "tidak_direkomendasikan"
  | "direkomendasikan"
  | "sangat_direkomendasikan";

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
  if (popularitas_score <= 2.5) {
    if (suasana_score <= 1.5) {
      // n=3, entropy=0.0
      return "tidak_direkomendasikan"; // Tidak Direkomendasikan
    } else {
      // n=21, entropy=0.276195
      return "direkomendasikan"; // Direkomendasikan
    }
  } else {
    if (fasilitas_score <= 1.5) {
      // n=3, entropy=0.918296
      return "direkomendasikan"; // Direkomendasikan
    } else {
      // n=12, entropy=0.413817
      return "sangat_direkomendasikan"; // Sangat Direkomendasikan
    }
  }
}
