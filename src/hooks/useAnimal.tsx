import { Animal, fetchAnimals } from "@/functions/animal-functions";
import { useQuery } from "@tanstack/react-query";

export function useAnimals() {
  return useQuery<Animal[], Error>({
    queryKey: ["animals"],
    queryFn: fetchAnimals,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
}
