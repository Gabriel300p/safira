import { fetchAnimals } from "@/app/controle-de-animais/animais/utils/animal-functions";
import { useQuery } from "@tanstack/react-query";
import { Animal } from "./schema";

export function useAnimals() {
  return useQuery<Animal[], Error>({
    queryKey: ["animals"],
    queryFn: fetchAnimals,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
}
