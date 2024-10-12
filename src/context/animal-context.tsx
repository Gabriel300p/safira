"use client";

import { Animal, fetchAnimals } from "@/functions/animal-functions";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, ReactNode, useContext } from "react";

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
