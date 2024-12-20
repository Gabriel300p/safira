"use client";

import { useQuery } from "@tanstack/react-query";
import React, { createContext, ReactNode, useContext } from "react";
import { Tutor } from "./schema";
import { fetchTutors } from "./tutor-functions";

interface TutorContextType {
  tutors: Tutor[] | undefined;
  isLoading: boolean;
  error: Error | null;
  dataUpdatedAt: number | undefined;
}

const TutorContext = createContext<TutorContextType | undefined>(undefined);

export function TutorProvider({ children }: { children: ReactNode }) {
  const {
    data: tutors,
    isLoading,
    error,
    dataUpdatedAt,
  } = useQuery<Tutor[], Error>({
    queryKey: ["tutors"],
    queryFn: fetchTutors,
    retryOnMount: true,
    keepPreviousData: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 0,
    cacheTime: 0,
  });

  return (
    <TutorContext.Provider value={{ tutors, isLoading, error, dataUpdatedAt }}>
      {children}
    </TutorContext.Provider>
  );
}

export function useTutorContext() {
  const context = useContext(TutorContext);
  if (context === undefined) {
    throw new Error("useTutorContext must be used within a TutorProvider");
  }
  return context;
}
