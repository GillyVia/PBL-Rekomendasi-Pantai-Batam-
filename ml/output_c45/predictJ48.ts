// AUTO-GENERATED dari c45_custom.py — JANGAN EDIT MANUAL
// C4.5 asli: Gain Ratio + Pessimistic Error Pruning (CF=0.25)
// Salin seluruh file ini ke lib/j48.ts

import type { RecommendationLabel } from "@/types/beach";

export function predictC45({
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
    if (fasilitas_score <= 1.5) {
      if (suasana_score <= 2.5) {
        // n=7, counts={'tidak_direkomendasikan': 7}
        return "tidak_direkomendasikan";
      } else {
        // n=5, counts={'direkomendasikan': 5}
        return "direkomendasikan";
      }
    } else {
      // n=13, counts={'direkomendasikan': 13}
      return "direkomendasikan";
    }
  } else {
    if (suasana_score <= 1.5) {
      // n=2, counts={'direkomendasikan': 2}
      return "direkomendasikan";
    } else {
      // n=12, counts={'sangat_direkomendasikan': 12}
      return "sangat_direkomendasikan";
    }
  }
}
