import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Animal } from "./schema";

// Função para buscar todos os animais
const fetchAnimals = async (): Promise<Animal[]> => {
  try {
    const response = await axios.get<Animal[]>("/api/animal");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar animais:", error);
    throw error;
  }
};

// Função para buscar um animal específico por ID
const fetchAnimalById = async (id: number): Promise<Animal> => {
  try {
    const response = await axios.get<Animal>(`/animal/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar animal com ID ${id}:`, error);
    throw error;
  }
};

// Função para criar um novo animal
const useCreateAnimal = async (animalData: Animal): Promise<Animal> => {
  try {
    const response = await axios.post<Animal>("/api/animal", animalData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar animal:", error);
    throw error;
  }
};

// Função para atualizar um animal existente
const useUpdateAnimal = async (animalData: Animal): Promise<Animal> => {
  try {
    const response = await axios.put<Animal>(`/api/animal/`, animalData);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar animal:`, error);
    throw error;
  }
};

const useDeleteAnimal = async (id: number): Promise<void> => {
  try {
    await axios.delete(`/api/animal`, {
      data: { id },
    });
  } catch (error) {
    console.error(`Erro ao atualizar animal:`, error);
    throw error;
  }
};

// Custom hook para atualizar um animal existente
const updateAnimal = () => {
  const queryClient = useQueryClient();
  return useMutation((animalData: Animal) => useUpdateAnimal(animalData), {
    onSuccess: () => {
      queryClient.invalidateQueries(["animals"]);
    },
  });
};

const createAnimal = () => {
  const queryClient = useQueryClient();
  return useMutation((animalData: Animal) => useCreateAnimal(animalData), {
    onSuccess: () => {
      queryClient.invalidateQueries(["animals"]);
    },
  });
};

const deleteAnimal = () => {
  const queryClient = useQueryClient();
  return useMutation((id: number) => useDeleteAnimal(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["animals"]);
    },
  });
};

export {
  createAnimal,
  deleteAnimal,
  fetchAnimalById,
  fetchAnimals,
  updateAnimal,
  useCreateAnimal,
  useUpdateAnimal,
};
