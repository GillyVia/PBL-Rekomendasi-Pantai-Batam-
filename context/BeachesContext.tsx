"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
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
  selectedDetailBeach: BeachData | null;
  setSelectedDetailBeach: (beach: BeachData | null) => void;
};

const BeachesContext = createContext<BeachesContextValue | null>(null);

export function BeachesProvider({ children }: { children: ReactNode }) {
  const [beaches, setBeaches] = useState<BeachData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDetailBeach, setSelectedDetailBeach] = useState<BeachData | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchBeaches = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/rekomendasi", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as {
          success: boolean;
          data: BeachData[];
          error?: string;
        };
        if (!json.success) throw new Error(json.error ?? "Gagal memuat data");
        if (!cancelled) setBeaches(json.data);
      } catch (err) {
        if (!cancelled)
          setError(err instanceof Error ? err.message : "Gagal memuat data pantai");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void fetchBeaches();
    return () => { cancelled = true; };
  }, []);

  const beachesByDistrict = useMemo(
    () =>
      beaches.reduce<Record<string, BeachData[]>>((acc, beach) => {
        const key = beach.kecamatan;
        if (!acc[key]) acc[key] = [];
        acc[key].push(beach);
        return acc;
      }, {}),
    [beaches],
  );

  const kecamatanList = useMemo(
    () => Object.keys(beachesByDistrict),
    [beachesByDistrict],
  );

  const trendingBeaches = useMemo(
    () => beaches.filter((beach) => beach.trending),
    [beaches],
  );

  return (
    <BeachesContext.Provider
      value={{ beaches, loading, error, beachesByDistrict, kecamatanList, trendingBeaches, selectedDetailBeach, setSelectedDetailBeach }}
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
