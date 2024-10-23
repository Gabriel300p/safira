"use client";

import { fetchAnimals } from "@/app/controle-de-animais/animais/utils/animal-functions";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, ReactNode, useContext } from "react";
import { fetchRacas } from "./raca-functions";
import { Raca } from "./schema";

interface RacaContextType {
  racas: Raca[] | undefined;
  isLoading: boolean;
  error: Error | null;
  dataUpdatedAt: number | undefined;
}

// Cria o contexto de animais com um valor inicial indefinido
const RacaContext = createContext<RacaContextType | undefined>(undefined);

export function RacaProvider({ children }: { children: ReactNode }) {
  const {
    data: racas,
    isLoading,
    error,
    dataUpdatedAt,
  } = useQuery<Raca[], Error>({
    queryKey: ["racas"],
    queryFn: fetchRacas,
    retryOnMount: true,
    keepPreviousData: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 300000,
    cacheTime: 600000,
  });

  return (
    <RacaContext.Provider value={{ racas, isLoading, error, dataUpdatedAt }}>
      {children}
    </RacaContext.Provider>
  );
}

export function useRacaContext() {
  const context = useContext(RacaContext);

  if (context === undefined) {
    throw new Error("useAnimalContext must be used within an RacaProvider");
  }

  return context;
}
