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
    if (suasana_score <= 1.5) {
      // n=3, counts={'tidak_direkomendasikan': 3}
      return "tidak_direkomendasikan";
    } else {
      if (fasilitas_score <= 1.5) {
        if (suasana_score <= 2.5) {
          // n=4, counts={'tidak_direkomendasikan': 3, 'direkomendasikan': 1}
          return "tidak_direkomendasikan";
        } else {
          // n=5, counts={'direkomendasikan': 5}
          return "direkomendasikan";
        }
      } else {
        // n=14, counts={'direkomendasikan': 13, 'sangat_direkomendasikan': 1}
        return "direkomendasikan";
      }
    }
  } else {
    if (suasana_score <= 2.5) {
      if (suasana_score <= 1.5) {
        // n=2, counts={'direkomendasikan': 2}
        return "direkomendasikan";
      } else {
        // n=6, counts={'direkomendasikan': 2, 'sangat_direkomendasikan': 4}
        return "sangat_direkomendasikan";
      }
    } else {
      // n=8, counts={'sangat_direkomendasikan': 8}
      return "sangat_direkomendasikan";
    }
  }
}