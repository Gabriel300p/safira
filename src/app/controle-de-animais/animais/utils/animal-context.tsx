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

const AnimalContext = createContext<AnimalContextType | undefined>(undefined);

export function AnimalProvider({ children }: { children: ReactNode }) {
  const {
    data: animals,
    isLoading,
    error,
    dataUpdatedAt,
  } = useQuery<Animal[], Error>({
    queryKey: ["animals"],
    queryFn: fetchAnimals,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
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
