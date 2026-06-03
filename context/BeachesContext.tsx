"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { BeachData } from "@/types/beach";

type BeachesContextValue = {
  beaches: BeachData[];
  loading: boolean;
  error: string | null;
  beachesByDistrict: Record<string, BeachData[]>;
  kecamatanList: string[];
  trendingBeaches: BeachData[];
};

const BeachesContext = createContext<BeachesContextValue | null>(null);

export function BeachesProvider({ children }: { children: ReactNode }) {
  const [beaches, setBeaches] = useState<BeachData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/rekomendasi", { cache: "no-store" })
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setBeaches(json.data);
        } else {
          setError(json.message ?? "Gagal mengambil data pantai.");
        }
      })
      .catch(() => setError("Terjadi kesalahan saat mengambil data pantai."))
      .finally(() => setLoading(false));
  }, []);

  const beachesByDistrict = beaches.reduce<Record<string, BeachData[]>>(
    (acc, beach) => {
      const key = beach.kecamatan;
      if (!acc[key]) acc[key] = [];
      acc[key].push(beach);
      return acc;
    },
    {},
  );

  const kecamatanList = Object.keys(beachesByDistrict);
  const trendingBeaches = beaches.filter((b) => b.trending);

  return (
    <BeachesContext.Provider
      value={{ beaches, loading, error, beachesByDistrict, kecamatanList, trendingBeaches }}
    >
      {children}
    </BeachesContext.Provider>
  );
}

export function useBeachesContext() {
  const ctx = useContext(BeachesContext);
  if (!ctx) throw new Error("useBeachesContext must be used within BeachesProvider");
  return ctx;
}
