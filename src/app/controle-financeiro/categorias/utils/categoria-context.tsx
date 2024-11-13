"use client";

import { useQuery } from "@tanstack/react-query";
import React, { createContext, ReactNode, useContext } from "react";
import { fetchCategorias } from "./categoria-functions";
import { Categoria } from "./schema";

interface CategoriaContextType {
  categorias: Categoria[] | undefined;
  isLoading: boolean;
  error: Error | null;
  dataUpdatedAt: number | undefined;
}

// Cria o contexto de categorias com um valor inicial indefinido
const CategoriaContext = createContext<CategoriaContextType | undefined>(
  undefined
);

export function CategoriaProvider({ children }: { children: ReactNode }) {
  const {
    data: categorias,
    isLoading,
    error,
    dataUpdatedAt,
  } = useQuery<Categoria[], Error>({
    queryKey: ["categorias"],
    queryFn: fetchCategorias,
    retryOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 0,
    cacheTime: 0,
  });

  return (
    <CategoriaContext.Provider
      value={{ categorias, isLoading, error, dataUpdatedAt }}
    >
      {children}
    </CategoriaContext.Provider>
  );
}

export function useCategoriaContext() {
  const context = useContext(CategoriaContext);

  if (context === undefined) {
    throw new Error(
      "useCategoriaContext must be used within a CategoriaProvider"
    );
  }

  return context;
}
