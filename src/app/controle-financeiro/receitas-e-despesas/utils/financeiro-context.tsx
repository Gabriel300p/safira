"use client";

import { useQuery } from "@tanstack/react-query";
import React, { createContext, ReactNode, useContext } from "react";
import { fetchFinanceiros } from "./financeiro-functions";
import { Financeiro } from "./schema";

interface FinanceiroContextType {
  financeiros: Financeiro[] | undefined;
  isLoading: boolean;
  error: Error | null;
  dataUpdatedAt: number | undefined;
}

// Cria o contexto de animais com um valor inicial indefinido
const FinanceiroContext = createContext<FinanceiroContextType | undefined>(
  undefined
);

export function FinanceiroProvider({ children }: { children: ReactNode }) {
  const {
    data: financeiros,
    isLoading,
    error,
    dataUpdatedAt,
  } = useQuery<Financeiro[], Error>({
    queryKey: ["financeiros"],
    queryFn: fetchFinanceiros,
    retryOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 0,
    cacheTime: 0,
  });

  return (
    <FinanceiroContext.Provider
      value={{ financeiros, isLoading, error, dataUpdatedAt }}
    >
      {children}
    </FinanceiroContext.Provider>
  );
}

export function useFinanceiroContext() {
  const context = useContext(FinanceiroContext);

  if (context === undefined) {
    throw new Error("useAnimalContext must be used within an AnimalProvider");
  }

  return context;
}
