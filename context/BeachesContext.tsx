"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { ALL_BEACHES } from "@/data/beaches";
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
  const beaches = ALL_BEACHES;
  const loading = false;
  const error = null;

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
