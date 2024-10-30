"use client";

import { fetchAnimals } from "@/app/controle-de-animais/animais/utils/animal-functions";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, ReactNode, useContext } from "react";
import { Animal } from "./schema";

interface AnimalContextType {
  animals: Animal[] | undefined;
  isLoading: boolean;
  error: Error | null;
  dataUpdatedAt: number | undefined;
}

// Cria o contexto de animais com um valor inicial indefinido
const AnimalContext = createContext<AnimalContextType | undefined>(undefined);

export function AnimalProvider({ children }: { children: ReactNode }) {
  const {
    data: animals,
    isLoading,
    error,
    dataUpdatedAt,
  } = useQuery<Animal[], Error>({
    queryKey: ["animals"], // Chave para identificar a query
    queryFn: fetchAnimals, // Função que busca os dados dos animais
    retryOnMount: true, // Tenta refazer a busca ao montar
    keepPreviousData: true, // Mantém os dados anteriores enquanto novos dados estão sendo carregados
    refetchOnWindowFocus: true, // Refaz a busca ao voltar à aba
    refetchOnReconnect: true, // Refaz a busca ao reconectar à rede
    staleTime: 300000, // Os dados serão considerados frescos por 5 minutos
    cacheTime: 600000, // Os dados em cache serão mantidos por 10 minutos
  });

  return (
    <AnimalContext.Provider
      value={{ animals, isLoading, error, dataUpdatedAt }}
    >
      {children}
    </AnimalContext.Provider>
  );
}

export function useAnimalContext() {
  const context = useContext(AnimalContext);

  if (context === undefined) {
    throw new Error("useAnimalContext must be used within an AnimalProvider");
  }

  return context;
}
