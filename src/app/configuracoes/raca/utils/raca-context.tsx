"use client";

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
    queryKey: ["racas"], // Chave para identificar a query
    queryFn: fetchRacas, // Função que busca os dados dos animais
    retryOnMount: true, // Tenta refazer a busca ao montar
    keepPreviousData: true, // Mantém os dados anteriores enquanto novos dados estão sendo carregados
    refetchOnWindowFocus: true, // Refaz a busca ao voltar à aba
    refetchOnReconnect: true, // Refaz a busca ao reconectar à rede
    staleTime: 300000, // Os dados serão considerados frescos por 5 minutos
    cacheTime: 600000, // Os dados em cache serão mantidos por 10 minutos
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
    throw new Error("useRacaContext must be used within an AnimalProvider");
  }

  return context;
}
