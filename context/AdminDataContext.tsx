"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { BeachData } from "@/types/beach";

type AdminDataContextValue = {
  beaches: BeachData[];
  isLoading: boolean;
  refreshBeaches: () => Promise<void>;
  addBeach: (beach: BeachData) => Promise<void>;
  updateBeach: (id: string, payload: Partial<BeachData>) => Promise<void>;
  deleteBeach: (id: string) => Promise<void>;
  toggleFeatured: (id: string) => Promise<void>;
  toggleTrending: (id: string) => Promise<void>;
};

const AdminDataContext = createContext<AdminDataContextValue | undefined>(
  undefined,
);

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [beaches, setBeaches] = useState<BeachData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshBeaches = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/pantai", {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil data pantai.");
      }

      const result = (await response.json()) as { data: BeachData[] };

      setBeaches(result.data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshBeaches();
  }, [refreshBeaches]);

  const addBeach = useCallback(async (beach: BeachData) => {
    const response = await fetch("/api/admin/pantai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(beach),
    });

    if (!response.ok) {
      throw new Error("Gagal menambahkan data pantai.");
    }

    await refreshBeaches();
  }, [refreshBeaches]);

  const updateBeach = useCallback(
    async (id: string, payload: Partial<BeachData>) => {
      const response = await fetch(`/api/admin/pantai/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Gagal memperbarui data pantai.");
      }

      await refreshBeaches();
    },
    [refreshBeaches],
  );

  const deleteBeach = useCallback(
    async (id: string) => {
      const response = await fetch(`/api/admin/pantai/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus data pantai.");
      }

      await refreshBeaches();
    },
    [refreshBeaches],
  );

  const toggleFeatured = useCallback(
    async (id: string) => {
      const beach = beaches.find((item) => item.id === id);
      if (!beach) return;

      await updateBeach(id, {
        featured: !beach.featured,
      });
    },
    [beaches, updateBeach],
  );

  const toggleTrending = useCallback(
    async (id: string) => {
      const beach = beaches.find((item) => item.id === id);
      if (!beach) return;

      await updateBeach(id, {
        trending: !beach.trending,
      });
    },
    [beaches, updateBeach],
  );

  const value = useMemo(
    () => ({
      beaches,
      isLoading,
      refreshBeaches,
      addBeach,
      updateBeach,
      deleteBeach,
      toggleFeatured,
      toggleTrending,
    }),
    [
      beaches,
      isLoading,
      refreshBeaches,
      addBeach,
      updateBeach,
      deleteBeach,
      toggleFeatured,
      toggleTrending,
    ],
  );

  return (
    <AdminDataContext.Provider value={value}>
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const context = useContext(AdminDataContext);

  if (!context) {
    throw new Error("useAdminData harus digunakan di dalam AdminDataProvider");
  }

  return context;
}
